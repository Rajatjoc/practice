var express = require('express');
var router = express.Router();
var categoryCtrl = require('./../server/controllers/category');
var auth = require('../auth/auth');

 router.post('/addCategory',auth.isAuth,categoryCtrl.addCategory);
 router.post('/deleteCategory',auth.isAuth ,categoryCtrl.deleteCategory);
 router.post('/updateCategory',auth.isAuth ,categoryCtrl.updateCategory);
 router.get('/getSpecificCategory/:id',auth.isAuth ,categoryCtrl.getSpecificCategory);
 
 router.post('/getAllCategorycount' ,auth.isAuth , categoryCtrl.getAllCategorycount);
 router.get('/getallCategory' ,auth.isAuth , categoryCtrl.getAllCategory);
 router.get('/getsubcategory/:id' ,auth.isAuth , categoryCtrl.getsubcategory)
module.exports = router;