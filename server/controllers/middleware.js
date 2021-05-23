'use strict';                                                                                                                                                  

//const jwt             = require('jsonwebtoken');
//const axios           = require('axios');
const _               = require('lodash');
const jwt = require("jsonwebtoken");

//const config          = require('../config/config');

const asyncRequest = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
};

module.exports = {
  //asyncRequest,
  // Assign req.currentUser with user object
  assignCurrentStudent: async (req, res, next) => {
    console.log("Auth...")
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log(req.path)
    console.log(req.method)
    // temp for easy dev only
    // if ( req.path === '/ui/as' ) {
    //   next();
    // } else {
    if ( token == null ) { 
      console.log("No token, access denied")
      return res.sendStatus(401)
    }
    try {
       const studentId = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
       console.log(studentId)
       req.currentStudentId = studentId 
       console.log("Authorized")
       next()
    } catch (err) {
       console.log(err)
       res.sendStatus(403)
    }
  //}
  }
}

