var express = require('express');
var router = express.Router();
var orderCtrl = require('./../server/controllers/orders');
var auth = require('../auth/auth');
router.post('/addOrders',orderCtrl.addOrders);
router.post('/getOrder',auth.isAuth,orderCtrl.getOrder)
router.get('/getspecificOrders/:id',auth.isAuth,orderCtrl.getspecificOrders)
router.post('/updateorders', auth.isAuth,orderCtrl.updateOrders)
router.post('/deleteOrders', auth.isAuth,orderCtrl.deleteOrders)
module.exports = router;