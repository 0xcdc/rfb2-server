username=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysql.user)'`
password=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysql.password)'`
mysql -u$username -p$password foodbank
