var CMS = require('./../models/cms');
var CONFIG = require('./../../config/config')


/**
 * 
 * 
 * add cms pages
 * 
 */
exports.addCms = function(req , res){
    console.log(req.body)
    let data = req.body ? req.body : {};
    const saveData = new CMS(data.cmsData);
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
} 

/**
 * delete cms pages
 * 
 * 
 * 
 */
exports.deleteCms = function(req , res){
    let data = req.body ? req.body : {};
    CMS.findByIdAndUpdate({"_id":data.id},{$set:{isDeleted : true}}).exec((err , result)=>{
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
          } else {
            CMS.find({isDeleted:false},function(err,results){
                return res.json({
                    code : 200,
                    message:CONFIG.message.delete,
                    data:results
                   })
            })
          }
    })
}

/**
 * 
 * update cms page by id
 * 
 * 
 */
exports.updateCms = function(req , res){
    console.log(req.body);
    let data = req.body.data ? req.body.data : {};
    CMS.findByIdAndUpdate({'_id':data.id},{$set:{
        page_title: data.page_title,
        page_category: data.page_category,
        content: data.content,
        sub_category: data.sub_category
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
          } else {
           return res.json({
            code : 200,
            message:CONFIG.message.update,
            data:[]
           })
          }
    })
    }
    
/**
 * 
 * get details of specific cms
 * 
 * 
 */
exports.editById = function(req , res){
    let data = req.params ? req.params : {};
    CMS.findById({"_id" : data.id}).exec((err , result)=>{
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
          } else {
           return res.json({
            code : 200,
            message:CONFIG.message.success1,
            data:result
           })
          }
    })
    }

 /**
 * 
 * get all cms pages
 * 
 * 
 */
    exports.getAllCms = function(req , res){
        console.log(req.body,"Sanjeev");
        CMS.find(
            {'isDeleted' : false,
            page_title: new RegExp(req.body.searchString,'gi'),
        }).countDocuments().then(function(count){
            CMS.find(
                {'isDeleted' : false,
                page_title: new RegExp(req.body.searchString,'gi'),
            }).exec((err , result)=>{
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
                        data:[],
                        Count:count
                    });
                  } else {
                   return res.json({
                    code : 200,
                    message:CONFIG.message.success1,
                    data:result,
                    Count:count
                   })
                  } 
            })
        })
        return;
        
    }