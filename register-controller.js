const fs = require('fs');
const Joi = require('joi');
const accountSid = 'AC9e4f8538a2ced6e8d280cce1df1c908a';
const authToken = '048c7913d9d5e705a1878e1c7708c780';
const client = require('twilio')(accountSid, authToken);
const today = new Date();
const crypto = require('crypto');
const moment = require('moment');
const mobilePattern = /^.{10}$/i;
const otpPattern = /^.{4}$/i;
const Countrycode = /^\+?\d+$/i;
const passPattern = /^.{8,20}$/i;
const pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
//api for registering a user 
module.exports.register = function (req, res) {
    let response = [];
    let token = crypto.randomBytes(20).toString('hex');
    let country_code = req.body.country_code;
    let user_mobile = req.body.user_mobile;

    if (req.body.username == '') {

        res.json({
            status: false,
            response: response,
            message: 'username field is required.'
        })

    } else if (req.body.password == '') {

        res.json({
            status: false,
            response: response,
            message: 'password field is required.'
        })

    } else if (passPattern.test(req.body.password) == false) {

        res.json({
            status: false,
            response: response,
            message: 'please fill password min 8 and max 20 characters.'
        })


    } else if (req.body.email == '') {

        res.json({
            status: false,
            response: response,
            message: 'email field is required.'
        })

    } else if (pattern.test(req.body.email) == false) {

        res.json({
            status: false,
            response: response,
            message: 'Enter a valid Email .Please!'
        })


    } else if (req.body.user_mobile == '' || req.body.country_code == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill the mobile Number and country code first!'
        })


    } else if (mobilePattern.test(req.body.user_mobile) == false || Countrycode.test(req.body.country_code) == false) {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill the correct mobile Number and country code to continue'
        })


    } else if (req.body.user_role == '') {
        res.json({
            status: false,
            response: response,
            message: 'User role is missing!Please fill user role first'
        })


    } else if (req.body.user_role != 'U' && req.body.user_role != 'O') {
        res.json({
            status: false,
            response: response,
            message: 'Please check for correct values in user role (Hint:U and O it accepts these values only )'
        })


    } else {
        let usernameQuery = "SELECT * FROM `users` WHERE username = '" + req.body.username + "' OR email = '" + req.body.email + "' ";
        console.log(usernameQuery);
        db.query(usernameQuery, (err, result) => {
            if (result.length > 0) {
                res.json({
                    status: false,
                    response: response,
                    message: 'username or email already exists.'
                })

            } else {
                let Otp = Math.floor(1000 + Math.random() * 9000);
                let message = 'Confirm Your one time password to complete registration process.Your OTP is' + Otp;

                client.messages
                    .create({
                        body: message,
                        from: '+13518881660',
                        to: country_code + user_mobile


                    }, function (error, message) {
                        // The HTTP request to Twilio will run asynchronously. This callback
                        // function will be called when a response is received from Twilio
                        // The "error" variable will contain error information, if any.
                        // If the request was successful, this value will be false
                        if (!error) {
                            // The second argument to the callback will contain the information
                            // sent back by Twilio for the request. In this case, it is the
                            // information about the text messsage you just sent:
                            console.log('Success! The SID for this SMS message is:');
                            //.then(message => console.log(message.sid))


                            console.log('Message sent on:');
                        }
                    });
                var users = {
                    "username": req.body.username,
                    "email": req.body.email,
                    "password": req.body.password,
                    "user_role": req.body.user_role,
                    "user_login_type": 'N',
                    "user_mobile": req.body.user_mobile,
                    "verification_token": token,
                    "user_otp": Otp,
                    "created_at": today,
                    "updated_at": today
                }

                db.query('INSERT INTO users SET ?', users, function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: false,
                            response: error,
                            message: 'there are some error with query'
                        })
                    } else {
                        var nodemailer = require('nodemailer');

                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'adarshsharma002@gmail.com',
                                pass: '9129393002'
                            }
                        });
                        var mailOptions = {
                            from: 'contact@codetribesolutions.com',
                            to: req.body.email,
                            subject: 'Registration Email',
                            html: 'Hello, ' + req.body.username + ' <br><br> Thank you for joining us!!<br>We are excited to have you as a new addition to our growing network.<br><a href="http://18.218.65.91:3000/verify-email/' + token + '" style="display: block;  width: 115px;height: 25px; background: #4E9CAF; padding: 10px; text-align: center;  border-radius: 5px;  color: white; font-weight: bold;">Click here to verify email</a>'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });

                        /* response['user_id'] = results.insertId;
                         console.log(results.insertId);*/
                        res.json({
                            status: true,
                            response: {"user_id": results.insertId},
                            message: 'user registered sucessfully',

                        })

                    }
                });
            }
        });
    }
}
//to verify user otp to complete registeration


module.exports.verifyOtp = function (req, res) {
    let response = [];
    const status = 1;
    const statusOtp = 0;
    if (req.body.userId == '') {
        res.json({
            status: false,
            response: response,
            message: 'User ID is required.'
        })

    }
    else if(otpPattern.test(req.body.otp) == false){
        res.json({
            status: false,
            response: response,
            message: 'invalid otp pattern .hint:(1232,4533).'
        })


    }
    else {
        let userQuery = "SELECT * from `users` WHERE id = '" + req.body.userId + "' AND verify_otp = '" + statusOtp + "'";
        db.query(userQuery, (err, result) => {
            if (err) {

                res.json({
                    status: false,
                    response: err,
                    message: 'Something Went Wrong.'
                })
            }
            if (result.length == 0) {

                res.json({
                    status: false,
                    response: response,
                    message: 'No User Found or user mobile is already verified.'
                })

            }
            if (result.length > 0) {
                if (result[0].user_otp === req.body.otp) {
                    let Accesstoken = crypto.randomBytes(32).toString('hex');
                    let UpdateOtpStatus = "UPDATE `users` SET verify_otp = '" + status + "',access_token = '"+Accesstoken+"' WHERE id = '" + req.body.userId + "'";
                    db.query(UpdateOtpStatus, (err, result) => {
                        if (err) {

                            res.json({
                                status: false,
                                response: err,
                                message: 'Something Went Wrong.'
                            })
                        } else {
                            res.json({
                                status: true,
                                response: {'userId': req.body.userId, 'access_token':Accesstoken,'verify_otp_status': 1},
                                message: 'User otp process completed successfully.'
                            })


                        }
                    });

                }

                else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'You entered wrong otp.Please check and try again!Or otp verified already!'
                    })


                }


            }


        });


    }


}
// resend otp to user
module.exports.resendOtp=function(req,res){
  let user_id = req.body.userId;
  let response =[];
  let status = 0;
  if(user_id == ''){
      res.json({
          status: false,
          response: response,
          message: 'Please fill user Id first!.'
      })


  }
  else {
      let userQuery = "SELECT * FROM `users` WHERE id ='" + user_id + "' AND verify_otp ='" + status + "'";
      db.query(userQuery, (err, result) => {
          if (result.length > 0) {
              let message = 'Confirm Your one time password to complete registration process.Your OTP is' + result[0].user_otp;

              client.messages
                  .create({
                      body: message,
                      from: '+13518881660',
                      to: '+91' + result[0].user_mobile


                  }, function (error, message) {
                      // The HTTP request to Twilio will run asynchronously. This callback
                      // function will be called when a response is received from Twilio
                      // The "error" variable will contain error information, if any.
                      // If the request was successful, this value will be false
                      if (!error) {
                          // The second argument to the callback will contain the information
                          // sent back by Twilio for the request. In this case, it is the
                          // information about the text messsage you just sent:
                          res.json({
                              status: true,
                              response: {'userId': user_id},
                              message: 'Otp successfully sent to user mobile number '
                          })


                          console.log('Message sent on:');
                      } else {

                          res.json({
                              status: false,
                              response: error,
                              message: 'Something went wrong.'
                          })


                      }

                  });


          } else {

              res.json({
                  status: false,
                  response: response,
                  message: 'Sorry user not found or user otp already verified!.'
              })

          }

      });


  }
}

//to verify users email after successfull registration
exports.verifyEmail = function (req, res) {
    let token = req.params.token;
    let query = "SELECT * FROM `users` WHERE verification_token = '" + token + "'";
    db.query(query, (err, result) => {
        if (result.length > 0) {

            let user_id = result[0].id;
            let user_token = result[0].verification_token;
            if (user_token == token) {
                let VerifyUser = "UPDATE `users` SET `is_verified` = '1' WHERE `id` = '" + user_id + "'";
                db.query(VerifyUser, (err, result) => {
                    if (err) {
                        req.flash('error', 'we are unable to verify you!try again');
                        res.render('verify-email.ejs', {
                            title: 'change your password',
                            token: token,
                        });


                    }
                    req.flash('success', 'your email is verified .');
                    res.render('verify-email.ejs', {
                        title: 'change your password',
                        token: token,
                    });

                });
            }

        } else {

            req.flash('error', 'invalid link');
            res.render('verify-email.ejs', {
                title: 'change your password',
                token: token,
            });

        }


    });


}


// update profile api starts
module.exports.updateProfile = function (req, res) {

    let user_id = req.body.id;
    let status = 1;
    //var pattern = '/^(\+\d{1,3}[- ]?)?\d{10}$/i';
    let response = [];
    if (user_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'user id is required'
        })

    }  else {
        let query = "SELECT * FROM `users` WHERE id = '" + user_id + "' AND verify_otp = '"+status+"' ";
        db.query(query, (err, result) => {
            if (err) {
                res.json({
                    status: false,
                    response: err,
                    message: 'user not found'
                })

            }
            if (result.length > 0) {
                let user_dob = req.body.user_dob;
                let date_format = moment(user_dob).format('YYYY-MM-DD');
                let user_gender = req.body.user_gender;
                let user_mobile = req.body.user_mobile;
                let country_code = req.body.code;
                let user_country = req.body.user_country;
                let user_state = req.body.user_state;
                let user_city = req.body.user_city;
                let uploadedFile = req.files.image;
                let video_name = uploadedFile.name;
                let fullPath = 'http://18.218.65.91:3000/assets/img/user_images/' + video_name;
            if ( user_gender != '' && user_gender != 'male' && user_gender != 'female' && user_gender != 'other' ) {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please Fill the correct user gender to continue!(Hint : male,female,other)'
                    })
                } else if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {

                    uploadedFile.mv(`./public/assets/img/user_images/${video_name}`, (err, success) => {
                        if (err) {
                            res.json({
                                status: false,
                                response: err,
                                message: 'there are some error with query'
                            })

                        }
                        if (success) {
                            console.log('success upload');
                        }


                    });

                    let Updatequery = "UPDATE `users` SET `user_dob` = '" + date_format + "', `user_gender` = '" + user_gender + "', `user_mobile` = '" + user_mobile + "', `user_state` = '" + user_state + "',`user_city` = '" + user_city + "',`user_image` = '" + fullPath + "', `user_country` = '" + user_country + "' WHERE `users`.`id` = '" + user_id + "'";
                    db.query(Updatequery, (err, result) => {
                        if (err) {
                            res.json({
                                status: false,
                                response: err,
                                message: 'error in update profile'
                            })

                        }
                        var message = 'Thanks for updating your profile';
                        const accountSid = 'AC9e4f8538a2ced6e8d280cce1df1c908a';
                        const authToken = '048c7913d9d5e705a1878e1c7708c780';
                        const client = require('twilio')(accountSid, authToken);

                        client.messages
                            .create({
                                body: message,
                                from: '+13518881660',
                                to: country_code + user_mobile


                            }, function (error, message) {
                                // The HTTP request to Twilio will run asynchronously. This callback
                                // function will be called when a response is received from Twilio
                                // The "error" variable will contain error information, if any.
                                // If the request was successful, this value will be false
                                if (!error) {
                                    // The second argument to the callback will contain the information
                                    // sent back by Twilio for the request. In this case, it is the
                                    // information about the text messsage you just sent:
                                    console.log('Success! The SID for this SMS message is:');
                                    //.then(message => console.log(message.sid))


                                    console.log('Message sent on:');

                                    res.json({
                                        status: true,
                                        response: {"user_id": user_id},
                                        message: 'user profile updated successfully'
                                    });

                                } else {
                                    res.json({
                                        status: true,
                                        response: {"user_id": user_id},
                                        message: 'user profile updated successfully but please add right phone no to get sms alert.'
                                    });
                                }
                            });
                    });

                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Invalid File format. Only gif, jpeg and png images are allowed.'
                    })
                }

            } else {
                res.json({
                    status: true,
                    response: response,
                    message: 'user not found or verify otp first to update details.!'
                });
            }


        });
    }
}

//joi validations api

module.exports.joiValidation = function (req, res) {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        access_token: [Joi.string(), Joi.number()],
        birthyear: Joi.number().integer().min(1900).max(2013),
        email: Joi.string().email({minDomainAtoms: 2})
    }).with('username', 'birthyear').without('password', 'access_token');
    Joi.validate({
        username: req.body.username,
        password: req.body.password,
        birthyear: req.body.birthyear
    }, schema, function (err, value) {

        if (err) {

            res.json({
                status: false,
                response: err.message,
                message: 'user not found'
            });

        } else {
            res.json({
                status: false,
                response: value,
                message: 'user not found'
            });
        }


    });


}