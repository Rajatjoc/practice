var orders = require('./../models/orders');
var CONFIG = require('./../../config/config')

exports.addOrders = function (req, res) {
    let data = req.body ? req.body : {};
    console.log(req.body, "Orders....................")
    const saveData = new orders({
        CustomerName: data.CustomerName,
        PhoneNo: data.PhoneNo,
        BillingAddress: data.BillingAddress,
        ShippingAddress: data.ShippingAddress,
        OrderStatus: data.OrderStatus,

    });
    saveData.save(function (err, val) {
        if (err) {
            return res.json({
                code: 400,
                message: CONFIG.message.Error,
                data: err
            })
        } else if (!val) {
            return res.json({
                code: 202,
                message: CONFIG.message.No_Record,
                data: []
            });
        } else {
            return res.json
                ({
                    code: 200,
                    message: CONFIG.message.add
                })

        }
    })
}
exports.getOrder = function (req, res) {
    orders.find({
        isDeleted: false,
        CustomerName: new RegExp(req.body.searchString, "gi")
    }).sort({"createdAt":-1}).populate("Product").countDocuments().then(function (count) {
        orders.find({
            isDeleted: false,
            CustomerName: new RegExp(req.body.searchString, "gi")
        }).sort({"createdAt":-1}).populate("Product")

            .exec((err, result) => {
                console.log("///////////0", result)
                if (err) {
                    return res.json({
                        code: 400,
                        message: CONFIG.message.Error,
                        data: err
                    })
                } else if (!result) {
                    return res.json({
                        code: 202,
                        message: CONFIG.message.No_Record,
                        data: [],
                        Count: count
                    });
                } else {
                    return res.json
                        ({
                            code: 200,
                            message: CONFIG.message.success1,
                            data: result,
                            Count: count
                        })

                }
            })
    })
}
exports.getspecificOrders = function (req, res) {
    console.log("//////", req.params)
    let data = req.params ? req.params : {};
    orders.findById({ "_id": data.id }).populate("Product").exec((err,
        result) => {
        if (err) {
            return res.json({
                code: 400,
                message: CONFIG.message.No_Record,
                data: err
            });
        } else if (!result) {
            return res.json({
                code: 202,
                message: CONFIG.message.No_Record
            })
            data: []
        }
        else {
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
            })
        }
    }
    )
}

exports.updateOrders = function (req, res) {
    let data = req.body.data ? req.body.data : {};

    orders.findByIdAndUpdate({ _id: data.id }, {
        $set: {
            CustomerName: data.CustomerName,
            PhoneNo: data.PhoneNo,
            BillingAddress: data.BillingAddress,
            ShippingAddress: data.ShippingAddress,
            OrderStatus: data.OrderStatus
        }
    }).exec((err, result) => {
        console.log("ordersUpdate", result)
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
exports.deleteOrders = function (req, res) {
    let data = req.body ? req.body : {};
    orders.findByIdAndUpdate({ "_id": data.id }, { $set: { isDeleted: true } }).exec((err, result) => {
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
            orders.find({ isDeleted: false }, function (err, results) {
                return res.json({
                    code: 200,
                    message: CONFIG.message.delete,
                    data: results
                })
            })
        }
    })
}