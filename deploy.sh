cd ~/workspace/raspipi
git pull
killall node

set -e

npm install
node server.js &
npm start &
