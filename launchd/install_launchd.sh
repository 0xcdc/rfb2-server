mkdir -p /Library/LaunchDaemons
sudo cp com.RFB.backupDatabase.plist /Library/LaunchDaemons/
sudo cp com.RFB.launchServer.plist /Library/LaunchDaemons/
sudo launchctl load /Library/LaunchDaemons/com.RFB.backupDatabase.plist
sudo launchctl load /Library/LaunchDaemons/com.RFB.launchServer.plist
