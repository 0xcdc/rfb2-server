from __future__ import print_function
import os
from os import listdir
from os.path import isfile, join
from datetime import date, timedelta

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from apiclient.http import MediaFileUpload

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE = None

def getFiles(query):
  response = SERVICE.files().list(q=query).execute()
  return response.get('files', [])

def getBackupFolderId():
  for f in getFiles("sharedWithMe and name = 'backups' and trashed=false"):
    if(f['name'] == "backups"):
      return f['id']
  return ""


def getCloudFileIds(folderId):
  filenames = {}
  file_list = getFiles( "'" + folderId + "' in parents and trashed=false")
  for f in file_list:
    filenames[f['name']] = f
  return filenames

def getDiskBackupFiles():
  mypath = os.path.expandvars('$HOME/backups')
  onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
  return set(onlyfiles)

def getFilesForDuration(countToKeep, interval, dateStrings):
  datesToKeep = []
  minDateToKeep = date.max
  minSkip = timedelta(interval)

  while len(datesToKeep) < countToKeep  and len(dateStrings) >= 1:
    candidateDateString = dateStrings.pop()
    candidateDate = date.fromisoformat(candidateDateString)
    if(candidateDate <= minDateToKeep):
      datesToKeep.append(candidateDateString)
      minDateToKeep = candidateDate - minSkip

  return datesToKeep

def getFilesToKeep(fileNames):
  datesToKeep = [];

  #create a map of date strings to filenames
  #  date strings are always the first 10 characters
  dateStringToFiles = dict(map(lambda x: [x[:10], x], fileNames))

  #load the data strings into a sorted list
  dateStrings = sorted(dateStringToFiles.keys())

  #first, keep the a week of dialies
  dailies = getFilesForDuration(14, 1, dateStrings.copy())

  #next keep up to a 4 more files that are 7 days apart (month of weeklies)
  weeklies = getFilesForDuration(4, 7, dateStrings.copy())

  #next keep up to 12 more files that are 30 days apart (a year of monthlies)
  monthlies = getFilesForDuration(12, 30, dateStrings.copy())

  #finally keep up to 10 more files that are 365 days apart (a decade of yearlies)
  yearlies = getFilesForDuration(10, 365, dateStrings.copy())

  #map back from dates we want to filesnames we want
  datesToKeep = set(dailies + weeklies + monthlies + yearlies)
  return set([dateStringToFiles[x] for x in datesToKeep])

def pruneCloudBackups():
  global existingGDriveFiles
  filesToKeep = getFilesToKeep(existingGDriveFiles)
  filesToDelete = existingGDriveFiles - filesToKeep
  for fileToDelete in sorted(filesToDelete):
    print("deleting:  " + fileToDelete)
    f = cloudFileIds[fileToDelete]
    f.Delete()

  existingGDriveFiles = set(filesToKeep)

def uploadFile(folder_id, filename):
  file_metadata = {
    'name': filename,
    'parents': [folder_id]
  }

  media = MediaFileUpload(os.path.expandvars('$HOME/backups/' + filename), resumable=True)
  file = SERVICE.files().create(
    body=file_metadata,
    media_body=media,
    fields='id').execute()

def pruneDiskBackups():
  global existingDiskFiles
  filesToKeep = getFilesToKeep(existingDiskFiles)
  filesToDelete = existingDiskFiles - filesToKeep
  for fileToDelete in sorted(filesToDelete):
    print("deleting:  " + fileToDelete)
    os.remove("backups/" + fileToDelete)
  existingDiskFiles = set(filesToKeep)

def main():
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    creds = None
    credentials_file = os.path.expandvars('$HOME/github/rfb2-server/backups/credentials.json')
    token_file = os.path.expandvars('$HOME/github/rfb2-server/backups/token.json')
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials_file, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(token_file, 'w') as token:
            token.write(creds.to_json())

    try:
        global SERVICE
        SERVICE = build('drive', 'v3', credentials=creds)

        # Create folder.
        folder_id = getBackupFolderId()
        if(folder_id == ""):
          print("could not get backup folder")
          exit(1)

        cloudFileIds = getCloudFileIds(folder_id);
        existingGDriveFiles = set(cloudFileIds.keys())
        existingDiskFiles = getDiskBackupFiles()

        #pruneDiskBackups()
        #pruneCloudBackups()

        for backupfile in existingDiskFiles- existingGDriveFiles:
          print("needs saving: " + backupfile)
          uploadFile(folder_id, backupfile);
          print("uploaded: " + backupfile)

    except HttpError as error:
        # TODO(developer) - Handle errors from drive API.
        print(f'An error occurred: {error}')


if __name__ == '__main__':
    main()


