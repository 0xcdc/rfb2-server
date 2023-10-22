username=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlUsername)'`
password=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlPassword)'`
hostIP=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlCloudPublicIP)'`

mysqldump -h$hostIP -u$username -p$password --no-tablespaces --set-gtid-purged=OFF --single-transaction foodbank > dump.sql
