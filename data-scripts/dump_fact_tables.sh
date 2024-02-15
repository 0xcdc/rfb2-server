username=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlUsername)'`
password=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlPassword)'`

mysqldump -u$username -p$password foodbank  --no-create-info --skip-add-locks --skip-disable-keys --ignore-table=foodbank.visit --ignore-table=foodbank.household --ignore-table=foodbank.keys |
  perl -n -e 'if(!/^\/\*!\d{5}/) { print; };' > fact-tables.sql

echo "insert into \`keys\` values ('household', 1), ('visit', 1), ('client', 1);" >> fact-tables.sql
