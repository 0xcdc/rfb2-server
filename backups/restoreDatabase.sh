#!/bin/bash -l
host=`hostname`
host=${host%.local}

dateStr=`date "+%Y-%m-%d-00:00:00"`

if [ $# != 1 ]; then
  echo "Usage: restoreDatabase.sh <source>"
  exit -1
fi

source=$1
compressedFilename=`ls ~/My\ Drive/backups | sort | grep "\.$source\." | tail -1`

if [ "$compressedFilename" == "" ]; then
  echo "could not find backup for $source"
  exit -3
fi

compressedFilename="$HOME/My Drive/backups/$compressedFilename"

sudo launchctl stop com.RFB.launchServer

if [ -e "$HOME/github/rfb2-server/database.sqlite" ]; then
  echo "backing up existing database"
  "$HOME/github/rfb2-server/backups/backupDatabase.sh" -f
  rm "$HOME/github/rfb2-server/database.sqlite"
fi

echo "restoring from $compressedFilename"
/opt/homebrew/bin/7z x -so "$compressedFilename" | sqlite3 $HOME/github/rfb2-server/database.sqlite
sudo launchctl start  com.RFB.launchServer
