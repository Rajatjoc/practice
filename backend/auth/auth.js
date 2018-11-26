var mongoose = require('mongoose');
var User = mongoose.model('users');

exports.isAuth = function (req, res, next) {
    console.log('token from front end >>>>>>>>>>>>>.',req.headers['authorization'])
  
    console.log('=======>>>??????')
    if (!req.headers['authorization'] || req.headers['authorization'] === 'undefined') {
         console.log(req.headers,'here')
            return res.json({ code: 401, message: 'You are not loggedin!! Please login.' })
        }
        if (req.headers['authorization']) {   
            let modifiedTokenArr = req.headers.authorization.split(" ");
            let modifiedToken = modifiedTokenArr[1];    
            User.findOne({token : modifiedToken}).exec((err , data)=>
        {
            if(err)
            {   console.log("err is >>>>>>>>>>." ,err);
                return res.json({ code: 401, message: 'You are not loggedin!! Please login.' })
                
            }
            else if(data)
            {    
                console.log('Token Match.User Authenticated')
                next();
            }
            else{
                console.log("not valid is >>>>>>>>>>." );
               
                return res.json({ code: 401, message: 'Your authorization is not valid!!.',"status" : false }); 
            }
        })
        }

    // if (!req.headers['authorization'] || req.headers['authorization'] === 'undefined') {
    //  console.log(req.headers,'here')
    //     return res.json({ status: 401, msg: 'You are not loggedin!! Please login.' })
    // }
    // var user = new User();
    // user.verifyToken(req.headers['authorization'], function (valid) {
    //     if (!valid) {
    //        console.log('invalid')
    //         return res.json({ status: 401, msg: 'Your authorization is not valid!!.' });
    //     }
    //     else {
    //         console.log('valid')
    //         req.body.user_params = valid;
    //         next();
    //     }
    // })
}