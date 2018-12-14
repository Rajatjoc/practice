var Users = require('./../models/users');
var Roles = require('./../models/roles');
var staticTemplates = require('./../models/staticTemplates');
var commonFun = require('./../../config/common')
var CONFIG = require('./../../config/config')
const nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
const bcrypt2 = require('bcrypt');
var auth = require('./../../config/auth_token')
const jwt = require("jsonwebtoken");
var formidable = require('formidable');
var im = require('imagemagick')

var fs = require('fs');
/**
 * 
 * @param {*Object } req  { 
 * "firstName": "Aman",
 * "lastName": "Singh", 
 * "email": "xyz@yopmail.com", 
 * "dob": "1993-09-28",
 * "password": "xyzzz",
 * "confirmPassword": "xyzzz",
 * "termsCond": true }
 *  
 * @param {*Object} res 
 */
exports.signup = function (req, res) {
  let data = req.body ? req.body : {};
  data.verifyLinkHash = commonFun.generateHash(data.email)
  const query = { roleName: 'user' }
  Roles.findOne(query).lean().exec(function (err, role) {
    if (err) {
      return res.json({
        code: 202,
        message: CONFIG.message.Error,
        data: []
      });
    } else if (!data) {
      return res.json({
        code: 202,
        message: CONFIG.message.No_Record,
        data: []
      });
    } else {
      data.role_id = role._id;
      const saveData = new Users(data);
      saveData.save(function (err, val) {
        console.log(err, val)
        if (err) {
          return res.json({
            code: 400,
            message: CONFIG.message.Error,
            data: err
          });
        } else if (!val) {
          return res.json({
            code: 202,
            message: CONFIG.message.No_Record,
            data: []
          });
        } else {
          sendVerifyEmail(data.verifyLinkHash, data.firstName, data.email)
          return res.json({
            code: 200,
            message: CONFIG.message.registered_Email,
            data: val
          });;
        }
      })
    }
  })
}
/**
 * Function for user login
 * @param {*Object} req {
 *  username:email@exmaple.com  
 *  password:"xyzzzzz"
 * }
 * @param {*} res 
 * @param {*} next 
 */
exports.login = function (req, res, next) {
  const data = req.body ? req.body : {};
  const query = {
    email: data.userEmail,
    active: true
  }

  Users.findOne(query)
    .populate({ path: 'role_id' })
    .lean()
    .exec(function (errMongo, userData) {

      if (errMongo) {
        return res.json({
          code: 400,
          message: CONFIG.message.Error,
          data: errMongo
        });
      } else if (!userData) {
        return res.json({message : "Logout Successfully"});
      } else {

        if (userData.role_id.roleName == 'admin') {
          bcrypt2.compare(data.userPassword, userData.password, function (errCrypt, result) {

            if (!result) {
              return res.json({
                code: 201,
                message: 'Invalid Credentials',
                data: null
              });
            } else if (result) {
              let user = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role_id: userData.role_id,
                image: userData.image,
                image_thumbnail: userData.image_thumbnail
              }
              if (userData.active && userData.token == null) {
                auth.issueToken(userData, function (token) {
                  let response = { token: token, userData: user };
                  Users.findOneAndUpdate({ email: userData.email }, { $set: { token: token } }, { upsert: true }, function (err, data) {

                    if (err) {
                      res.json({
                        code: 400,
                        message: 'Error saving token',
                        Error: err
                      })
                    } else {
                      return res.json({
                        code: 200,
                        message: CONFIG.message.loggin_success,
                        data: response
                      });
                    }
                  })
                })
              } else if(userData.active && userData.token != null){
                
                Users.findOne({ email: userData.email },function (err, data) {
                  console.log(err,data)
                  if (err) {
                    res.json({
                      code: 400,
                      message: 'User loggedin from another device too.',
                      Error: err
                    })
                  } else {
                    let response = { token : data.token, userData: user };
                    return res.json({
                      code: 200,
                      message: CONFIG.message.loggin_success,
                      data: response,
                      'hhhh':'uiiiiii'
                    });
                  }
                })
              } else {
                return res.json({
                  code: 300,
                  message: 'Unauthorized user',
                  data: null
                });
              }
            }
          });
        }
        else {
          return res.json({
            code: 300,
            message: CONFIG.message.not_verified,
            data: null
          });
        }
      }
    })
};
exports.checkauth = function (req, res) {
  console.log('hello')

  res.json({ code: 200, message: 'valid user' })
}
exports.logout = function (req, res) {
  console.log(req.headers.authorization, "->>>>>")
  if (req.headers.authorization) {
    let modifiedTokenArr = req.headers.authorization.split(" ");
    let modifiedToken = modifiedTokenArr[1];
    console.log(modifiedToken)

    Users.findOneAndUpdate({ token: modifiedToken }, {
      $set: {
        token: null
      }
    }).exec((err, result) => {
      if (err) {
        return res.json({
          code: 400,
          message: CONFIG.message.Error,
          data: err
        });
      } if (result) {
        return res.json({ code: 200, message: CONFIG.message.LOGOUT, data: [] });
      } else {
        return res.json({ code: 200, message: CONFIG.message.LOGOUT, data: [] });
      }
    })
  }
  else {
    return res.json({ code: 200, message: CONFIG.message.LOGOUT, data: [] });
  }

}
exports.verifyEmail = function (req, res, next) {
  const data = req.body ? req.body : {}
  const query = {
    email: data.email,
    verifyLinkHash: data.verifyHash,
    active: false
  }
  updateQuery = {
    $set: { "active": true }
  }
  Users.findOneAndUpdate(query, updateQuery)
    .lean()
    .exec(function (errMongo, data) {
      if (errMongo) {
        return res.json({
          code: 400,
          message: CONFIG.message.Error,
          data: errMongo
        });
      } else if (!data) {
        return res.json(CONFIG.message.No_Record);
      } else {
        return res.json({ code: 200, message: CONFIG.message.email_verified, data: updateQuery });
      }
    })
}
exports.forgotPassword = function (req, res, next) {
  console.log(req.body, "-----")
  const data = req.body ? req.body : {}
  const verifyHashForgetPassword = commonFun.generateHash(data.userEmail)
  const query = {
    email: data.userEmail,
  }
  updateQuery = {
    $set: { "verifyHashForgetPassword": verifyHashForgetPassword }
  }
  Users.findOneAndUpdate(query, updateQuery)
    .lean()
    .exec(function (errMongo, data) {
      if (errMongo) {
        return res.json({

        });
      } else if (!data) {
        // return res.json(Response(statusCode.NoContent, "Failed", common.validationMessages.dataNotFound, null));
        return res.json(CONFIG.message.No_Record);
      } else {
        sendVerifyHashForgetPasswordEmail(verifyHashForgetPassword, data.firstName, data.email, function (err, data) {
          if (err) {
            return res.json({ code: 400, message: CONFIG.message.Error, Error: err });
          } else if (!data) {
            return res.json(CONFIG.message.No_Record);
          } else {
            return res.json({ code: 200, message: 'Check Email for reset link.', data: data });
          }
        })
      }
    })
}

exports.resetPassword = function (req, res, next) {
  // console.log(req.body,'---------',req.query.verifyHashForgetPassword)
  const data = req.body ? req.body : req.query;
  const query = {
    email: data.username,
    verifyHashForgetPassword: req.query.verifyHashForgetPassword
  }

  bcrypt2.genSalt(10, function (err, salt) {
    bcrypt2.hash(data.password, salt, function (err, hash) {
      updateQuery = {
        $set: {
          "password": hash,
          "verifyHashForgetPassword": null
        }
      }
      Users.findOneAndUpdate(query, updateQuery, {})
        .lean()
        .exec(function (errMongo, data) {
          if (errMongo) {
            return res.json({ code: 400, message: CONFIG.message.Error, Error: errMongo });
          } else if (!data) {
            return res.json(CONFIG.message.No_Record);
          } else {
            return res.json({
              code: 200,
              message: CONFIG.message.password_updated,
              data: data
            });
          }
        })

    });
  });
}

exports.getProfile = function (req, res, next) {

  let tokenArr = req.headers['authorization'].split(" ");
  let token = tokenArr[1];
  Users.findOne({ token: token }, (err, profile) => {
    if (err && !profile) {
      return res.json({
        code: 400,
        message: CONFIG.message.Error,
        Error: err
      })
    }
    else {
      res.json({
        code: 200,
        message: CONFIG.message.success1,
        data: profile
      })

    }
  })
}
exports.uploadProfilePic = function (req, res) {

  var form = new formidable.IncomingForm();
  // console.log(form)
  form.uploadDir = './public/profileImage';
  form.on('error', function (err) {
    // console.log(err , '----------------------->>>>>>>>>>>>>>>>')
    return res.json({ status: 500, message: err });
  });
  // console.log(err , '----------------------->>>>>>>>>>>>>>>>')
  form.parse(req, function (err, fields, files) {
    let userId = fields.id;
    // console.log('here----------------------->>>>>>>>>>>>>>>>' ,'sgsg' ,fields)
    if (files.image) {
      im.resize({
        srcPath: files.image.path,
        dstPath: `${files.image.path}-resized.jpg`,
        width: 800
      }, function (err, stdout, stderr) {
        if (err) {
          res.json({ status: 500, message: err });
        }
        else {
          im.resize({
            srcPath: files.image.path,
            dstPath: `${files.image.path}-thumbnail.jpg`,
            width: 70
          }, function (err, stdout, stderr) {
            var newImagePath = `${files.image.path}-resized.jpg`;
            var newImageThumbnail = `${files.image.path}-thumbnail.jpg`;
            //console.log(files.image); return;
            Users.findByIdAndUpdate({ _id: fields.id }, { $set: { image: newImagePath.slice(7), image_thumbnail: newImageThumbnail.slice(7) } }, function (err, result) {
              if (err) {
                return res.json({ status: 500, message: err });
              }
              else {
                fs.unlinkSync(files.image.path);
                // let response = { token: token, userData: user };

                console.log("userdata >>>>>>>>>>>>>>>>>>???>>>");


                //my code>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>??????himanshu
                Users.findOne({ _id: userId }).populate("role_id").exec((err, userData) => {
                  console.log("userdata >>>>>>>>>>>>>>>>>>>>>", userData);
                  let user = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    role_id: userData.role_id,
                    image: userData.image,
                    image_thumbnail: userData.image_thumbnail
                  }

                  let response = { token: result.token, userData: user };

                  return res.json({

                    code: 200,
                    message: CONFIG.message.update,
                    data: response
                  })
                })




                // return res.json({ status: 200, data: { image: newImagePath.slice(7), imageThumbnail: newImageThumbnail.slice(7) } });
              }
            });
          });
          // fs.unlinkSync(files.image.path);
          // res.json({ status: 200, message: constant.message.image_upload_success, data: newImagePath.slice(7) });
        }
      });
    }
    else {
      res.json({ status: 400, message: 'not found' });
    }
  });
}
// exports.userList = function(req , res){
//   Users.find({deleted : false , role_id : '5bed0023c4a4480667e776ea'})
//   // .populate({path:'role_id',match:{roleName : 'user'}})
//   .exec((err , result)=>{
//     if(err){
//       return res.json({
//         code:400,
//         message:CONFIG.message.Error,
//         data:err
//       });
//     }else if(!result){
//       return res.json(CONFIG.message.No_Record);
//     }else if(result){
//       return res.json({
//         code:200,
//         message:CONFIG.message.success1,
//         data:result
//     });
//     }
//   })
// }
exports.userList = function (req, res) {
  console.log(req.body)
  Users.find(
    {
      deleted: false,
      role_id: '5bed0023c4a4480667e776ea',
      $or: [{ email: new RegExp(req.body.searchText, 'gi') }, { firstName: new RegExp(req.body.searchText, 'gi') },
      { lastName: new RegExp(req.body.searchText, 'gi') }]
    }).sort({"createdAt":-1})
    .countDocuments().then(function (count) {
      Users.find(
        {
          deleted: false, role_id: '5bed0023c4a4480667e776ea',
          $or: [{ email: new RegExp(req.body.searchText, 'gi') }, { firstName: new RegExp(req.body.searchText, 'gi') },
          { lastName: new RegExp(req.body.searchText, 'gi') }]
        }).sort({"createdAt":-1})
        .exec((err, result) => {
          if (err) {
            return res.json({
              code: 400,
              message: CONFIG.message.Error,
              data: err
            });
          } else if (!result) {
            return res.json({
              code: 202,
              message: CONFIG.message.No_Record,
              data: [],
              Count: count
            });
          } else {
            return res.json({
              code: 200,
              message: CONFIG.message.success1,
              data: result,
              Count: count
            })
          }
        })
    })
  return;

}
exports.updateUser = function (req, res) {
  let data = req.body.data ? req.body.data : {};
  console.log(req.body)
  Users.findByIdAndUpdate({ _id: data.id }, {
    $set: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      active: data.status
    }
  }).exec((err, result) => {

    if (err) {
      return res.json({
        code: 400,
        message: CONFIG.message.Error,
        data: err
      });
    } else if (!result) {
      return res.json(CONFIG.message.No_Record);
    } else if (result) {
      return res.json({
        code: 200,
        message: CONFIG.message.update,
        data: result
      });
    }
  })
}
exports.setStatus = function (req, res) {
  let data = req.body ? req.body : {};
  var status = data.status ? true : false;
  Users.findByIdAndUpdate({ _id: data.id }, { $set: { active: status } })
    .exec((err, result) => {
      if (err) {
        return res.json({
          code: 400,
          message: CONFIG.message.Error,
          data: err
        });
      } else if (!result) {
        return res.json(CONFIG.message.No_Record);
      } else if (result) {
        return res.json({
          code: 200,
          message: CONFIG.message.update,
          data: result
        });
      }
    })
}
exports.getSpecificUser = function (req, res) {
  console.log('hemmmm')
  Users.findById({ _id: req.body.id })
    .exec((err, result) => {
      if (err) {
        return res.json({
          code: 400,
          message: CONFIG.message.Error,
          data: err
        });
      } else if (!result) {
        return res.json(CONFIG.message.No_Record);
      } else if (result) {
        return res.json({
          code: 200,
          message: CONFIG.message.success1,
          data: result
        });
      }
    })
}

exports.userDelete = function (req, res) {
  console.log(req.params)
  Users.findByIdAndUpdate({ _id: req.params.id }, { $set: { deleted: true } })
    .exec((err, result) => {
      if (err) {
        return res.json({
          code: 400,
          message: CONFIG.message.Error,
          data: err
        });
      } else if (!result) {
        return res.json(CONFIG.message.No_Record);
      } else if (result) {
        return res.json({
          code: 200,
          message: CONFIG.message.delete,
          data: []
        });
      }
    })
}
exports.updateProfile = function (req, res) {



  console.log(req.body);
  let data = req.body.data ? req.body.data : {};
  Users.findByIdAndUpdate({ _id: data.id }, {
    $set: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dob: data.dob,
    }
  }).exec((err, result) => {
    console.log(err)
    if (err) {
      return res.json({
        code: 400,
        message: CONFIG.message.Error,
        data: err
      });
    } else if (!result) {
      return res.json({
        code: 202,
        message: CONFIG.message.No_Record,
        data: []
      });
    } else {

      Users.findOne({ _id: data.id }).populate("role_id").exec((err, userData) => {
        console.log("userdata >>>>>>>>>>>>>>>>>>>>>", userData);
        let user = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          // role_id : result.role_id,
          image: userData.image,
          image_thumbnail: userData.image_thumbnail
        }

        let response = { token: result.token, userData: user };

        return res.json({

          code: 200,
          message: CONFIG.message.update,
          data: response
        })
      })


    }
  })
}

function sendVerifyEmail(verifyLinkHash, firstName, email) {
  // const verifyLink = baseUrl + "/auth/login?email=" + email + "&verifyHash=" + verifyLinkHash

  const verifyLink = "http://54.71.18.74:3503/#/login/resetpassword" + "users/verifyEmail?email=" + email + "&verifyHash=" + verifyLinkHash
  const query = {
    name: 'Verify Email'
  }
  staticTemplates.findOne(query)
    .exec(function (errMongo, template) {
      if (errMongo) {
      } else {
        if (template) {
          const nodemailer = require('nodemailer');

          const from = CONFIG.email.E_MAIL;
          const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: CONFIG.email.E_MAIL,
              pass: CONFIG.email.E_MAIL_PASSWORD
            }
          });
          let templateHtml = template.content
          templateHtml = templateHtml.replace("##UserName##", firstName);
          templateHtml = templateHtml.replace("##ConfirmEmail##", verifyLink);
          mailSubject = 'PrintGenie User Verification';
          const mailOptions = {
            to: email,
            from: from,
            subject: mailSubject,
            html: templateHtml
          };
          smtpTransport.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else if (info) {
              console.log('Email sent: ' + info.response);
            }
          });
        } else {
          console.log('No such template available in the database')
        }
        // commonFun.mail.sendmail(null, email, "Hycarebrid Verification", templateHtml)
      }

    })
}
function sendVerifyHashForgetPasswordEmail(verifyLinkHash, firstName, email, callback) {
  // const verifyLink = baseUrl + "/auth/reset-password?email=" + email + "&verifyHashForgetPassword=" + verifyLinkHash
  const verifyLink = 'http://54.71.18.74:3503' + "/auth/reset-password?email=" + email + "&verifyHashForgetPassword=" + verifyLinkHash
  const query = {
    name: 'Forget Password'
  }

  staticTemplates.findOne(query)
    .exec(function (errMongo, template) {
      if (errMongo) {
        callback(errMongo, null)
      } else if (!template) {
        callback(null, null)
      } else {
        const nodemailer = require('nodemailer');

        const from = 'printgenie2018@gmail.com'
        const smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'printgenie2018@gmail.com',
            pass: 'Password@sg01'
          }
        });

        let templateHtml = template.content
        templateHtml = templateHtml.replace("##UserName##", firstName);
        templateHtml = templateHtml.replace("##ConfirmEmail##", verifyLink);
        templateHtml = templateHtml.replace('##URL##', 'http://54.71.18.74:3503/#/login/resetpassword?email=' + email + '&verifyHashForgetPassword=' + verifyLinkHash)
        mailSubject = 'Reset/Change your password.';
        const mailOptions = {
          to: email,
          from: from,
          subject: mailSubject,
          html: templateHtml
        };
        smtpTransport.sendMail(mailOptions, function (err, info) {
          if (err) {
            callback(err, null)
            // if error while sending mail return control with err message
          } else if (info) {
            callback(null, true)
            console.log('Message sent: ' + info.response);
          }
        });
      }
    })
}
