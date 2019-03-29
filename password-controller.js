
const nodemailer = require('nodemailer');
exports.changePassword=function(req,res){
	
let user_id = req.body.id;
let passPattern = /^.{8,20}$/i;
let response = [];
let login_type = 'N';
    if(user_id == ''){

        res.json({
            status: false,
            response:response,
            message: 'user id is required'
        })

    }
    else {
        let usernameQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "' AND user_login_type ='"+login_type+"'";
        db.query(usernameQuery, (err, result) => {
            if (err) {

                res.json({
                    status: false,
                    response: err,
                    message: 'error with the query.'
                })


            }
            if (result.length == 0) {

                res.json({
                    status: false,
                    response:response,
                    message: 'user not found'
                })

            }

            else {
                if (result.length > 0) {


                    let oldPass = req.body.oldpass;
                    if(oldPass == ''){

                        res.json({
                            status: false,
                            response:response,
                            message: 'old password is required'
                        })

                    }
                    let newPass = req.body.newpass;
                    if(newPass == ''){

                        res.json({
                            status: false,
                            response:response,
                            message: 'New password is required'
                        })

                    }
                    if(passPattern.test(newPass) == false){


                        res.json({
                            status: false,
                            response:response,
                            message: 'please fill password min 8 and max 20 characters.'
                        })


                    }




                    if (oldPass == result[0].password) {

                        let query = "UPDATE `users` SET `password` = '" + newPass + "' WHERE `users`.`id` = '" + user_id + "'";
                        db.query(query, (err, result) => {
                            if (err) {

                                res.json({
                                    status: false,
                                    response: err,
                                    message: 'there are some error with query'
                                })

                            }

                            res.json({
                                status: true,
                                response: response,
                                message: "password changed successfully"
                            });

                        });


                    } else {
                        res.json({
                            status: false,
                            response: response,
                            message: "old password does not match."
                        });

                    }


                }


            }


        });

    }
}

//forgot password api start
exports.forgotPassword = function(req,res,next){
	let email = req.body.email;
	var async = require('async');
	var crypto = require('crypto');
	let login_type = 'N';
	var response = [];
	if(email != ''){
async.waterfall([  
        function(done) {  
            crypto.randomBytes(20, function(err, buf) {  
                var token = buf.toString('hex');  
                done(err, token);  
            });  
        },
           function(token, done) {    
            let userQuery = "SELECT * FROM `users` WHERE email = '" + email + "' OR username='"+email+"' AND user_login_type='"+login_type+"'";
            console.log(userQuery);
        db.query(userQuery, (err, result) => {
        if(result.length > 0){
    let user_email = result[0].email;
    let resetPasswordToken = token;
    let resetPasswordExpires = Date.now() + 3600000;
     let updateTokenQuery = "UPDATE `users` SET `remember_token` = '" + resetPasswordToken + "' WHERE `users`.`email` = '" + email + "' or `users`.`username` = '"+email+"'";
     console.log(updateTokenQuery);
     db.query(updateTokenQuery,(err,result) => {
if(err){

res.json({
                  status: false,
                  response:response,
                  message: 'some errors with query'
              })

}
done(err, token, result);  

     });
        }else{

res.json({
                  status: false,
                  response:response,
                  message: 'user email does not exist.'
              })
} 
                    
                    //done(err, token, result);  
                
              
        });

      


	},
	 function(token, result, done) {
         let userQuery = "SELECT * FROM `users` WHERE email = '" + email + "' or username='"+email+"'";
         console.log(userQuery);
         db.query(userQuery, (err, results) => {

             var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      user: 'adarshsharma002@gmail.com',
                      pass: '9129393002'
                  }
              });
              var mailOptions = {
                  from: 'contact@codetribesolutions.com',
                  to: results[0].email,
                  subject: 'Reset Password Email',
                  html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.Please click on the following link, or paste this into your browser to complete the process.<a href="http://18.218.65.91:3000/reset/' + token + '" style="display: block;  width: 115px;height: 25px; background: #4E9CAF; padding: 10px; text-align: center;  border-radius: 5px;  color: white; font-weight: bold;">Click here to reset password</a>'
              };
              transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Email sent: ' + info.response);
                  }
              });
 res.json({
                  status: true,
                  response:{"user_id": results[0].id,"user_email": results[0].email},
                  message: 'user reset password link sent sucessfully',


}) });
	 }

 ], function(err) {  
        if (err) return next(err);  
          
    }); 




}
	else {
        res.json({
            status: false,
            response: response,
            message: "please fill email first!"
        });
    }




}
//resend email if not receiving by the user
module.exports.resendEmail=function(req,res){
let user_email = req.body.email;
let login_type = 'N';
let response =[];
if(user_email == ''){

    res.json({
        status: false,
        response: response,
        message: "please fill email first to resend verification email!"
    });

}
else {
    let userQuery = "SELECT * FROM `users` WHERE email = '" + user_email + "' OR username='" + user_email + "' AND user_login_type='" + login_type + "'";
    db.query(userQuery, (err, result) => {
        if (result.length > 0) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'adarshsharma002@gmail.com',
                    pass: '9129393002'
                }
            });
            let mailOptions = {
                from: 'contact@codetribesolutions.com',
                to: user_email,
                subject: 'Verification Email',
                html: 'You are receiving this because you  have requested the verification email for your account.Please click on the following link to complete the process.<a href="http://18.218.65.91:3000/verify-email/' + result[0].verification_token + '" style="display: block;  width: 115px;height: 25px; background: #4E9CAF; padding: 10px; text-align: center;  border-radius: 5px;  color: white; font-weight: bold;">Click here to verify email</a>'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({
                status: true,
                response: {"user_id": result[0].id, "user_email": result[0].email},
                message: 'email resent successfully!',


            })


        } else {
            res.json({
                status: false,
                response: response,
                message: "Email or username does not exist!"
            });


        }


    });

}


}






//reset pass 
exports.resetPassword=function(req,res){
    let token = req.params.token;
//console.log('hii i am here!');
    res.render('reset-password.ejs', {
     title:'change your password',
        token:token,
    });




}
exports.ResetpasswordNow=function (req,res) {
    let token = req.body.token;

    var passPattern = /^.{8,20}$/i;
    let query = "SELECT * FROM `users` WHERE remember_token = '"+token+"'";
    db.query(query,(err,result)=> {
        if (result.length > 0) {
            let user_id = result[0].id;
            let newPass = req.body.new_pass;
            let cPass = req.body.confirm_pass;
            if (newPass == cPass){
                let updatePass = "UPDATE `users` SET `password` = '" + newPass + "' WHERE `id` = '" + user_id + "'";
            db.query(updatePass, (err, result) => {
                req.flash('success', 'password reset successfully')
                res.redirect('back');
              // console.log('password rest successfully');
               // res.redirect("/reset/'+token+'",{req:req,data:message});

            })
        }
            else if(passPattern.test(req.body.confirm_pass) == false){

                req.flash('error', 'password should be min 8 and max 20 characters')
                res.redirect('back');
              console.log('password should be min 8 and max 20 characters');

            }

            else{
                req.flash('error', 'password and confirm pass did not match')
            console.log('password and confirm pass did not match');
                res.redirect('back');

            }
    }
        else{
            req.flash('error', 'invalid or expired session please try later again.')
            res.redirect('back');

            console.log('invalid or expired session please try later again.');

        }



    });










}