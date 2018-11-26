var express = require('express');
var router = express.Router();
var UserCtrl = require('./../server/controllers/user');
var path = require('path');
var passport = require('passport');
              // require('./../server/components/passport')(passport)
var Config = require('./../config/auth_token')
require('./../server/components/passport')(passport);
var auth = require('../auth/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',UserCtrl.signup)
router.post('/login',UserCtrl.login)
router.get('/logout',UserCtrl.logout);
// router.get('/checkauth',auth.isAuth.UserCtrl.checkauth);
router.post('/verifyEmail',UserCtrl.verifyEmail)
router.post('/forget-password',UserCtrl.forgotPassword)
router.post('/reset-password',UserCtrl.resetPassword)
router.get('/getProfile',auth.isAuth,UserCtrl.getProfile)
router.post('/updateProfile',passport.authenticate('bearer',{session:false}),UserCtrl.updateProfile)
router.post('/uploadProfilePic',UserCtrl.uploadProfilePic)
router.get('/userlist',UserCtrl.userList)
router.get('/userdelete/:id', UserCtrl.userDelete);
router.get('getspecificuser/:id',UserCtrl.getSpecificUser)
router.post('setstatus',UserCtrl.setStatus)
router.post('/updateuser' , UserCtrl.updateUser)
// function(req,res){
//   console.log('hereee')
// })
function ensureAuthorised(req,res,next){
  /**  req.session.cookie._expires --- gives the session time after which session expires*/
  console.log(req.isAuthenticated(),'1111111',req.session.cookie._expires)
  if(req.isAuthenticated()){
    next();
  }else{
    next();
  }
}

module.exports = router;
