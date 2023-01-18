for i in end-of-year-sql/*.sql; do
  mysql --database foodbank -u$DB_USER -p$DB_PASSWORD < $i > $i.tsv
done;

ssconvert --merge-to=all.xls end-of-year-sql/*.tsv

