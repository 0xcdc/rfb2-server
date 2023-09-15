use strict;

print "what username do you want to use to login to the foodbank database? ";
my $db_username = <STDIN>;
chomp $db_username;

print "what password do you want to use to login to the foodbank database? ";
my $db_password = <STDIN>;
chomp $db_password;

print "what username do you want to use to login to the foodbank website (blank for none)? ";
my $web_username = <STDIN>;
chomp $web_username;

print "what password do you want to use to login to the foodbank website (blank for none)? ";
my $web_password = <STDIN>;
chomp $web_password;

my $credentials = <<"ENDSTRING";
export const credentials = {
  mysqlUsername: '$db_username',
  mysqlPassword: '$db_password',
  mysqlHost: process.env.GAE_ENV ? '' : 'localhost',
  mysqlDatabase: 'foodbank',

  websiteUsername: '$web_username',
  websitePassword: '$web_password',
};

export default credentials;
ENDSTRING

print "overwritting credentials.js file\n";
open(CREDENTIALS,'>','credentials.js') or die $!;
print CREDENTIALS $credentials;
close CREDENTIALS;

print "creating a new foodbank database\n";
print `sudo mysql < data-scripts/latest_schema.sql`;

print "populating fact tables\n";
print `sudo mysql < data-scripts/fact-tables.sql`;

my $create_user_sql = <<ENDSTRING;
DROP USER IF EXISTS \'$db_username\'\@\'localhost\';
CREATE USER \'$db_username\'\@'localhost' IDENTIFIED BY \'$db_password\';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, REFERENCES, ALTER ON *.* TO \'$db_username\'\@\'localhost\' WITH GRANT OPTION;
ENDSTRING

print "creating db user\n";
my $cmd = "echo \"$create_user_sql\" | sudo mysql";
print `$cmd`;


print "\nDONE!\n";
