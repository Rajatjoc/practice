"use strict";
// const tokensmodel = require("./../server/models/tokens")
const usersmodel = require("./../server/models/users")
const jwt = require("jsonwebtoken");

const issuer = 'sanjeev-gupta';
const audience = 'http://example.com';
const secret = 'shhhhh-koi-hai'

const signOptions = {
  issuer: issuer,
  audience: audience,
  expiresIn: "12h",
  algorithm: "HS512"
};

//Here we setup the security checks for the endpoints
//that need it (in our case, only /protected). This
//function will be called every time a request to a protected
//endpoint is received
exports.verifyToken = function (req,token, callback) {
  //these are the scopes/roles defined for the current endpoint
//   const currentScopes = req.swagger.operation["x-security-scopes"];

  function sendError() {
    return req.res.status(403).json({ message: "Error: Access Denied" });
  }
  //validate the 'Authorization' header. it should have the following format:
  //'Bearer tokenString'
  if (token && token.indexOf("Bearer ") == 0) {
    const tokenString = token.split(" ")[1];

    jwt.verify(tokenString, secret, signOptions, function (
      verificationError,
      decodedToken
    ) {
      //check if the JWT was verified correctly
      if (
        verificationError == null &&
        Array.isArray(currentScopes) &&
        decodedToken &&
        decodedToken.role_id
      ) {
        // check if the role is valid for this endpoint
        const roleMatch = currentScopes.indexOf(decodedToken.role_id.roleName) !== -1;
        // check if the issuer matches
        const issuerMatch = decodedToken.iss == issuer;

        // you can add more verification checks for the
        // token here if necessary, such as checking if
        // the username belongs to an active user

        if (roleMatch && issuerMatch) {
          const query = {
            tokenString: tokenString,
            loggedOut: false,
          }
          tokensmodel.findOne(query)
            .exec(function (err, data) {
              if (data) {
                //add the token to the request so that we
                //can access it in the endpoint code if necessary
                req.auth = decodedToken;
                //if there is no error, just return null in the callback
                return callback(null,decodedToken);
              } else {
                //return the error in the callback if there is one
                return callback(sendError());
              }
            })
        } else {
          //return the error in the callback if there is one
          return callback(sendError());
        }
      } else {
        //return the error in the callback if the JWT was not verified
        return callback(sendError());
      }
    });
  } else {
    //return the error in the callback if the Authorization header doesn't have the correct format
    return callback(sendError());
  }
};

/**
 * Token will contain payload(_id, email, role)
*/
exports.issueToken = function (payload, callback) {
  let payloadInit = {
    id: payload._id,
    email: payload.email,
    firstname: payload.firstname,
    lastname: payload.lastname,
    dob:payload.dob
  };
//   payloadInit = payload
  let token = jwt.sign(payloadInit, secret, signOptions);
  // const query = { user_id: payload._id}

  const update = {
    tokenString: token,
  }
  // const saveData = new tokensmodel(update);
  // // const option = { upsert: true }
  // const option = {}
  // saveData.save(function (err, val) {
  //   if (err) {
  //   } else if (val) {
  //     // return val.tokenString;
  //     callback(val)
  //   } else {
  //   }
  // })
  usersmodel.findOneAndUpdate({'email':payload.email},{$set:{
    token : token
  }}).exec((err , result)=>{
    if (err) {
        console.log("Error while saving token",err)
        } else if (result) {
            callback(token)
        } else {
        }
  })
};