var Product = require('./../models/product');
var Brand = require('./../models/brand');
var CONFIG = require('./../../config/config')
var Category = require('./../models/productCategory');
var SubCategory = require('./../models/productSubcategory');
var Countries = require('./../models/countries');
var Colors = require('./../models/color');
var Sizes = require('./../models/size');
var formidable = require('formidable');
var im = require('imagemagick')
var fs = require('fs');
var mongoose = require('mongoose');
// var deepPopulate = require('mongoose-deep-populate')(mongoose)

exports.addProduct = function (req, res) {
    // console.log(req.body)

    let data = req.body.data ? req.body.data : {};



    var saveData = new Product({
        product_name: data.product_name,
        description: data.description,
        brand: data.brand,
        category: data.category,
        sub_category: data.sub_category,
        deepsub_category : data.deepsub_category
    });



    saveData.save(function (err, result) {
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

            data.varient.forEach(function (element) {

                element.color.forEach(function (colorElement) {

                    element.size.forEach(function (sizeElment) {

                        var newarr = [];
                        newarr.push({ color: colorElement._id, size: sizeElment._id, country: element.country, count: null, price: null })
                        console.log(newarr)
                        Product.findByIdAndUpdate({ _id: result._id }, {
                            $push: {
                                variants: newarr
                            }
                        }).exec((err, resp) => {

                        })
                    })
                })
            })
            return res.json({
                code: 200,
                message: CONFIG.message.add,
                data: result
            })
        }
    })

}


exports.updateProduct = function (req, res) {
    console.log(req.body)
    let data = req.body ? req.body : {};
    Product.findByIdAndUpdate({ _id: data.id }, {
        $set: {
            product_name: data.product_name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            sub_category: data.sub_category,
            deepsub_category : data.deepsub_category,
            status: data.OrderStatus
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
            if (data.varient.length == 0) {
                return res.json({
                    code: 200,
                    message: CONFIG.message.update,
                    data: result
                })
            } else {
                data.varient.forEach(function (element) {

                    element.color.forEach(function (colorElement) {

                        element.size.forEach(function (sizeElment) {

                            var newarr = [];
                            newarr.push({ color: colorElement._id, size: sizeElment._id, country: element.country, count: null, price: null })

                            Product.findByIdAndUpdate({ _id: result._id }, {
                                $push: {
                                    variants: newarr
                                }
                            }).exec((err, resp) => {

                            })
                        })
                    })
                })

                return res.json({
                    code: 200,
                    message: CONFIG.message.update,
                    data: result
                })
            }
        }
    })
}
exports.getsubcategory = function (req, res) {
    Category.findById({ _id: req.params.id })
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
            } else {
                return res.json({
                    code: 200,
                    message: CONFIG.message.success1,
                    data: result
                })
            }
        })
}
exports.getcategory = function (req, res) {
    Category.find({ isDeleted: false ,parent : false })
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
            } else {
                return res.json({
                    code: 200,
                    message: CONFIG.message.success1,
                    data: result
                })
            }
        })
}
exports.getallCategory = function (req, res) {
    Category.find({
        isDeleted: false,
        parent : false,
        title: new RegExp(req.body.searchString, 'gi')
    }).sort({ "createdAt": -1 })
        .populate({ path: 'sub_category' })
        .countDocuments().then(function (count) {
            Category.find({
                isDeleted: false,
                parent : false,
                title: new RegExp(req.body.searchString, 'gi')

            }).sort({ "createdAt": -1 }).populate({ path: 'sub_category',populate: { path: 'sub_category' }})
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
                    } else {
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
exports.getProduct = function (req, res) {
    console.log('here')
    Product.find({
        isDeleted: false,
        product_name: new RegExp(req.body.searchString, "gi")
    }).sort({ "createdAt": -1 })
        .populate('brand')
        .populate('category')
        .populate('sub_category')
        .countDocuments().then(function (count) {
            Product.find({
                isDeleted: false,
                product_name: new RegExp(req.body.searchString, "gi")
            }).sort({ "createdAt": -1 })
                .populate('brand')
                .populate('category')
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
                            data: [],
                            Count: count
                        });
                    } else if (result) {
                        return res.json({
                            code: 200,
                            message: CONFIG.message.succes1,
                            data: result,
                            Count: count
                        })
                    }
                })
        })
}
exports.getcountries = function (req, res) {
    Countries.find({}).exec((err, result) => {
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
                message: CONFIG.message.succes1,
                data: result
            })
        }
    })
}
exports.getSpecificProduct = function (req, res) {
    Product.findById({ _id: req.params.id }).exec((err, result) => {
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
                message: CONFIG.message.succes1,
                data: result
            })
        }
    })
}
exports.deleteProduct = function (req, res) {
    Product.findByIdAndUpdate({ _id: req.params.id }, {
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
                message: CONFIG.message.delete,
                data: []
            })
        }
    })
}
exports.getAllBrand = function (req, res) {
    Brand.find({
        isDeleted: false,
        title: new RegExp(req.body.searchString, "gi")
    }).sort({ "createdAt": -1 }).countDocuments().then(function (count) {
        Brand.find({
            isDeleted: false,
            title: new RegExp(req.body.searchString, "gi")
        }).sort({ "createdAt": -1 })
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

exports.getSpecificProduct = function (req, res) {
    try {
        console.log(req.params)
        Product.findById({ _id: req.params.id })
            .populate('brand')
            .populate('sub_category')
            .populate('category')
            .populate('variants.country')
            .populate('variants.size')
            .populate('variants.color')
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
                        message: CONFIG.message.succes1,
                        data: result
                    })
                }
            })

    }

    catch (error) {
        return res.status(500).json(error);

    }
}
exports.uploadImage = function (req, res) {
    // console.log(req.files)
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/images';
    form.keepExtensions = true;
    // form.maxFieldsSize = 10 * 1024*1024;
    form.multiples = true;
    form.on('error', function (err) {

        return res.json({ status: 500, message: err });
    });
    //  console.log(err , '----------------------->>>>>>>>>>>>>>>>')
    form.parse(req, function (err, fields, files) {
        console.log('here----------------------->>>>>>>>>>>>>>>>', files, 'sgsg')
        if (files.image.length == undefined) {
            console.log(">>>>>", files.image.path)
            // let imgArr = files.image.path.split("/");
            // let img

            Product.findByIdAndUpdate({ _id: fields.id }, { $push: { images: files.image.path.slice(7) } }, function (err, result) {
                if (err) {
                    return res.json({ status: 500, message: err });
                }
                else {
                    //   fs.unlinkSync(files.image.path);
                    return res.json({ status: 200, data: { images: files.image.path } });
                }

            });
            // fs.unlinkSync(files.image.path);
            // res.json({ status: 200, message: constant.message.image_upload_success, data: newImagePath.slice(7) });
        }else {
            console.log(' i m here')
            let temp = [];
            for (var i = 0; i < files.image.length; i++) {
                console.log(files.image[i].path)
                temp.push({images:files.image[i].path})

                Product.findByIdAndUpdate({ _id: fields.id }, { $push: { images: files.image[i].path.slice(7) } }, function (err, result) {
                    if (err) {
                        console.log('Error',err);
                        //   return res.json({ status: 500 ,message:err});

                    }
                    else {
                        console.log('-=-=-=-=-=-=-=-=-',result)
                        // temp.push(files.image[i].path.slice(7))
                        //   fs.unlinkSync(files.image[i].path);
                        //   return res.json({ status: 200, data: { images: newImagePath.slice(7) } });
                    }
                });

                // fs.unlinkSync(files.image.path);
                // res.json({ status: 200, message: constant.message.image_upload_success, data: newImagePath.slice(7) });
            }





            return res.json({ status: 200, message: 'image uploded',data:temp });
        }
    });
}


exports.getSpecificCategory = function(req , res){
    console.log(req.params.id)
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

exports.deleteCategory = function (req, res) {
    console.log(req.body);
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
// exports.addCategory = function (req, res) {
//     let data = req.body ? req.body : {};
//     console.log("reqbody>>>>>>>>>>>", req.body);
//     Category.find({ title: data.category }).exec((err, result) => {
//         console.log(err, result)
//         if (err) {
//             return res.json({
//                 code: 400,
//                 message: CONFIG.message.Error,
//                 data: err
//             });
//         } if (result.length > 0) {
//             console.log('in result')
//             return res.json({
//                 code: 202,
//                 message: 'duplicate data',
//                 data: []
//             })
//         } else {
//             console.log('here')
//             var saveData = new Category({ title: data.category });
//             saveData.save(function (err, val) {
//                 if (err) {
//                     return res.json({
//                         code: 400,
//                         message: CONFIG.message.Error,
//                         data: err
//                     });

//                 } if (val) {
//                     // var subcate = new SubCategory({title :})
//                     console.log(data.sub_category, val)
//                     data.sub_category.forEach((element, index) => {
//                         console.log('aaaaa', data.sub_category[index])
//                         var subcate = new SubCategory({ title: data.sub_category[index].name });
//                         subcate.save(function (err, resp) {
//                             if (err) {
//                                 console.log(err)
//                             } else if (!resp) {
//                                 console.log('not added')
//                             } else if (resp) {

//                                 Category.findByIdAndUpdate({ _id: val._id }, {
//                                     $push: {
//                                         sub_category: resp._id
//                                     }
//                                 }).exec((err, finaldata) => {
//                                     if (err) {
//                                         console.log(err)
//                                     } else if (finaldata) {

//                                         if (data.sub_category[index].deep_sub_category.length > 0) {
//                                             data.sub_category[index].deep_sub_category.forEach((el, i) => {
//                                                 var sub_subcate = new SubCategory({ title: data.sub_category[index].deep_sub_category[i].deep_sub_category });
//                                                 sub_subcate.save().then(result1 => {
//                                                     console.log(result1)
//                                                     SubCategory.findByIdAndUpdate({ _id: resp._id }, {
//                                                         $push: {
//                                                             hasSubcategory: result1._id
//                                                         }
//                                                     })
//                                                         .exec((err, finatresult) => {
//                                                             if (err) {
//                                                                 console.log('err')
//                                                             } else if (finatresult) {
//                                                                 console.log('added')
//                                                             } else {
//                                                                 console.log('not added')
//                                                             }
//                                                         })
//                                                 }
//                                                 );
//                                             })

//                                         }
//                                     } else if (!finaldata) {
//                                         console.log('not added')
//                                     }
//                                 })
//                             }
//                         })
//                     });
//                     return res.json({
//                         code: 200,
//                         message: CONFIG.message.add,
//                         data: []
//                     })
//                 } if (!val) {
//                     return res.json({
//                         code: 202,
//                         message: CONFIG.message.No_Record,
//                         data: []
//                     });
//                 }
//             })
//         }
//     })
// }
exports.addsubcategory = function(req, res){
    console.log(req.body.data.subcategoryname)
    let data = req.body ? req.body : {};
    Category.findOne({title : data.data.subcategoryname , isDeleted : false}).exec((err , resp)=>{
        if (err) {
            return res.json({
                code:401,
                message:CONFIG.message.Error,
                data:err
            });
          } else if (!resp) {
              console.log('here',data.subcategoryname)
            var temp  = { 
                title : data.data.subcategoryname,
                parent : true
            }
            // if(data.cmsData.sub_category){
            //     temp.sub_category = data.cmsData.sub_category;
            // }
            const saveData = new Category(temp);
            saveData.save(function (err, val) {
              if (err) {
                return res.json({
                    code:400,
                    message:CONFIG.message.Error,
                    data:err
                });
              } else if (!val) {
                return res.json({
                    code:202,
                    message:CONFIG.message.No_Record,
                    data:[]
                });
              } else {
            //    return res.json({
            //     code : 200,
            //     message:CONFIG.message.add,
            //     data:[]
            //    })
            Category.update({_id : req.body.id},{$push:{
                sub_category : val._id
            }}).exec((err , result)=>{
                if (err) {
                    return res.json({
                        code:400,
                        message:CONFIG.message.Error,
                        data:err
                    });
                  } else if (!result) {
                    return res.json({
                        code:202,
                        message:CONFIG.message.No_Record,
                        data:[]
                    });
                  }else{
                    return res.json({
                            code : 200,
                            message:CONFIG.message.add,
                            data:[]
                           })
                  }
            })
              }
            })
            
          }  else if(resp){
            return res.json({
                code:202,
                message:"Category already exist",
                data:[]
            });
          }
    })
}
exports.addCategory = function(req , res){
    
    let data = req.body ? req.body : {};
        Category.findOne({title : data.categoryName , isDeleted : false}).exec((err , resp)=>{
        if (err) {
            return res.json({
                code:401,
                message:CONFIG.message.Error,
                data:err
            });
          } else if (!resp) {
              console.log('here')
            var temp  = { 
                title : data.categoryName
            }
            // if(data.cmsData.sub_category){
            //     temp.sub_category = data.cmsData.sub_category;
            // }
            const saveData = new Category(temp);
            saveData.save(function (err, val) {
              if (err) {
                return res.json({
                    code:400,
                    message:CONFIG.message.Error,
                    data:err
                });
              } else if (!val) {
                return res.json({
                    code:202,
                    message:CONFIG.message.No_Record,
                    data:[]
                });
              } else {
               return res.json({
                code : 200,
                message:CONFIG.message.add,
                data:[]
               })
              }
            })
            
          }  else if(resp){
            return res.json({
                code:202,
                message:"Category already exist",
                data:[]
            });
          }
    })
}
exports.getcolors = function (req, res) {
    Colors.find({}).exec((err, result) => {
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
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
            })
        }
    })
}
exports.saveVariants = function (req, res) {
    console.log(req.body)
    let data = req.body ? req.body : {};
    Product.findByIdAndUpdate({ _id: data.id }, {
        $set: {
            variants: []
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
        } else {
            data.varients.forEach(function (element) {
                console.log(element)
                Product.findByIdAndUpdate({ _id: data.id }, {
                    $push: {
                        variants: element
                    }
                }).exec((err, result) => {
                    if (err) {
                        // return res.json({
                        //     code: 400,
                        //     message: CONFIG.message.Error,
                        //     data: err
                        // });
                        // console.log('err')
                    } else if (!result) {
                        // return res.json({
                        //     code: 202,
                        //     message: CONFIG.message.No_Record,
                        //     data: []
                        // });
                        // console.log('not done')
                    } else {
                        // return res.json({
                        //     code: 200,
                        //     message: CONFIG.message.success1,
                        //     data: result
                        // })
                        // console.log('set')
                    }
                })
            })
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
            })

        }
    })

}
exports.getProductVarient = function (req, res) {
    Product.findById({ _id: req.params.id })
        .populate('variants.color')
        .populate('variants.size')
        .populate('variants.country').exec((err, result) => {
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
                return res.json({
                    code: 200,
                    message: CONFIG.message.success1,
                    data: result
                })
            }
        })
}
exports.getSpecificProductCategory = function (req, res) {
    Category.findById({ _id: req.params.id })
        .populate({ path: 'sub_category', populate: { path: 'hasSubcategory' } })

        .exec((err, result) => {
            console.log(err)
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
                return res.json({
                    code: 200,
                    message: CONFIG.message.success1,
                    data: result
                })
            }
        })
}
exports.getsizes = function (req, res) {
    Sizes.find({isDeleted:false})
    .populate('subCategory')
    .populate('Category').exec((err, result) => {
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
            return res.json({
                code: 200,
                message: CONFIG.message.success1,
                data: result
            })
        }
    })
}
exports.getspecificBrands = function (req, res) {
    Brand.findById({ _id: req.params.id }).exec((err, result) => {
        if (err) {
            return res.json({
                code: 400,
                message: CONFIG.message.Error
                , data: err
            })
        }
        else if (!result) {
            return res.json({
                code: 202,
                message: CONFIG.message.No_Record,
                data: []

            })
        }
        else if (result) {
            return res.json({
                code: 200,
                message: CONFIG.message.add,
                data: result
            })
        }
    })
}


exports.updatebrand = function (req, res) {
    let data = req.body ? req.body : {};
    console.log(",,,,,,,,,,,,", data)
    Brand.findByIdAndUpdate({ _id: data.id }, {
        $set: {
            title: data.brand,

        }
    }).exec((err, result) => {

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

exports.deletebrand = function (req, res) {
    Brand.findByIdAndUpdate({ _id: req.params.id }, {
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
                message: CONFIG.message.delete,
                data: []
            })
        }
    })
}
exports.addBrand = function (req, res) {
    let data = req.body ? req.body : {};
    console.log(req.body)
    const saveData = new Brand({
        title: data.brand,
    });
    saveData.save(function (err, result) {
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
                message: CONFIG.message.add,
                data: []
            })
        }
    })

}
exports.addsize = function (req, res) {
    let data = req.body ? req.body : {};
    console.log(req.body)
    if (data.type == 'cm') {
        var arr = [{
            typeOfsize: 'length',
            "sizeValue": data.Length,
            "sizetype": "cm"
        },
        {
            typeOfsize: 'width',
            "sizeValue": data.Width,
            "sizetype": "cm"
        }]
    }
    if (data.type == 'in') {
        var arr = [{
            typeOfsize: 'length',
            "sizeValue": data.Length,
            "sizetype": "in"
        },
        {
            typeOfsize: 'width',
            "sizeValue": data.Width,
            "sizetype": "in"
        }]
    }
    const saveData = new Sizes({
        sizeName: data.Size,
        subCategory: data.sub_category,
        Category: data.category,
        measurement: arr
    });
    saveData.save(function (err, result) {
        if (err) {
            console.log(err)
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
                message: CONFIG.message.add,
                data: []
            })
        }
    })

}
exports.listsize = function (req, res) {
    Sizes.find({
        isDeleted: false,
        sizeName: new RegExp(req.body.searchString, "gi")

    }).sort({ "createdAt": -1 })
        .populate("Category").populate("subCategory")
        .countDocuments().then(function (count) {
            Sizes.find({
                isDeleted: false,
                sizeName: new RegExp(req.body.searchString, "gi")

            }).sort({ "createdAt": -1 })
            .populate("Category").populate("subCategory")
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
    // })
}
exports.getspecificSize = function (req, res) {
    console.log("///////////", )
    Sizes.findById({ _id: req.params.id }).populate("Category").populate("subCategory")
        .exec((err, result) => {
            if (err) {
                return res.json({
                    code: 400,
                    message: CONFIG.message.Error
                    , data: err
                })
            }
            else if (!result) {
                return res.json({
                    code: 202,
                    message: CONFIG.message.No_Record,
                    data: []

                })
            }
            else if (result) {
                return res.json({
                    code: 200,
                    message: CONFIG.message.add,
                    data: result
                })
            }
        })
}
exports.deleteSize = function (req, res) {
    Sizes.findByIdAndUpdate({ _id: req.params.id }, { $set: { isDeleted: true } }).exec((err, result) => {
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
                message: CONFIG.message.delete,
                data: []
            })
        }
    })
}

exports.updateSize = function (req, res) {
    console.log(req.body)
    let data = req.body ? req.body : {};
    if (data.sizetype == 'cm') {
        var arr = [{
            typeOfsize: 'length',
            "sizeValue": parseInt(data.length),
            "sizetype": "cm"
        },
        {
            typeOfsize: 'width',
            "sizeValue": parseInt(data.width),
            "sizetype": "cm"
        }]
    }
    if (data.sizetype == 'in') {
        var arr = [{
            typeOfsize: 'length',
            "sizeValue": parseInt(data.length),
            "sizetype": "in"
        },
        {
            typeOfsize: 'width',
            "sizeValue": parseInt(data.width),
            "sizetype": "in"
        }]
    }
    Sizes.findByIdAndUpdate({ _id: data.id }, {
        $set: {
            sizeName: data.sizeName,
            subCategory: data.sub_category,
            Category: data.category,
            measurement: arr
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
                message: CONFIG.message.update,
                data: []
            })
        }
    })
}
exports.updateProdCategory = function (req, res) {
    let subcat = req.body.form.sub_category;
    Category.findOneAndUpdate({ _id: req.body.category_id }, { $set: { title: req.body.form.category_name }, new: true })
        .populate({ path: 'sub_category' })
        .exec(async function (err, data) {
            console.log(err, data, "=======>>>>>")
            if (err) {
                res.json({
                    code: 400,
                    message: CONFIG.message.Error,
                    Error: err
                })
            } else {
                await subcat.forEach((element, key) => {
                    if (element._id == null) {

                        let tempdata = {
                            title: element.category_name
                        }
                        let temp = new SubCategory(tempdata)
                        temp.save().then(function (saved) {
                            if (saved) {
                                console.log('New record has been saved.', saved)
                                Category.findOneAndUpdate({ _id: req.body.category_id }, { $push: { sub_category: saved._id } }, function (err, newdata) {
                                    if (err) {
                                        console.log("Error in saving add document", err)
                                    } else {
                                        console.log("New record added")
                                    }
                                })
                            }
                        })
                    } else {
                        SubCategory.findByIdAndUpdate({ _id: element._id }, { $set: { title: req.body.form.sub_category[key].category_name }, new: true }, function (err, data) {
                            if (err) {
                                console.log("Error while saving the information.", err)
                            } else {
                                console.log('Completed update......>>>>>>>')
                            }
                        })
                    }
                })
                res.json({
                    code: 200,
                    message: 'Updation completed successfully.',
                    data: data
                })
            }
        })
}
exports.getSpecificProductCategory = function (req, res) {
    Category.findById({ _id: req.params.id })
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
                    message: 'Data retrieved',
                    data: result
                })
            }
        })
}
exports.updateProdSubCategory = function (req, res) {
    let subcat = req.body.sub_categoryID;
    Category.findOneAndUpdate({ title: req.body.category_name }, { $pull: { sub_category: req.body.sub_categoryID } })
        .populate({ path: 'sub_category' })
        .exec(function (err, data) {
            if (err) {
                res.json({
                    code: 400,
                    message: CONFIG.message.Error,
                    Error: err
                })
            } else {
                if (data)
                    res.json({
                        code: 200,
                        message: 'Sub category deleted successfully',
                        data: data
                    })
            }
        })
}
exports.deleteProductImage = function (req, res) {
    console.log(req.body, "---===============>>>>>>>>>>>>>");
    let data = req.body ? req.body : {};
    Product.findByIdAndUpdate({ _id: data.id }, { $set: { images: [] } })
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
                Product.findByIdAndUpdate({ _id: data.id }, { $set: { images: data.image } })
                    .exec((err, resp) => {
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
                        } else if (resp) {
                            return res.json({
                                code: 200,
                                message: CONFIG.message.delete,
                                data: resp
                            })
                        }
                    })
            }
        })
}

exports.editsubcategory = function(req , res){
   
    let data = req.body ? req.body : {};
    Category.findByIdAndUpdate({_id : data.id},{$set:{
        title:data.editsubcategoryname
    }
    }).exec((err , result)=>{
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
exports.getDeepSubcategory = function(req , res){
     let data = req.body ? req.body : {};
     Category.find({_id:data.id}).populate({ path: 'sub_category'})
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
                   
                });
            } else {
                return res.json({
                    code: 200,
                    message: CONFIG.message.success1,
                    data: result,
                    
                })
            }
        }) 
 }