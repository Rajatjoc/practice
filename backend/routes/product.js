var express = require('express');
var router = express.Router();
var productCtrl = require('./../server/controllers/product');
var auth = require('../auth/auth');

router.post('/addProduct',auth.isAuth,productCtrl.addProduct);
router.post('/getbrand',auth.isAuth,productCtrl.getAllBrand);
router.post('/getProduct',auth.isAuth,productCtrl.getProduct);
router.post('/getallCategory',auth.isAuth,productCtrl.getallCategory);
router.post('/addBrand', auth.isAuth,productCtrl.addBrand);
router.post('/addsubcategory', auth.isAuth,productCtrl.addsubcategory);
router.post('/deleteCategory',auth.isAuth,productCtrl.deleteCategory);
router.post('/updateProdSubCategory',auth.isAuth,productCtrl.updateProdSubCategory);
router.post('/updateProdCategory',auth.isAuth,productCtrl.updateProdCategory);
router.get('/getSpecificProductCategory/:id',auth.isAuth,productCtrl.getSpecificProductCategory);
router.get('/getSpecificCategory/:id',auth.isAuth,productCtrl.getSpecificCategory);
router.post('/addProductCategory', auth.isAuth, productCtrl.addCategory);
router.get('/getcategory',auth.isAuth,productCtrl.getcategory);
router.get('/getsubcategory/:id',auth.isAuth,productCtrl.getsubcategory);
router.get('/getcountries',auth.isAuth,productCtrl.getcountries);
router.get('/getcolors',auth.isAuth,productCtrl.getcolors);
router.get('/getsizes',auth.isAuth,productCtrl.getsizes);
router.post('/addbrand',auth.isAuth,productCtrl.addBrand)
router.get('/getspecificBrands/:id',auth.isAuth,productCtrl.getspecificBrands)
router.post('/updatebrand',auth.isAuth,productCtrl.updatebrand)
router.get('/deletebrand/:id',auth.isAuth,productCtrl.deletebrand)
router.post('/updateProduct',auth.isAuth, productCtrl.updateProduct);
router.post('/deleteProductImage',auth.isAuth, productCtrl.deleteProductImage);
router.get('/getProductVarient/:id',auth.isAuth , productCtrl.getProductVarient);
router.post('/saveVariants/',auth.isAuth , productCtrl.saveVariants);
router.get('/deleteProduct/:id',auth.isAuth ,productCtrl.deleteProduct);
router.post('/uploadImage',auth.isAuth ,productCtrl.uploadImage);
router.get('/getSpecificProduct/:id',auth.isAuth,productCtrl.getSpecificProduct);
router.post('/addsize',auth.isAuth ,productCtrl.addsize);
router.post('/listsize',auth.isAuth ,productCtrl.listsize);
router.get('/getspecificSize/:id',auth.isAuth ,productCtrl.getspecificSize);
router.get('/deleteSize/:id',auth.isAuth ,productCtrl.deleteSize);
router.post('/updateSize',auth.isAuth ,productCtrl.updateSize);
router.post('/editsubcategory',auth.isAuth,productCtrl.editsubcategory);
router.post('/getDeepSubcategory',auth.isAuth,productCtrl.getDeepSubcategory);

module.exports = router;