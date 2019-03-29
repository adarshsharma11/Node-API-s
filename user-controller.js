const moment = require('moment');
module.exports.showUser = function (req, res) {

    let user_id = req.body.id;
    let otpStatus = 1;
    let response = [];
    if (user_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'user id is required'
        })

    } else {
        let query = "SELECT * FROM `users` WHERE id = '" + user_id + "' AND verify_otp = '" + otpStatus + "' ";
        db.query(query, (err, result) => {
            if (err) {
                res.json({
                    status: false,
                    response: err,
                    message: 'Something went wrong!'
                })

            }
            if (result.length > 0) {

                var localTime = moment(result[0].user_dob).format('YYYY-MM-DD');
                if (localTime == 'Invalid date') {

                    localTime = 'null';
                }

                res.json({
                    status: true,
                    response: {
                        "user_id": user_id,
                        "username": result[0].username,
                        "user_dob": localTime,
                        "email": result[0].email,
                        "user_image": result[0].user_image,
                        "user_city": result[0].user_city,
                        "user_state": result[0].user_state,
                        "user_country": result[0].user_country,
                        "user_mobile": result[0].user_mobile,
                        "user_gender": result[0].user_gender,
                        "user_login_type": result[0].user_login_type,
                        "user_video": result[0].user_video,
                        "user_document": result[0].user_doc,
                        "user_email_verification": result[0].is_verified
                    },
                    message: 'user details found'
                })


            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'user not found or not varified through otp.'
                })


            }

        });


    }


}
//to upload video file
module.exports.uploadVideo = function (req, res) {


    let user_id = req.body.id;
    var response = [];
    if (user_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill user Id first!'
        });

    } else if (!req.files) {
        res.json({
            status: false,
            response: response,
            message: 'Please choose audio/video first'
        })
    } else {
        let uploadedFile = req.files.video;
        let video_name = uploadedFile.name;
        let location = 'http://18.218.65.91:3000/assets/video/' + video_name;
        let userQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "'";

        db.query(userQuery, (err, result) => {
            if (result.length > 0) {
                if (uploadedFile.mimetype === 'audio/webm' || uploadedFile.mimetype === 'video/webm' || uploadedFile.mimetype === 'audio/mpeg' || uploadedFile.mimetype === 'video/mp4') {
                    uploadedFile.mv(`./public/assets/video/${video_name}`, (err, success) => {
                        if (err) {
                            res.json({
                                status: false,
                                error: err,
                                message: 'there are some error with query'
                            });
                        }
                        let query = "UPDATE `users` SET `user_video` = '" + location + "'WHERE `users`.`id` = '" + user_id + "' ";
                        db.query(query, (err, result) => {
                            if (err) {

                                res.json({
                                    status: false,
                                    response: response,
                                    message: 'some errors with query'
                                })

                            }

                            res.json({
                                status: true,
                                error: success,
                                message: 'user video/audio uploaded successfully'
                            });

                        });
                    });
                } else {

                    res.json({
                        status: false,
                        response: response,
                        message: 'Invalid File format. Only audio and video files are allowed.'
                    })


                }

            } else {

                res.json({
                    status: false,
                    response: response,
                    message: 'Sorry!user does not exists.'
                })


            }


        });
        //let fileExtension = video.mimetype.split('/')[1];

    }
}
//to upload pdf/doc/docx/txt files
module.exports.uploadFile = function (req, res) {


    let user_id = req.body.id;
    var response = [];
    if (user_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill user Id first!'
        });

    } else if (!req.files) {
        res.json({
            status: false,
            response: response,
            message: 'Please choose pdf/doc first'
        })
    } else {
        let uploadedFile = req.files.pdf_doc;
        let video_name = uploadedFile.name;
        let location = 'http://18.218.65.91:3000/assets/pdf_doc/' + video_name;
        let userQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "'";

        db.query(userQuery, (err, result) => {

            if (result.length > 0) {

                if (uploadedFile.mimetype === 'application/pdf' || uploadedFile.mimetype === 'application/msword' || uploadedFile.mimetype === 'application/xml' || uploadedFile.mimetype === 'text/plain' || uploadedFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    uploadedFile.mv(`./public/assets/pdf_doc/${video_name}`, (err, success) => {
                        if (err) {
                            res.json({
                                status: false,
                                error: err,
                                message: 'there are some error with query'
                            });
                        }
                        let query = "UPDATE `users` SET `user_doc` = '" + location + "'WHERE `users`.`id` = '" + user_id + "' ";
                        db.query(query, (err, result) => {
                            if (err) {

                                res.json({
                                    status: false,
                                    response: response,
                                    message: 'some errors with query'
                                })

                            }

                            res.json({
                                status: true,
                                error: success,
                                message: 'user pdf/doc uploaded successfully'
                            });
                        });
                    });
                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Invalid File format. Only pdf,xml and doc files are allowed.'
                    })

                }


            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'Sorry!user does not exists.'
                })


            }

        });


        //let fileExtension = video.mimetype.split('/')[1];

    }
}
//to save user info coming from mobile end

module.exports.UserInfo = function (req, res) {
    let response = [];
    var today = new Date();
    let user_id = req.body.id;
    let user_lat = req.body.user_lat;
    let user_long = req.body.user_long;
    let device_token = req.body.device_token;
    let current_location = req.body.current_location;
    var users_info = {
        "user_id": user_id,
        "user_current_location": current_location,
        "user_device_token": device_token,
        "user_lat": user_lat,
        "user_long": user_long,
        "created_at": today,
        "updated_at": today
    }

    if (user_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill user Id first!'
        });


    } else if (device_token == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please Fill device token first!'
        });
    } else if (current_location == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please Fill user current location first!'
        });

    } else if (user_lat == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please Fill user lattitude value first!'
        });

    } else if (user_long == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please Fill user longitude value first!'
        });

    } else {
        let userQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "'";
        db.query(userQuery, (err, result) => {
            if (result.length > 0) {
                let checkUser = "SELECT * FROM `user_info` WHERE user_id = '" + user_id + "'";
                db.query(checkUser, (err, results) => {
                    if (results.length > 0) {

                        res.json({
                            status: false,
                            response: response,
                            message: 'user information already exists!'
                        })


                    } else {
                        db.query('INSERT INTO user_info SET ?', users_info, function (error, results, fields) {
                            if (error) {

                                res.json({
                                    status: false,
                                    response: error,
                                    message: 'there are some error with query'
                                })

                            } else {


                                res.json({
                                    status: true,
                                    response: {'user_id': user_id},
                                    message: 'user information added successfully'
                                })
                            }
                        });


                    }


                });


            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'sorry!user does not exist!Please check user id provided!'
                });
            }

        });

    }

}
//for sending push notifications
module.exports.PushNotifications = function (req, res) {

    var request = require("request");
    var response = [];
    var data = req.body.data;
    var detail = req.body.detail;
    var to = req.body.to;

    if (data == '') {

        res.json({
            status: false,
            response: response,
            message: 'please fill data for notify first!'
        });

    } else if (detail == '') {

        res.json({
            status: false,
            response: response,
            message: 'please fill detail for notify first!'
        });

    } else if (to == '') {


        res.json({
            status: false,
            response: response,
            message: 'please fill receiver device token for notify first!'
        });
    } else {
        var options = {
            method: 'POST',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers:
                {
                    'cache-control': 'no-cache',
                    'Authorization': 'key=AAAA4mWRmSg:APA91bExED9IU2e0g9Cel3Vxd_BFt73IPnTi9Gb-h96JKBla3s64akHm7fGMjOKWrZRKOX5PxbRV93-DMQUEPwoGKeTsixyI-45vOqjkJPErto8iZnRxzCIbrFwP7yYzTI05FpzIpHv4',
                    'Content-Type': 'application/json',
                },
            formData:
                {
                    'data': data,
                    'detail': detail,
                    'to': to,
                    'priority': 'high',
                }
        };

        request(options, function (error, response, body) {
            if (error) {
                res.json({
                    status: false,
                    response: error,
                    message: 'there is error in sending notifications!'
                });

            } else {
                res.json({
                    status: true,
                    response: {"notifications_id": body},
                    message: 'notifications sent successfully'
                });


                console.log(body);
            }


        });


    }


}
