import readline from 'readline';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { exec as execAsync } from 'child_process';




const exec = promisify(execAsync);

async function main() {
  const credentialsFile = 'credentials.js';

  if (!(await fileExists(credentialsFile))) {
    const mysqlUsername = await askQuestion('What username do you want to use to login to the foodbank database? ');
    const mysqlPassword = await askQuestion('What password do you want to use to login to the foodbank database? ');
    const websiteUsername = await askQuestion('What username do you want to use to login to the foodbank website (blank for none)? ');
    const websitePassword = await askQuestion('What password do you want to use to login to the foodbank website (blank for none)? ');
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
      googleApiKey,
    };

    await fs.writeFile(
      credentialsFile,
      `export const credentials = ${JSON.stringify(credentials, null, 2)};\nexport default credentials;\n`
    );
    console.log('Overwriting credentials.js file');
  }

  const { stdout } = await exec(`node --input-type="module" -e 'import {credentials} from "./credentials.js"; console.log(JSON.stringify(credentials));'`);
  const credentialsMatch = stdout.match(/"(\w+)":"([^"]*)"/g);
  const credentialsObject = {};

  if (credentialsMatch) {
    credentialsMatch.forEach(match => {
      const [key, value] = match.split(':').map(str => str.replace(/"/g, '').trim());
      credentialsObject[key] = value;
    });
  }



  await execCmd('Creating a new foodbank database', 'sudo mysql < data-scripts/latest_schema.sql');
  await execCmd('Populating fact tables', 'sudo mysql < data-scripts/fact-tables.sql');

  const createUserSql = `
    DROP USER IF EXISTS '${credentialsObject.mysqlUsername}'@'localhost';
    CREATE USER '${credentialsObject.mysqlUsername}'@'localhost' IDENTIFIED BY '${credentialsObject.mysqlPassword}';
    GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, REFERENCES, ALTER ON *.* TO '${credentialsObject.mysqlUsername}'@'localhost' WITH GRANT OPTION;
  `;

  await execCmd('Creating db user', `echo "${createUserSql}" | sudo mysql`);
  console.log('\nDONE!\n');
}

async function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function fileExists(fileName) {
  try {
    await fs.access(fileName);
    return true;
  } catch (error) {
    return false;
  }
}

async function execCmd(description, cmd) {
  console.log(`\n${description}\n`);
  console.log(cmd);
  try {
    const { stdout, stderr } = await exec(cmd);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(error);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});


