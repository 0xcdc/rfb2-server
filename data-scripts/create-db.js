import { exec as execAsync } from 'child_process';
import { existsSync } from 'node:fs';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import readline from 'readline';
// import readline from 'readline/promises';

const exec = promisify(execAsync);

function fileExists(fileName) {
  return existsSync(fileName);
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise( (resolve, reject) => {
    rl.question(question, answer => {
      resolve(answer);
      rl.close();
    });
  });
}

function execCmd(description, cmd) {
  console.log(`\n${description}\n`);
  console.log(cmd);
  return exec(cmd)
    .then(({ stdout, stderr }) => {
      console.log(stdout);
      console.error(stderr);
    })
    .catch( error => {
      console.error(error);
    });
}

async function main() {
  const credentialsFile = 'credentials.js';

  if (!(fileExists(credentialsFile))) {
    const mysqlUsername = await askQuestion('What username do you want to use to login to the foodbank database? ');
    const mysqlPassword = await askQuestion('What password do you want to use to login to the foodbank database? ');
    const websiteUsername = await askQuestion(
      'What username do you want to use to login to the foodbank website (blank for none)? ');
    const websitePassword = await askQuestion(
      'What password do you want to use to login to the foodbank website (blank for none)? ');
    const googleProjectName = await askQuestion('What google project do you (blank for none)? ');
    const googleApiKey = await askQuestion('What is the api key to use with the google project (blank for none)? ');

    const credentials = {
      mysqlUsername,
      mysqlPassword,
      mysqlHost: process.env.GAE_ENV ? '' : '127.0.0.1',
      mysqlDatabase: 'foodbank',
      websiteUsername,
      websitePassword,
      googleProjectName,
      googleMapsApiKey: googleApiKey,
      googleGeoCodeApiKey: googleApiKey,
    };

    console.log('Overwriting credentials.js file');
    await fs.writeFile(
      credentialsFile,
      `export const credentials = ${JSON.stringify(credentials, null, 2)};\nexport default credentials;\n`
    );
  }

  const { stdout } =
    await exec(`node --input-type="module" -e '
      import {credentials} from "./credentials.js";
      console.log(JSON.stringify(credentials));'
    `);

  const credentialsObject = JSON.parse(stdout);

  await execCmd('Creating a new foodbank database', 'sudo mysql < data-scripts/latest_schema.sql');
  await execCmd('Populating fact tables', 'sudo mysql < data-scripts/fact-tables.sql');

  const createUserSql = `
    DROP USER IF EXISTS '${credentialsObject.mysqlUsername}'@'%';
    CREATE USER
    '${credentialsObject.mysqlUsername}'@'%' IDENTIFIED BY '${credentialsObject.mysqlPassword}';
    GRANT ALL PRIVILEGES ON foodbank.* TO '${credentialsObject.mysqlUsername}'@'%';
  `;
  await execCmd('Creating db user', `echo "${createUserSql}" | sudo mysql`);
  console.log('\nDONE!\n');
}


main().catch(error => {
  console.error(error);
  process.exit(1);
});


