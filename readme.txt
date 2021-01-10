~/.nvm/versions/node/v15.5.1/bin/node index.js >& server.log &


sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

