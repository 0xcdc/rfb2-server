username=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlUsername)'`
password=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlPassword)'`

mysqldump -u$username -p$password foodbank  --no-data --skip-add-drop-table --skip-quote-names --ignore-table=foodbank.household_visit|
  perl -n -e 'if(!/!\d{5}/) { print; };'  > schema.sql
