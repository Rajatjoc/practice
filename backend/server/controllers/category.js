var Category = require('./../models/category');
var CONFIG = require('./../../config/config')
var mongoose = require('mongoose');

// exports.addCategory = function (req, res) {
//     let data = req.body ? req.body : {};
//     console.log(data.category.category_name, data.category.sub_category.length, '------>>>>')
//     const saveData = new Category({ category_name: data.category.category_name });


//     saveData.save(function (err, val) {
//         if (err) {
//             return res.json({
//                 code: 400,
//                 message: CONFIG.message.Error,
//                 data: err
//             });
//         } else if (!val) {
//             return res.json({
//                 code: 202,
//                 message: CONFIG.message.No_Record,
//                 data: []
//             });
//         } else {
//             console.log('here')
//             var length = data.category.sub_category.length;
//             if (length > 0) {
//                 for (var i = 0; i < length; i++) {
//                     console.log(data.category.sub_category[i])
//                     var newsaveData = new Category({
//                         category_name: data.category.sub_category[i].name,
//                         parent: true
//                     });
//                     newsaveData.save(function (err, result) {
//                         if (err) {
//                             return res.json({
//                                 code: 400,
//                                 message: CONFIG.message.Error,
//                                 data: err
//                             });
//                         } else if (!result) {
//                             return res.json({
//                                 code: 202,
//                                 message: CONFIG.message.No_Record,
//                                 data: []
//                             });
//                         } else {
//                             Category.findOneAndUpdate({ 'category_name': data.category.category_name },
//                                 {
//                                     $push: {
//                                         sub_category: result._id
//                                     }
//                                 }).exec((err, resp) => {
//                                     console.log(resp)
//                                     if (err) {
//                                         return res.json({
//                                             code: 400,
//                                             message: CONFIG.message.Error,
//                                             data: err
//                                         });
//                                     } else if (resp) {
//                                         console.log('done')
//                                         // return res.json({
//                                         //     code: 200,
//                                         //     message: CONFIG.message.add,
//                                         //     data: []
//                                         // })
//                                     } else {
//                                         return res.json({
//                                             code: 202,
//                                             message: CONFIG.message.No_Record,
//                                             data: []
//                                         });
//                                     }


//                                 })
//                         }
//                     })
//                 }
//                 return res.json({
//                     code: 200,
//                     message: CONFIG.message.add,
//                     data: []
//                 })
//             } else {
//                 return res.json({
//                     code: 200,
//                     message: CONFIG.message.add,
//                     data: []
//                 })
//             }

//         }
//     })
// }
exports.addCategory = function (req, res) {
    console.log(req.body, 'backend ---->>>>')
    let data = req.body ? req.body : {};

    const saveData = new Category({ category_name: data.data.categoryname });
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
            return res.json({
                code: 200,
                message: CONFIG.message.add,
                data: []
            })
        }
    })
}
exports.addsubcategory = function(req , res){
    console.log(req.body)
    const saveData = new Category({ category_name: req.body.data.subcategoryname , parent: true });
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
            // return res.json({
            //     code: 200,
            //     message: CONFIG.message.add,
            //     data: []
            // })
            Category.findByIdAndUpdate({_id : req.body.id},{$push:{
                sub_category : val._id
            }}).exec((err , resp)=>{
                if (err) {
                    return res.json({
                        code: 400,
                        message: CONFIG.message.Error,
                        data: err
                    });
                } else if (!resp) {
                    return res.json({
                        code: 202,
                        message: CONFIG.message.No_Record,
                        data: []
                    });
                } else {
                    return res.json({
                        code: 200,
                        message: CONFIG.message.add,
                        data: []
                    })
                }
            })
        }
    })
}

// exports.getSpecificCategory = function (req, res) {
//     console.log(req.params)
//     Category.findById({ _id: req.params.id }).populate({ path: 'sub_category' }).exec((err, result) => {
//         if (err) {
//             return res.json({
//                 code: 400,
//                 message: CONFIG.message.Error,
//                 data: err
//             });
//         } else if (!result) {
//             return res.json({
//                 code: 202,
//                 message: CONFIG.message.No_Record,
//                 data: []
//             });
//         } else if (result) {
//             return res.json({
//                 code: 200,
//                 message: CONFIG.message.success1,
//                 data: result
//             })
//         }
//     })
// }

exports.getSpecificCategory = function (req, res) {
    console.log(req.params)
    Category.findById({ _id: req.params.id }).exec((err, result) => {
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
                    var greater = data.sub_category.length >= result.sub_category.length ? data.sub_category : result.sub_category;

                    if (data.sub_category.length >= result.sub_category.length) {
                        data.sub_category.forEach(function (el, index) {
                            console.log(result.sub_category.length, "1111=================-----", data.sub_category.length);
                            if (el._id == null) {
                                var newsaveData = new Category({
                                    category_name: data.sub_category[index].category_name,
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
                            } else if (el._id == (result.sub_category[index] && result.sub_category[index]._id).toString()) {
                                console.log("Inside update same")
                                Category.findByIdAndUpdate({ _id: result.sub_category[index]._id }, { $set: { category_name: el.category_name } }, { new: true },
                                    function (err, done) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log(done, "Data saved successfully.")
                                        }
                                    })
                            } else {
                                console.log("Inside delete------------", index)
                                Category.remove({ _id: result.sub_category[index]._id },
                                    function (err, done) {
                                        console.log("Inside Delete========>>>>>>>")
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log(done, "Data saved successfully.")
                                        }
                                    })
                            }
                        })
                    } else {
                        result.sub_category.forEach(async function (el, index) {
                            console.log(el._id, '==', (data.sub_category[index] && data.sub_category[index]._id), "1111=================-----", data.sub_category.length);
                            await data.sub_category.forEach(function (sub, index2) {
                                console.log(sub._id == el._id.toString(), "-------Herererer");
                                if (sub._id == el._id.toString()) {
                                    data.sub_category.forEach(async function (da, index) {
                                        await Category.findByIdAndUpdate({ _id: da._id }, { $set: { category_name: da.category_name } }, { new: true },
                                            function (err, done) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log(done, "Data saved successfully.")
                                                }
                                            })
                                    })
                                } else if (sub._id == null && sub._id != el._id.toString()) {
                                    var newsaveData = new Category({
                                        category_name: sub.category_name,
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
                                    if (el._id) {
                                        Category.remove({ _id: el._id },
                                            function (err, done) {
                                                console.log("Inside Delete========>>>>>>>")
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log(done, "Data popped successfully.")
                                                }
                                            })
                                    }
                                }
                            })

                        })
                    }
                    return res.json({
                        code: 200,
                        message: CONFIG.message.update,
                        data: []
                    })
                }
            }
        })
}
exports.getsubcategory = function (req, res) {
    console.log(req.params)
    Category.findOne({ _id: req.params.id })
        .populate({ path: 'sub_category' })
        .sort({"createdAt":-1})
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
        }).sort({"createdAt":-1})
        .populate({ path: 'sub_category' })
        .countDocuments().then(function (count) {
            Category.find({
                'isDeleted': false, parent: false,
                category_name: new RegExp(req.body.searchString, 'gi'),
            }).sort({"createdAt":-1})
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

exports.getAllCategory = function (req, res) {
    Category.find(
        {
            'isDeleted': false,
            parent: false,
           
        }).sort({"createdAt":-1})
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


// exports.deleteCategory = function (req, res) {
//     let data = req.body ? req.body : {};
//     Category.findByIdAndUpdate({ _id: data.id }, {
//         $set: {
//             isDeleted: true
//         }
//     }).exec((err, result) => {
//         if (err) {
//             return res.json({
//                 code: 400,
//                 message: CONFIG.message.Error,
//                 data: err
//             });
//         } else if (!result) {
//             return res.json({
//                 code: 202,
//                 message: CONFIG.message.No_Record,
//                 data: []
//             });

//         } else if (result) {
//             return res.json({
//                 code: 200,
//                 message: CONFIG.message.success1,
//                 data: result
//             })
//         }
//     })
// }
exports.deleteCategory = function (req, res) {
    let data = req.body ? req.body : {};
    console.log(data)
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
            // return res.json({
            //     code: 200,
            //     message: CONFIG.message.success1,
            //     data: result
            // })
            if (data.cat_id) {
                console.log('here' , data.cat_id , data.id)
                Category.findByIdAndUpdate({ _id: data.cat_id },
                    {$pull:{ sub_category : mongoose.Types.ObjectId(data.id)}}).exec((err, result1) => {
                    console.log(err , result1)
                    if (err) {
                        
                        return res.json({
                            code: 400,
                            message: CONFIG.message.Error,
                            data: err
                        });
                    } else if (!result1) {
                        return res.json({
                            code: 202,
                            message: CONFIG.message.No_Record,
                            data: []
                        });

                    } else if (result1) {
                        return res.json({
                            code: 200,
                            message: CONFIG.message.delete,
                            data: []
                        })
                    }
                })
            } else {
                return res.json({
                    code: 200,
                    message: CONFIG.message.delete,
                    data: []
                })
            }
        }
    })
}

exports.editsubcategory = function(req , res){
    console.log(req.body);
    Category.findByIdAndUpdate({_id : req.body.data.id},{$set:{
        category_name : req.body.data.editsubcategoryname
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
                data: []
            });

        } else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.update,
                data: []
            })
        }
    })
}