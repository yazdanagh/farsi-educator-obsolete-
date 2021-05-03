'use strict'
const express = require('express')
const path = require('path')
const util = require("util")
const exec = util.promisify(require('child_process').exec);
//const moment = require("moment")
const bodyParser = require('body-parser')
const fs          = require('fs-extra');
const cookieParser = require('cookie-parser');
const cors = require('cors')

let app = express()
    

const port = process.env.PORT || 8000 

  app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({
  limit: '5mb'
}))

  app.use(cookieParser());
const appRoot = path.normalize(__dirname + "/..")
//require("./client2_idx.js")(app);
require("./controllers")(app);
app.use(express.static(`${appRoot}/client/dist`));

app.get('*', (req, res) => {
  console.log(__dirname)
  res.sendFile(`${appRoot}/client/dist/index.html`)
  //res.sendFile('/home/scratch.gm20x_hs/cadweb/cron-manager-staging/client/dist/index.html')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
