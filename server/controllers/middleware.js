'use strict';                                                                                                                                                  

//const jwt             = require('jsonwebtoken');
//const axios           = require('axios');
const _               = require('lodash');

//const config          = require('../config/config');

const asyncRequest = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
};

module.exports = {
  asyncRequest,
  // Assign req.currentUser with user object
  assignCurrentUser: asyncRequest(async (req, res, next) => {
    next();
  })
}



