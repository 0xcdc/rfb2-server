#!/bin/bash -l
host=`hostname`
host=${host%.local}

dateStr=`date "+%Y-%m-%d-00:00:00"`

if [ $# != 1 ]; then
  echo "Usage: restoreDatabase.sh <source>"
  exit -1
fi

source=$1

if [ -e "$HOME/github/rfb2-server/database.sqlite" ]; then
  echo "database exists already"
  exit -2
fi

compressedFilename=`ls ~/My\ Drive/backups | sort | grep ".$source." | tail -1`

if [ $compressedFilename == "" ]; then
  echo "could not find backup for $source"
  exit -3
fi
compressedFilename="$HOME/My Drive/backups/$compressedFilename"

echo "restoring from $compressedFilename"
/opt/homebrew/bin/7z x -so "$compressedFilename" | sqlite3 $HOME/github/rfb2-server/database.sqlite
