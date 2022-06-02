echo 'begin;' > restore.sql
for i in visit household_client_list household client keys; do
  echo "delete from "'`'"$i"'`'";" >> restore.sql
done
for i in household client household_client_list visit keys; do
  sqlite3 database.sqlite ".mode insert $i" "select * from $i;" | perl -ne 's/INTO keys/INTO `keys`/; print;' >> restore.sql;
done
echo 'commit;' >> restore.sql
