var Category = require('./../models/category');
var CONFIG = require('./../../config/config');


/**
 * 
 * 
 * add cms pages
 * 
 */
exports.addCategory = function (req, res) {
    let data = req.body ? req.body : {};
    console.log(data.category.category_name, data.category.sub_category.length, '------>>>>')
    const saveData = new Category({ category_name: data.category.category_name });


    saveData.save(function (err, val) {
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
            console.log('here')
            var length = data.category.sub_category.length;
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    console.log(data.category.sub_category[i])
                    var newsaveData = new Category({
                        category_name: data.category.sub_category[i].name,
                        parent: true
                    });
                    newsaveData.save(function (err, result) {
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
                            Category.findOneAndUpdate({ 'category_name': data.category.category_name },
                                {
                                    $push: {
                                        sub_category: result._id
                                    }
                                }).exec((err, resp) => {
                                    console.log(resp)
                                    if (err) {
                                        return res.json({
                                            code: 400,
                                            message: CONFIG.message.Error,
                                            data: err
                                        });
                                    } else if (resp) {
                                        console.log('done')
                                        // return res.json({
                                        //     code: 200,
                                        //     message: CONFIG.message.add,
                                        //     data: []
                                        // })
                                    } else {
                                        return res.json({
                                            code: 202,
                                            message: CONFIG.message.No_Record,
                                            data: []
                                        });
                                    }


                                })
                        }
                    })
                }
                return res.json({
                    code: 200,
                    message: CONFIG.message.add,
                    data: []
                })
            } else {
                return res.json({
                    code: 200,
                    message: CONFIG.message.add,
                    data: []
                })
            }

        }
    })
}
exports.getSpecificCategory = function (req, res) {
    console.log(req.params)
    Category.findById({ _id: req.params.id }).populate({ path: 'sub_category' }).exec((err, result) => {
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
        } else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
            })
        }
    })
}
exports.updateCategory = function (req, res) {
    console.log(req.body)
    let data = req.body.data ? req.body.data : {};
    var length = data.sub_category.length;
    Category.findByIdAndUpdate({ _id: data.id }, { $set: { category_name: data.category_name } }, { new: true })
        .populate('sub_category')
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
                    data: []
                });

            } else if (result) {
                if (length > 0) {
                    data.sub_category.forEach(function (el, index) {
                        console.log(el, "=================-----", result.sub_category[index])
                        if ((el.name != (result.sub_category[index] && result.sub_category[index].category_name) && result.sub_category[index] == undefined)) {
                            var newsaveData = new Category({
                                category_name: data.sub_category[index].name,
                                parent: true
                            });
                            newsaveData.save().then(function (result) {
                                console.log(result)
                                if (result) {
                                    Category.findByIdAndUpdate({ _id: data.id }, { $push: { sub_category: result._id } }, { new: true },
                                        function (err, done) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log(done, "Data saved successfully.")
                                            }
                                        })
                                }
                            })
                        } else {
                            Category.findByIdAndUpdate({ _id: result.sub_category[index]._id }, { $set: { category_name: el.name } }, { new: true },
                                function (err, done) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(done, "Data saved successfully.")
                                    }
                                })
                        }
                    })
                    return res.json({
                        code: 200,
                        message: CONFIG.message.update,
                        data: 'done'
                    })

                } else if (length == 0) {
                    Category.findByIdAndUpdate({ _id: data.id }, { $set: { sub_category: [] } }, function (err, affected1) {
                        console.log('hemu')
                        if (err) {
                            return res.json({
                                code: 400,
                                message: CONFIG.message.Error,
                                data: err
                            });
                        } else if (!affected1) {
                            return res.json({
                                code: 202,
                                message: CONFIG.message.No_Record,
                                data: []
                            });

                        } else if (affected1) {
                            return res.json({
                                code: 200,
                                message: CONFIG.message.update,
                                data: []
                            })
                        }
                    })
                }

            }
        })
}
exports.getsubcategory = function (req, res) {
    console.log(req.params)
    Category.findOne({ category_name: req.params.id })
        .populate({ path: 'sub_category' })
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
                    data: []
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
exports.getAllCategorycount = function (req, res) {
    Category.find(
        {
            'isDeleted': false,
            parent: false,
            category_name: new RegExp(req.body.searchString, 'gi'),
        })
        .populate({ path: 'sub_category' })
        .countDocuments().then(function (count) {
            Category.find({
                'isDeleted': false, parent: false,
                category_name: new RegExp(req.body.searchString, 'gi'),
            })
            .populate({ path: 'sub_category' })
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
                        Count:count
                    });
                } else if (result) {
                    return res.json({
                        code: 200,
                        message: CONFIG.message.success1,
                        data: result,
                        Count:count

                    })
                }
            })
})
}

exports.getAllCategory = function (req, res) {
    Category.find(
        {
            'isDeleted': false,
            parent: false,
           
        })
        .populate({ path: 'sub_category' })
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
                        data: []
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


exports.deleteCategory = function (req, res) {
    let data = req.body ? req.body : {};
    Category.findByIdAndUpdate({ _id: data.id }, {
        $set: {
            isDeleted: true
        }
    }).exec((err, result) => {
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

        } else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
            })
        }
    })
}