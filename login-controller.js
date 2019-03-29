//login api starts
const Joi = require('joi');
const response = [];
const crypto = require('crypto');
exports.login = function (req, res) {
    let password = req.body.password;
    let email = req.body.email;
    if (email == '' || password == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please fill both the feilds to continue'
        })

    } else {
        db.query('SELECT * FROM users WHERE email = ? or  username=?', [email, email], function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    response: error,
                    message: 'error with the query'
                })
            } else {
                if (results.length > 0) {
                    if (results[0].password == password && results[0].verify_otp == 1) {
                        res.json({
                            status: true,
                            response: {"user_id": results[0].id, "login_type": results[0].user_login_type,"access_token":results[0].access_token},
                            message: 'login successfully'
                        })

                    } else if (results[0].verify_otp != '1') {
                        res.json({
                            status: false,
                            response: response,
                            message: 'Verify Your Mobile Number first!'
                        })


                    } else {
                        res.json({
                            status: false,
                            response: response,
                            message: 'Email and password does not match'
                        })

                    }
                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Email or Username does not exits'
                    })

                }
            }
        });
    }
}


//for login or resigter user with social logins
module.exports.socialLogin=function(req,res){
let faceBookID = req.body.facebookId;
let loginType;
let googleId = req.body.googleId;
let user_role = req.body.user_role;
let user_email = req.body.email;
if(user_role!='U' && user_role !='O'){

    res.json({
        status: false,
        response: response,
        message: 'Please check for correct values in user role (Hint:U and O it accepts these values only )'
    })

}
let checkUsers = "SELECT * FROM `users` WHERE (email='"+user_email+"' ANd user_login_type = 'N') OR google_id ='"+googleId+"' OR facebook_id ='"+faceBookID+"'";
    db.query(checkUsers, (err, result) => {
if(result.length > 0){
    res.json({
        status: true,
        response: {"user_id":result[0].id,"access_token":result[0].access_token,"user_login_type":result[0].user_login_type},
        message: 'User already exists and login successfully'
    })

}
else{
    let token = crypto.randomBytes(32).toString('hex');
    if(faceBookID != ''){

        loginType = 'F';

    }
    if(googleId !=''){

        loginType = 'G';
    }
  let user_details = {
       "google_id": googleId,
      "facebook_id":faceBookID,
      "user_login_type":loginType,
      "email":user_email,
      "user_role":user_role,
      "access_token":token,
      "verify_otp":1

  }
    db.query('INSERT INTO users SET ?', user_details, function (error, results, fields) {
     if(error){

         res.json({
             status: false,
             response: error,
             message: 'Something Went Wrong!'
         })

     }
else{
         res.json({
             status: true,
             response: {"user_id":results.insertId,"access_token":token,"user_login_type":loginType},
             message: 'User register and login successfully'
         })

     }



    });


}



    });


}
//login with google api 
exports.googleLogin = function (req, res) {

    var passport = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const GOOGLE_CLIENT_ID = '264501289824-43r8gc6eqb08l444ttthrbcnphucoknk.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = 'ay0av7mJU-xG3mn6-aQWgwJI';
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {

            let userQuery = "SELECT * FROM `users` WHERE google_id = '" + profile.id + "'";
            db.query(userQuery, (err, result) => {
                if (result.length > 0) {
                    return done('You are logged in.Thanks!');

                } else {


                    let fullName = profile.displayName;
                    let image = profile.photos[0].value;
                    let login_type = 'G';
                    let google_id = profile.id;
                    // let userEmail = profile.emails[0].value;
                    //console.log(userEmail);

                    // let image_name =profile.photos;
                    let query = "INSERT INTO `users` (username,login_type,user_image,google_id) VALUES ('" + fullName + "','" + login_type + "','" + image + "','" + google_id + "')";
                    //console.log(query);
                    db.query(query, (err, result) => {
                        if (err) {
                            console.log('error in registration');
                        }
                        return done(fullName + 'You are logged in.Thanks for register!');
                    });


                }


            });

        }
    ));


}