export CLOUDSQL=1
username=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysql.user)'`
password=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysql.password)'`
hostIP=`node --input-type=module -e 'import {credentials} from "./credentials.js";console.log(credentials.mysqlCloudPublicIP)'`

mysql -h$hostIP -u$username -p$password foodbank --ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem --ssl-cert=client-cert.pem --ssl-key=client-key.pem
