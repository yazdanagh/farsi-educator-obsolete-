

1. Running the app

building client
( cd ../client; npm run build )

running server
~/.nvm/versions/node/v15.5.1/bin/node index.js >& server.log &

loading db:
node load_darses.js

2. forward port 80 traffic to port 8000

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

3. Running mongo db

in arm mac: 

In rosetta terminal
brew services start mongodb-community@5.0

-----------

mongodb user creation
running: brew services start mongodb-community@4.4
use shekkar
db.createUser({user: "yazdan", pwd: "my_pwd", roles: ["dbOwner"] })
db.dropUser("yazdan")
db.createUser({user: "yazdan", pwd: "my_pwd2", roles: ["dbOwner"] })

4. admin account 

An admin account is needed with code 1111 and studentId : 1000 and name: admin



inside mongo shell:
use shekkar ||||| db.students.insert([ { name: 'Yara Aghaghiri',        naam: 'ﯼﺍﺭﺍ ﻊﻗﺎﻘﯾﺮﯾ',        darsId: 16,        email: 'yazdan.aghaghiri@gmail.com',        code: 8318 },      { name: 'Delsa Aghaghiri',        naam: 'ﺪﻠﺳﺍ ﻊﻗﺎﻘﯾﺮﯾ',        darsId: 11,        email: 'yazdan.aghaghiri@gmail.com',        code: 8173 }])



5. git hub
access token: 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
