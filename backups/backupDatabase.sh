host=`hostname`
host=${host%.local}

dateStr=`date "+%Y-%m-%d-00:00:00"`

while getopts f flag
do
    case "${flag}" in
        f) dateStr=`date "+%Y-%m-%d-%H:%M:%S"`
    esac
done

function compressFile {
  filename=$1
  compressedFilename=$2

  if [ -e "$filename" ] && [ ! -e "$compressedFilename" ]; then
    echo "compressing $filename"
    /opt/homebrew/bin/7z a -sdel "$filename.7z" "$filename"
  fi
}

function dumpDatabase {
  dumpFilename="$HOME/My Drive/backups/$dateStr.$host.dump"
  compressedFilename="$dumpFilename.7z"

  if [ ! -e "$dumpFilename" ] && [ ! -e "$compressedFilename" ]; then
    echo "dumping database to $dumpFilename";
    sqlite3 "$HOME/github/rfb2-server/database.sqlite" .dump > "$dumpFilename"
  fi

  compressFile "$dumpFilename" "$compressedFilename"
}

dumpDatabase
