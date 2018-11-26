var express = require('express');
var router = express.Router();
var cmsCtrl = require('./../server/controllers/cms');
var auth = require('../auth/auth');
router.post('/addcms',auth.isAuth,cmsCtrl.addCms);
router.post('/deletecms',auth.isAuth,cmsCtrl.deleteCms);
router.post('/updatecms',auth.isAuth,cmsCtrl.updateCms);
router.get('/editcms/:id',auth.isAuth,cmsCtrl.editById);
router.post('/getallcms',auth.isAuth, cmsCtrl.getAllCms);

module.exports = router;