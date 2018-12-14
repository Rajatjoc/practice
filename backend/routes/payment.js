var express = require('express');
var router = express.Router();
var paymentCtrl = require('./../server/controllers/payment');
var auth = require('../auth/auth');

router.post('/getpaymentmodes',auth.isAuth,paymentCtrl.getPaymentMode);
router.get('/deletepaymentmode/:id',auth.isAuth,paymentCtrl.deletePaymentMode);
router.get('/getspecificpaymentmode/:id',auth.isAuth,paymentCtrl.getSpecificPaymentMode);
router.post('/updatepaymentmode',auth.isAuth,paymentCtrl.updatePaymentMode)

module.exports = router;