var Payment = require('./../models/paymentmode');
var CONFIG = require('./../../config/config')

exports.getPaymentMode = function(req , res){
    console.log("payment",req.body)
    Payment.find({
        isDeleted: false,
        // paymentMode: new RegExp(req.body.searchString, "gi")
    }).countDocuments().then(function (count) {
        Payment.find({
            isDeleted: false,
            // paymentMode: new RegExp(req.body.searchString, "gi")
        })
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
                } else if (result) {
                    return res.json({
                        code: 200,
                        message: CONFIG.message.success1,
                        data: result,
                        Count: count
                    })

                }
            })
    })
}

exports.getSpecificPaymentMode = function(req , res){
    let data = req.params ? req.params : {};
    Payment.findById({_id : data.id}).exec((err , result)=>{
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
               
            });
        } else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
               
            })

        }
    })
}
exports.deletePaymentMode = function(req , res){
    let data = req.params ? req.params : {};
    Payment.findByIdAndUpdate({_id : data.id},{$set:{
        "isDeleted" : true
    }}).exec((err , result)=>{
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
               
            });
        } else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.delete,
                data: result,
               
            })

        }
    })
}

exports.updatePaymentMode = function(req , res){
    let data = req.body ? req.body :{};
    Payment.findByIdAndUpdate({_id : data.id},{$set:{
        "paymentmode" : data.paymentmode,
        "status" : data.status
    }}).exec((err , result)=>{
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
               
            });
        } else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.update,
                data: result,
               
            })

        }
    })
} 