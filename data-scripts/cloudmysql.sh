username=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlUsername)'`
password=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlPassword)'`
hostIP=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlCloudPublicIP)'`

mysql -h$hostIP -u$username -p$password foodbank
