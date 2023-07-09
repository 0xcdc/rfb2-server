//rename this file to be credentials.js and populate the
//mysqlUser, mysqlPassword, websiteUsername, & websitePassword fields if desired

export const credentials = {
  mysqlUsername: '',
  mysqlPassword: '',
  mysqlHost: process.env.GAE_ENV ? '' : 'localhost',
  mysqlDatabase: '',

  websiteUsername: '',
  websitePassword: '',
};

export default credentials;
