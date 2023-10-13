use strict;
use warnings;

if  ( ! -f "credentials.js" )  {
  print "what username do you want to use to login to the foodbank database? ";
  my $mysqlUsername = <STDIN>;
  chomp $mysqlUsername;

  print "what password do you want to use to login to the foodbank database? ";
  my $mysqlPassword = <STDIN>;
  chomp $mysqlPassword;

  print "what username do you want to use to login to the foodbank website (blank for none)? ";
  my $websiteUsername = <STDIN>;
  chomp $websiteUsername;

  print "what password do you want to use to login to the foodbank website (blank for none)? ";
  my $websitePassword = <STDIN>;
  chomp $websitePassword;

  print "what google project do you (blank for none)? ";
  my $googleProjectName = <STDIN>;
  chomp $googleProjectName;

  print "what is the api key to use with the google project (blank for none)?";
  my $googleApiKey= <STDIN>;
  chomp $googleApiKey;

  my $credentials = <<ENDSTRING;
export const credentials = {\
  mysqlUsername: '$mysqlUsername',
  mysqlPassword: '$mysqlPassword',
  mysqlHost: process.env.GAE_ENV ? '' : '127.0.0.1',
  mysqlDatabase: 'foodbank',

  websiteUsername: '$websiteUsername',
  websitePassword: '$websitePassword',

  googleProjectName: '$googleProjectName',
  googleApiKey: '$googleApiKey',
};

export default credentials;
ENDSTRING

  print "overwritting credentials.js file\n";
  open(CREDENTIALS,'>','credentials.js') or die $!;
  print CREDENTIALS $credentials;
  close CREDENTIALS;
}

my $json = `node --input-type="module" -e '
import {credentials} from "./credentials.js";
console.log(JSON.stringify(credentials));
'`;

my %credentials;
while ($json =~ s/\"(\w+)\"\:\"([^"]*)\"//) {
  $credentials{$1} = $2;
}

sub execCmd {
  my ($desc, $cmd) = @_;
  print "\n", $desc, "\n";
  print $cmd, "\n";
  print `$cmd`, "\n";
}

&execCmd(
  "creating a new foodbank database",
  "sudo mysql < data-scripts/latest_schema.sql"
);

&execCmd(
  "populating fact tables",
  "sudo mysql < data-scripts/fact-tables.sql"
);

my $create_user_sql = <<ENDSTRING;
DROP USER IF EXISTS \'$credentials{mysqlUsername}\'\@\'localhost\';
CREATE USER \'$credentials{mysqlUsername}\'\@'localhost' IDENTIFIED BY \'$credentials{mysqlPassword}\';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, REFERENCES, ALTER ON *.* TO \'$credentials{mysqlUsername}\'\@\'localhost\' WITH GRANT OPTION;

ENDSTRING

&execCmd(
  "creating db user",
  "echo \"$create_user_sql\" | sudo mysql"
);

print "\nDONE!\n";
