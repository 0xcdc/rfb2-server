dateStr=`date "+%Y-%m-%d"`

function compressFile {
  filename=$1
  compressedFilename=$2

  if [ -e $filename ] && [ ! -e $compressedFilename ]; then
    echo "compressing $filename"
    /opt/homebrew/bin/7z a -sdel $filename.7z $filename
  fi
}

function dumpDatabase {
  dumpFilename="$HOME/backups/$dateStr.dump"
  compressedFilename="$dumpFilename.7z"

  if [ ! -e $dumpFilename ] && [ ! -e $compressedFilename ]; then
    echo "dumping database to $dumpFilename";
    sqlite3 $HOME/github/rfb2-server/database.sqlite .dump > $dumpFilename
  fi

  compressFile $dumpFilename $compressedFilename
}

dumpDatabase

python3 ~/github/rfb2-server/backups/uploadBackup.py
