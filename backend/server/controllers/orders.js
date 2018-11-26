var orders = require('./../models/orders');
var CONFIG = require('./../../config/config')

exports.addOrders= function(req,res){
    let data = req.body ? req.body:{};
    console.log(data.orders.PhoneNo)
    const saveData = new orders({
        PhoneNo:data.orders.PhoneNo
    });
    saveData.save(function(err,val){
        if(err){
            return res.json({
                code:400,
                message:CONFIG.message.Error,
                data:err
            })
        }else if(!val){
            return res.json({
                code:202,
                message:CONFIG.message.No_Record,
                data:[]
            });
        }else{
            console.log()

        }
    })
}