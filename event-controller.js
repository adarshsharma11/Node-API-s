const fs = require('fs');
let moment = require('moment-timezone');
//const tz =require('');
//moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
moment.tz.setDefault("Asia/Kolkata");
const Joi = require('joi');
//console.log(moment());
module.exports.AddEvents = function (req, res) {

    var thisFile;


    var imagesName = [];
    var imageName;
    var today = new Date();
    let response = [];

    //let DatePattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i;
    let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    let passPattern = /^.{10}$/i;
    let TimePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i;
    let user_id = req.body.userId;

    let title = req.body.title;
    let description = req.body.description;
    let place = req.body.place;
    let start_date_format = req.body.start_date;
    let start_date = moment(start_date_format).format('YYYY-MM-DD');
    console.log(start_date);
    let end_date_format = req.body.end_date;
    let end_date = moment(end_date_format).format('YYYY-MM-DD');
    console.log(end_date);
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let guest = req.body.guest;
    let location_lat = req.body.location_lat;
    let location_long = req.body.location_long;
    let contact_email = req.body.contact_email;
    let contact_number = req.body.contact_number;
    var date_time = start_date + ' ' + start_time;
    var isafterToday = moment(date_time).isBefore(moment());
    console.log(moment().format());
    console.log(isafterToday);
    //console.log(moment().format());
    var end_date_time = end_date + ' ' + end_time;
    var isafterEndDay = moment(end_date_time).isBefore(moment(date_time));
//console.log(isafterEndDay);
//console.log(uploadedFile);

    if (title == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event title first'
        })

    } else if (user_id == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event user Id first'
        })

    } else if (description == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event description first'
        })

    } else if (place == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event place first'
        })

    } else if (start_date == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event start date first'
        })

    } else if (end_date == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event end date first'
        })

    } else if (isafterToday == true) {
        res.json({
            status: false,
            response: response,
            message: 'sorry!Start date and time must not be in past'
        })

    } else if (isafterEndDay == true) {
        res.json({
            status: false,
            response: response,
            message: 'sorry!End date and time must be greater than start date!'
        })

    }
    /*else if(DatePattern.test(req.body.end_date) == false || DatePattern.test(req.body.start_date ) == false){
        res.json({
            status: false,
            response:response,
            message: 'Please fill correct start and end date format.(hint: dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy)'
        })

    }*/

    else if (start_time == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event start time first'
        })

    } else if (end_time == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event end time first'
        })

    } else if (TimePattern.test(start_time) == false || TimePattern.test(end_time) == false) {

        res.json({
            status: false,
            response: response,
            message: 'Please fill start and end time correct(hint: 00.00-23:59)'
        })


    } else if (guest == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event guest first'
        })

    } else if (location_lat == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event location latitude first'
        })

    } else if (location_long == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event location longitude first'
        })

    } else if (contact_email == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event contact person email first'
        })

    } else if (contact_number == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event contact number first'
        })

    } else if (pattern.test(contact_email) == false) {

        res.json({
            status: false,
            response: response,
            message: 'Enter a valid Email .Please!'
        })


    } else if (passPattern.test(contact_number) == false) {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill the correct mobile Number to continue'
        })


    } else if (!req.files) {
        res.json({
            status: false,
            response: response,
            message: 'Please choose image first'
        });
    } else {
        let user_role = 'O';
        let userQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "' AND user_role = '" + user_role + "'";
        db.query(userQuery, (err, result) => {
            console.log(result);
            if (result.length > 0) {
                var uploadedFile = req.files.image;

                let image_title = title.replace(/\s+/g, '');
                if (uploadedFile instanceof Array) {
                    for (var key = 0; key < uploadedFile.length; key++) {

                        thisFile = uploadedFile[key];
                        console.log(thisFile);
                        console.log(uploadedFile[key].name);
                        let fileExtensions = uploadedFile[key].mimetype.split('/')[1];
                        imagesName.push('http://18.218.65.91:3000/assets/img/' + image_title + key + '.' + fileExtensions);
                        imageName = imagesName.join(',');
                        console.log(imageName);
                        if (thisFile.mimetype === 'image/png' || thisFile.mimetype === 'image/jpeg' || thisFile.mimetype === 'image/gif') {

                            thisFile.mv('./public/assets/img/' + image_title + key + '.' + fileExtensions, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {


                                    console.log('success');

                                }
                            });
                        } else {
                            res.json({
                                status: false,
                                response: response,
                                message: 'Invalid File format. Only gif, jpeg and png images are allowed'
                            })

                        }

                    }
                } else {

                    let fileExtension = uploadedFile.mimetype.split('/')[1];
                    imageName = 'http://18.218.65.91:3000/assets/img/' + image_title + '.' + fileExtension;
                    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                        uploadedFile.mv(`./public/assets/img/${image_title + '.' + fileExtension}`, function (err, success) {

                            if (err) {
                                res.json({
                                    status: false,
                                    response: err,
                                    message: 'Something went wrong'
                                })
                            }

                        });

                    } else {
                        res.json({
                            status: false,
                            response: response,
                            message: 'Invalid File format. Only gif, jpeg and png images are allowed'
                        })
                    }

                    console.log('its a not array');
                }


                var events = {
                    "title": title,
                    "user_id": user_id,
                    "description": description,
                    "place": place,
                    "images": imageName,
                    "start_date": start_date,
                    "start_time": start_time,
                    "end_date": end_date,
                    "end_time": end_time,
                    "guest": guest,
                    "location_lat": location_lat,
                    "location_long": location_long,
                    "contact_email": contact_email,
                    "contact_number": contact_number,
                    "created_at": today,
                    "updated_at": today

                }
                db.query('INSERT INTO events SET ?', events, function (err, results, fields) {
                    if (err) {
                        res.json({
                            status: false,
                            response: err,
                            message: 'there are some error with query'
                        })
                    } else {
                        res.json({
                            status: true,
                            response: {"event_id": results.insertId, "user_id": user_id, "title": title},
                            message: 'event created successfully'
                        })


                    }


                });


            } else {

                res.json({
                    status: false,
                    response: response,
                    message: 'Sorry user does not exist or user role is not organizer (i.e `O`)!please check user Id you Entered'
                })

            }


        });


    }

}

//list all events based on organizer id
module.exports.OrganizerEvents = function (req, res) {
    let organizerId = req.body.organizerId;
    let user_role = 'O';
    let response = [];
    if (organizerId == '') {

        res.json({
            status: false,
            response: response,
            message: 'please fill organizer Id first!'
        })


    } else {
        let query = "SELECT * FROM `users` WHERE id = '" + organizerId + "' AND `user_role` = '" + user_role + "'";
        db.query(query, (err, result) => {
            if (result.length > 0) {
                let organizerEvents = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number FROM `events` WHERE user_id = '" + organizerId + "'";
                db.query(organizerEvents, (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            response: err,
                            message: 'Something went wrong!'
                        });

                    }
                    if (result.length > 0) {
         let array = [];
        for(let i =0; i<result.length; i++){
           let item = result[i];
           if(item.images!=null){
               item['images'] = item.images.split(',');

           }
           else{
               item['images'] = [];

           }


           array.push(item);


        }
                        res.json({
                            status: true,
                            response: array,
                            message: 'All  events of particular organizer are here!'
                        });


                    } else {


                        res.json({
                            status: false,
                            response: response,
                            message: 'No events found with this event id'
                        });
                    }


                });


            } else {

                res.json({
                    status: false,
                    response: response,
                    message: 'Sorry user does not exist or user role is not organizer (i.e `O`)!please check organizer Id you Entered!'
                })


            }


        });


    }


}


// to delete events starts
module.exports.DeleteEvents = function (req, res) {
    var response = [];
    let event_id = req.body.id;

    if (event_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill event Id first to delete event!'
        });

    } else {
        const status = 1;
        let getEventsQuery = 'SELECT * from `events` WHERE id = "' + event_id + '"';
        db.query(getEventsQuery, (err, result) => {
            if (result.length > 0) {

                let deleteEventQuery = 'UPDATE `events` SET `delete_status` = "' + status + '" WHERE id = "' + event_id + '"';
                db.query(deleteEventQuery, (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            response: err,
                            message: 'Something Went Wrong!'
                        });


                    } else {
                        res.json({
                            status: true,
                            response: {"event_id": event_id},
                            message: 'Event Deleted Successfully!'
                        });


                    }


                });


            } else {

                res.json({
                    status: false,
                    response: response,
                    message: 'No event found with this Id!'
                });


            }


        });


    }

}

//to show all events
module.exports.ListEvents = function (req, res) {
    const status = 0;
    let AllFavId = [];
    let user_id = req.body.userId;
    let response = [];
    if (user_id != '') {
        let userQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "'";
        db.query(userQuery, (err, result) => {
            if (result.length > 0) {
                let favEventQuery = "SELECT * FROM  `events_favorite_list` WHERE user_id = '" + user_id + "'";
                db.query(favEventQuery, (err, result) => {
                    if (result.length > 0) {
                        let idUser;
                        let favId;
                        for (let i = 0; i < result.length; i++) {
                            let item = result[i];
                            idUser = item.user_id;
                            favId = item.favorite_event_id;
                            AllFavId.push(favId);

                        }
                        console.log(AllFavId);
                        let query = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event from `events` WHERE `delete_status` = '" + status + "' ORDER BY `id` DESC";
                        db.query(query, (err, result) => {

                            if (err) {
                                res.json({
                                    status: false,
                                    response: err,
                                    message: 'Something Went Wrong!'
                                });
                            } else {
                                let arr = [];
                                let favEventId;
                                for (let i = 0; i < result.length; i++) {
                                    let item = result[i];
                                    if(item.images!=null){

                                        item['images'] = item.images.split(',');
                                    }
                                    else{
                                        item['images'] = [];
                                    }

                                    favEventId = item.event_id;
                                    for (let j = 0; j < AllFavId.length; j++) {
                                        if (favEventId == AllFavId[j]) {

                                            item['is_favouite_event'] = '1';
                                        }

                                    }

                                    arr.push(item);

                                }

                                res.json({
                                    status: true,
                                    response: arr,
                                    message: 'all the events list is here with fav user!'
                                });


                            }


                        });


                    } else {

                        let query = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event from `events` WHERE `delete_status` = '" + status + "' ORDER BY `id` DESC";
                        db.query(query, (err, result) => {
                            if (err) {
                                res.json({
                                    status: false,
                                    response: err,
                                    message: 'Something went Wrong!'
                                });

                            } else {
                                let array = [];
                                for (let i = 0; i < result.length; i++) {
                                    let item = result[i];

                                    if(item.images!=null){

                                        item['images'] = item.images.split(',');
                                    }
                                    else{
                                        item['images'] = [];
                                    }

                                    array.push(item);

                                }
                                res.json({
                                    status: true,
                                    response: array,
                                    message: 'All Events are here!'
                                });

                            }


                        });


                    }


                });
            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'User does not exists!'
                });


            }


        });


    } else {
        let query = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event from `events` WHERE `delete_status` = '" + status + "' ORDER BY `id` DESC";
        db.query(query, (err, result) => {
            if (err) {
                res.json({
                    status: false,
                    response: err,
                    message: 'Something went Wrong!'
                });

            } else {
                let array = [];
                for (let i = 0; i < result.length; i++) {
                    let item = result[i];
                    if(item.images!=null){

                        item['images'] = item.images.split(',');
                    }
                    else{
                        item['images'] = [];
                    }

                    array.push(item);

                }
                res.json({
                    status: true,
                    response: array,
                    message: 'All Events are here!'
                });

            }


        });


    }



}
module.exports.EditEvents = function (req, res) {

    var response = [];
    let event_id = req.body.eventId;
    var imageName;
    var imagesName = [];


    if (evennp, t_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill event Id first to edit event!'
        });

    } else {
        let getEventsQuery = 'SELECT * from `events` WHERE id = "' + event_id + '"';
        db.query(getEventsQuery, (err, result) => {
            if (result.length > 0) {
                let moment = require('moment');
                var thisFile;
                var images = [];
                var today = new Date();
                let response = [];
                let DatePattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i;
                let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                let passPattern = /^.{10}$/i;
                let TimePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i;
                let title = req.body.title;
                let description = req.body.description;
                let place = req.body.place;
                let start_date_format = req.body.start_date;

                let start_date = moment(start_date_format).format('YYYY-MM-DD');
                console.log(start_date);
                let end_date_format = req.body.end_date;
                let end_date = moment(end_date_format).format('YYYY-MM-DD');
                console.log(end_date);
                let start_time = req.body.start_time;
                let end_time = req.body.end_time;
                let guest = req.body.guest;
                let location_lat = req.body.location_lat;
                let location_long = req.body.location_long;
                let contact_email = req.body.contact_email;
                let contact_number = req.body.contact_number;
                var date_time = start_date + ' ' + start_time;
                var isafterToday = moment(date_time).isBefore(moment());
                console.log(isafterToday);
                var end_date_time = end_date + ' ' + end_time;
                var isafterEndDay = moment(end_date_time).isBefore(moment(date_time));
                console.log(isafterEndDay);
//console.log(uploadedFile);

                if (title == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event title first'
                    })

                } else if (description == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event description first'
                    })

                } else if (place == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event place first'
                    })

                } else if (start_date == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event start date first'
                    })

                } else if (end_date == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event end date first'
                    })

                } else if (isafterToday == true) {
                    res.json({
                        status: false,
                        response: response,
                        message: 'sorry!Start date and time must not be in past'
                    })

                } else if (isafterEndDay == true) {
                    res.json({
                        status: false,
                        response: response,
                        message: 'sorry!End date and time must be greater than start date!'
                    })

                } /*else if (DatePattern.test(req.body.end_date) == false || DatePattern.test(req.body.start_date) == false) {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill correct start and end date format.(hint: dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy)'
                    })

                }*/ else if (start_time == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event start time first'
                    })

                } else if (end_time == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event end time first'
                    })

                } else if (TimePattern.test(start_time) == false || TimePattern.test(end_time) == false) {

                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill start and end time correct(hint: 00.00-23:59)'
                    })


                } else if (guest == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event guest first'
                    })

                } else if (location_lat == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event location latitude first'
                    })

                } else if (location_long == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event location longitude first'
                    })

                } else if (contact_email == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event contact person email first'
                    })

                } else if (contact_number == '') {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please fill event contact number first'
                    })

                } else if (pattern.test(contact_email) == false) {

                    res.json({
                        status: false,
                        response: response,
                        message: 'Enter a valid Email .Please!'
                    })


                } else if (passPattern.test(contact_number) == false) {

                    res.json({
                        status: false,
                        response: response,
                        message: 'Please Fill the correct mobile Number to continue'
                    })


                } else if (!req.files) {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Please choose image first'
                    });
                } else {

                    var uploadedFile = req.files.image;
                    if (uploadedFile instanceof Array) {
                        for (var key = 0; key < uploadedFile.length; key++) {

                            thisFile = uploadedFile[key];
                            console.log(thisFile);
                            console.log(uploadedFile[key].name);
                            imagesName.push('http://18.218.65.91:3000/assets/img/' + uploadedFile[key].name);
                            imageName = imagesName.join(',');
                            console.log(imageName);
                            if (thisFile.mimetype === 'image/png' || thisFile.mimetype === 'image/jpeg' || thisFile.mimetype === 'image/gif') {

                                thisFile.mv('./public/assets/img/' + thisFile.name, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {


                                        console.log('success');

                                    }
                                });
                            } else {
                                res.json({
                                    status: false,
                                    response: response,
                                    message: 'Invalid File format. Only gif, jpeg and png images are allowed'
                                })

                            }

                        }
                    } else {
                        imageName = 'http://18.218.65.91:3000/assets/img/' + uploadedFile.name;
                        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                            uploadedFile.mv('./public/assets/img/' + uploadedFile.name, function (err, success) {

                                if (err) {
                                    res.json({
                                        status: false,
                                        response: err,
                                        message: 'Something went wrong'
                                    })
                                }


                            });

                        } else {
                            res.json({
                                status: false,
                                response: response,
                                message: 'Invalid File format. Only gif, jpeg and png images are allowed'
                            })
                        }

                        console.log('its a not array');
                    }


                    let Updatequery = "UPDATE `events` SET `title` = '" + title + "', `description` = '" + description + "', `place` = '" + place + "', `start_date` = '" + start_date + "',`end_date` = '" + end_date + "',`start_time` = '" + start_time + "', `end_time` = '" + end_time + "',`guest` = '" + guest + "',`location_lat` = '" + location_lat + "',`location_long` = '" + location_long + "',`contact_email` = '" + contact_email + "',`contact_number` = '" + contact_number + "',`images` = '" + imageName + "' WHERE `events`.`id` = '" + event_id + "'";
                    db.query(Updatequery, (err, result) => {
                        if (err) {
                            res.json({
                                status: false,
                                response: response,
                                message: 'something went wrong'
                            })


                        }
                        res.json({
                            status: true,
                            response: {"event_id": event_id},
                            message: 'event updated successfully'
                        })


                    });

                }


            } else {

                res.json({
                    status: false,
                    response: response,
                    message: 'No events Found for this event Id'
                })


            }


        });


    }


}

//user events list
module.exports.userEvents = function (req, res) {
    var response = [];
    let user_id = req.body.userId;
    let idUser;
    let favId;
    let favEventId;
    let AllFavId = [];
    if (user_id == '') {

        res.json({
            status: false,
            response: response,
            message: 'Please Fill user Id first to list user events!'
        });

    } else {
        let favEventQuery = "SELECT * FROM  `events_favorite_list` WHERE user_id = '" + user_id + "'";
        db.query(favEventQuery, (err, result) => {
            if (result.length > 0) {

                for (let i = 0; i < result.length; i++) {
                    let item = result[i];
                    idUser = item.user_id;
                    favId = item.favorite_event_id;
                    AllFavId.push(favId);

                }
                let userQuery = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` WHERE user_id = '" + user_id + "' ORDER BY `id` DESC";
                db.query(userQuery, (err, result) => {
                    if (result.length > 0) {
                        let arr = [];
                        for (let i = 0; i < result.length; i++) {
                            let item = result[i];
                            if(item.images!=null){

                                item['images'] = item.images.split(',');
                            }
                            else{
                                item['images'] = [];
                            }
                            favEventId = item.event_id;
                            for (j = 0; j < AllFavId.length; j++) {
                                if (favEventId == AllFavId[j]) {

                                    item['is_favouite_event'] = '1';
                                }

                            }
                            arr.push(item);

                        }
                        res.json({
                            status: true,
                            response: arr,
                            message: 'All events of user is all here!'
                        });


                    } else {

                        res.json({
                            status: false,
                            response: response,
                            message: 'No events Found for this user Id'
                        })

                    }

                });

            } else {
                let userQuery = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` WHERE user_id = '" + user_id + "' ORDER BY `id` DESC";
                db.query(userQuery, (err, result) => {
                    if (result.length > 0) {
                        let arr = [];
                        for (let i = 0; i < result.length; i++) {
                            let item = result[i];
                            if(item.images!=null){

                                item['images'] = item.images.split(',');
                            }
                            else{
                                item['images'] = [];
                            }

                            arr.push(item);

                        }
                        res.json({
                            status: true,
                            response: arr,
                            message: 'All events of user is all here!'
                        });


                    } else {

                        res.json({
                            status: false,
                            response: response,
                            message: 'No events Found for this user Id'
                        })

                    }

                });


            }


        });

    }

}

//Filter Events Api
module.exports.filterEvents = function (req, res) {

    let response = [];
    let user_id = req.body.userId;
    let distance_in_km = req.body.distance;
    if (distance_in_km == '') {
        distance_in_km = 2500;
    }
    let TimePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i;
    var location_lat;
    var location_long;
    let start_date = moment(req.body.start_date).format('YYYY-MM-DD');
    let start_time = req.body.start_time;
    var date_time = start_date + ' ' + start_time;
    var isafterToday = moment(date_time).isBefore(moment());
    let end_date = moment(req.body.end_date).format('YYYY-MM-DD');
    let end_time = req.body.end_time;
    let end_date_time = end_date + ' ' + end_time;
    console.log(end_date_time);
    let place = req.body.place;
    let IsbeforToday = moment(end_date_time).isBefore(moment());
    console.log(isafterToday);
    console.log(IsbeforToday);
    let idUser;
    let favId;
    let favEventId;
    let AllFavId = [];
    let status = 0;
    let current_time = moment().format('YYYY-MM-DD HH:MM');
    //console.log(current_time);

    let favEventQuery = "SELECT * FROM  `events_favorite_list` WHERE user_id = '" + user_id + "'";
    db.query(favEventQuery, (err, result) => {
        if (err) {
            res.json({
                status: false,
                response: err,
                message: 'Something went Wrong!'
            })
        }
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                let item = result[i];
                idUser = item.user_id;
                favId = item.favorite_event_id;
                AllFavId.push(favId);

            }
        } else {

            AllFavId = [];

        }


    });
/*

    if (TimePattern.test(req.body.start_time) == false && req.body.start_date != '') {
        res.json({
            status: false,
            response: response,
            message: 'please fill start time first and check time format right  (hint:- HH:MM)'
        })

    } else if (TimePattern.test(req.body.end_time) == false && req.body.end_date != '') {

        res.json({
            status: false,
            response: response,
            message: 'please fill end time first and check time format right  (hint:- HH:MM)!'
        })


    } else if (req.body.start_time != '' && req.body.start_date == '') {

        res.json({
            status: false,
            response: response,
            message: 'please fill start date and time first!'
        })


    } else if (req.body.end_time != '' && req.body.end_date == 'Invalid date') {

        res.json({
            status: false,
            response: response,
            message: 'please fill end date date and time first!'
        })


    } else if (isafterToday == true || IsbeforToday == true) {
        res.json({
            status: false,
            response: response,
            message: 'sorry!Start date or end date and time must not be in past'
        })

    } else {*/
        location_lat = req.body.locationLat;
        location_long = req.body.locationLong;
        if (location_lat == '' || location_long == '') {

            location_lat = '30.7333';
            location_long = '76.7794';

        }

      /*  if (place != '' && start_date != 'Invalid date' && start_time != '') {
            console.log('i am here at right place ');
            let query = "SELECT id as event_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` WHERE place LIKE '" + place + "' AND  cast(concat(start_date, ' ', start_time) as datetime) >= '" + date_time + "'ORDER BY `id` DESC";
            db.query(query, (err, result) => {

                if (err) {
                    res.json({
                        status: false,
                        response: err,
                        message: 'something went wrong!'
                    })


                }
                if (result.length > 0) {
                    let arr = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        item['images'] = item.images.split(',');
                        favEventId = item.event_id;
                        for (j = 0; j < AllFavId.length; j++) {
                            if (favEventId == AllFavId[j]) {

                                item['is_favouite_event'] = '1';
                            }

                        }

                        arr.push(item);

                    }
                    res.json({
                        status: true,
                        response: arr,
                        message: 'Filtered event is here'
                    })


                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Sorry!No nearby events found for this time and location'
                    })


                }


            });
        } else if (place != '' || start_date != 'Invalid date') {

            console.log('i am here bbb');

            let query = "SELECT id as event_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` WHERE(place IS NULL OR place LIKE '" + place + "') OR (start_date Is NULL OR cast(concat(start_date, ' ', start_time) as datetime) >= '" + date_time + "')  ORDER BY `id` DESC";
            db.query(query, (err, result) => {

                if (err) {
                    res.json({
                        status: false,
                        response: err,
                        message: 'something went wrong!'
                    })


                }
                if (result.length > 0) {
                    let arr = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        item['images'] = item.images.split(',');
                        favEventId = item.event_id;
                        for (j = 0; j < AllFavId.length; j++) {
                            if (favEventId == AllFavId[j]) {

                                item['is_favouite_event'] = '1';
                            }

                        }

                        arr.push(item);

                    }
                    res.json({
                        status: true,
                        response: arr,
                        message: 'Filtered event is here'
                    })


                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Sorry!No nearby events found for this time and location'
                    })


                }


            });
        } else if (start_date != 'Invalid date' && end_date != 'Invalid date') {

            let query1 = "SELECT id as event_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` WHERE cast(concat(start_date, ' ', start_time)as datetime) >= '" + date_time + "' AND cast(concat(end_date, ' ', end_time) as datetime) <= '" + end_date_time + "' ORDER BY `id` DESC";
            db.query(query1, (err, result) => {

                if (err) {
                    res.json({
                        status: false,
                        response: err,
                        message: 'something went wrong!'
                    })


                }
                if (result.length > 0) {
                    let arr = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        item['images'] = item.images.split(',');
                        favEventId = item.event_id;
                        for (j = 0; j < AllFavId.length; j++) {
                            if (favEventId == AllFavId[j]) {

                                item['is_favouite_event'] = '1';
                            }

                        }

                        arr.push(item);

                    }
                    res.json({
                        status: true,
                        response: arr,
                        message: 'Filtered event is here'
                    })


                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Sorry!No nearby events found for this time and location'
                    })


                }


            });


        }*/

      if (place != '') {
          let query = "SELECT id as event_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` WHERE place LIKE '" + place + "'ORDER BY `id` DESC";
          db.query(query, (err, result) => {

              if (err) {
                  res.json({
                      status: false,
                      response: err,
                      message: 'something went wrong!'
                  })


              }
              if (result.length > 0) {
                  let arr = [];
                  for (let i = 0; i < result.length; i++) {
                      let item = result[i];
                      item['images'] = item.images.split(',');
                      favEventId = item.event_id;
                      for (j = 0; j < AllFavId.length; j++) {
                          if (favEventId == AllFavId[j]) {

                              item['is_favouite_event'] = '1';
                          }

                      }

                      arr.push(item);

                  }
                  res.json({
                      status: true,
                      response: arr,
                      message: 'Filtered event are here for this place!'
                  })


              } else {
                  res.json({
                      status: false,
                      response: response,
                      message: 'Sorry!No nearby events found for this place!'
                  })


              }


          });
      }

    else if (req.body.locationLat != '' && req.body.locationLong != '') {

          let filterEventsQuery = "SELECT id as event_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event, (6371 * acos( cos( radians(" + req.body.locationLat + ") ) * cos( radians(location_lat) ) * cos( radians(location_long) - radians(" + req.body.locationLong + ")) + sin(radians(" + req.body.locationLat + ")) * sin(radians(location_lat)) )) as `distance` FROM `events` HAVING `distance` < '" + distance_in_km + "'  ORDER BY `id` DESC";
          db.query(filterEventsQuery, (err, result) => {

              if (err) {
                  res.json({
                      status: false,
                      response: err,
                      message: 'something went wrong!'
                  })


              }
              if (result.length > 0) {
                  let arr = [];
                  for (let i = 0; i < result.length; i++) {
                      let items = result[i];
                      if(items.images!=null){
                          items['images'] = items.images.split(',');

                      }else{
                          items['images'] = [];
                      }
                      favEventId = items.event_id;
                      for (let j = 0; j < AllFavId.length; j++) {
                          if (favEventId == AllFavId[j]) {

                              items['is_favouite_event'] = '1';
                          }

                      }

                      arr.push(items);

                  }
                  /*    result.forEach(function (item) {
                                // console.log(item.images);
                                 let images_arr = item.images.split(',');
                                 arr.push(images_arr);

                                 })*/
                    console.log(arr);
                    // var array3 = result.concat(arr);
                    res.json({
                        status: true,
                        response: arr,
                        message: 'Filtered event is here'
                    })


                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Sorry!No nearby events found for this time and location'
                    })


                }


            });


        } else {

            let filterEventsQuery1 = "SELECT id as event_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event, (6371 * acos( cos( radians(" + location_lat + ") ) * cos( radians(location_lat) ) * cos( radians(location_long) - radians(" + location_long + ")) + sin(radians(" + location_lat + ")) * sin(radians(location_lat)) )) as `distance` FROM `events` HAVING `distance` < '" + distance_in_km + "' ORDER BY `id` DESC";
            db.query(filterEventsQuery1, (err, result) => {

                if (err) {
                    res.json({
                        status: false,
                        response: err,
                        message: 'something went wrong!'
                    })


                }
                if (result.length > 0) {

                    let arr = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        console.log();
                        if(item.images!=null){
                            item['images'] = item.images.split(',');

                        }else{
                            item['images'] = [];
                        }
                        favEventId = item.id;
                        for (let j = 0; j < AllFavId.length; j++) {
                            if (favEventId == AllFavId[j]) {

                                item['is_favouite_event'] = '1';
                            }

                        }

                        arr.push(item);

                    }
                    res.json({
                        status: true,
                        response: arr,
                        message: 'Filtered event is here'
                    })


                } else {
                    res.json({
                        status: false,
                        response: response,
                        message: 'Sorry!No nearby events found for this time and location'
                    })


                }


            });
        }


}

//add to favorite list events

module.exports.addToFavorite = function (req, res) {
    let response = [];
    let user_id = req.body.userId;
    let event_id = req.body.eventId;
    if (user_id == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill user Id first'
        })

    }
    if (event_id == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event Id first'
        })

    } else {
        let fav_record = {
            "favorite_event_id": event_id,
            "user_id": user_id
        }
        let checkUser = "SELECT * FROM `users` WHERE id = '" + user_id + "'";
        db.query(checkUser, (err, result) => {
            if (result.length > 0) {
                let checkEvent = "SELECT * FROM `events` WHERE id='" + event_id + "'";
                db.query(checkEvent, (err, results) => {
                    if (results.length > 0) {
                        let CheckQuery = "SELECT * FROM `events_favorite_list` WHERE favorite_event_id = '" + event_id + "' AND user_id = '" + user_id + "'";
                        db.query(CheckQuery, (err, result) => {

                            if (result.length > 0) {
                                res.json({
                                    status: false,
                                    response: response,
                                    message: 'Sorry!this event already exists in favorite list!'
                                })

                            } else {
                                db.query('INSERT INTO events_favorite_list SET ?', fav_record, function (err, results, fields) {
                                    if (err) {
                                        res.json({
                                            status: false,
                                            response: err,
                                            message: 'Opps!Something went wrong!'
                                        })


                                    } else {
                                        res.json({
                                            status: true,
                                            response: {"user_id": user_id, "event_id": event_id},
                                            message: 'OK!Event added to favorite list!'
                                        })


                                    }

                                });


                            }


                        })


                    } else {

                        res.json({
                            status: false,
                            response: response,
                            message: 'Sorry!this event Id does not exists!'
                        })


                    }


                });

            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'Sorry!this user Id does not exists!'
                })

            }


        });


    }


}

//remove events from favorite
module.exports.removeToFavorite = function (req, res) {
    let response = [];
    let user_id = req.body.userId;
    let event_id = req.body.eventId;
    if (user_id == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill user Id first'
        })

    }
    if (event_id == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event Id first'
        })

    } else {
        let checkFavoriteExists = "SELECT * FROM `events_favorite_list` WHERE user_id ='" + user_id + "' AND favorite_event_id='" + event_id + "'";
        db.query(checkFavoriteExists, (err, result) => {
            console.log(result);
            if (result.length > 0) {
                let deleteFavorite = "DELETE FROM `events_favorite_list` WHERE user_id = '" + user_id + "' AND favorite_event_id = '" + event_id + "' ";
                db.query(deleteFavorite, (err, result) => {
                    if (err) {
                        res.json({
                            status: false,
                            response: err,
                            message: 'Something went wrong!'
                        })

                    } else {

                        res.json({
                            status: true,
                            response: {"event_id": event_id, "user_id": user_id},
                            message: 'ok!Event deleted successfully!'
                        })

                    }


                });

            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'Sorry!unable to delete.Not exists in user favorite events'
                })


            }

        });


    }


}

module.exports.particularEvent = function (req, res) {
    const status = 0;
    let AllFavId = [];
    let response = [];
    let user_id = req.body.userId;
    let event_id = req.body.eventId;
    if (event_id == '') {
        res.json({
            status: false,
            response: response,
            message: 'Please fill event id first !'
        });

    }

    if (user_id != '') {
        let userQuery = "SELECT * FROM `users` WHERE id = '" + user_id + "'";
        db.query(userQuery, (err, result) => {
            if (result.length > 0) {
                let favEventQuery = "SELECT * FROM  `events_favorite_list` WHERE user_id = '" + user_id + "' AND favorite_event_id = '" + event_id + "'";
                db.query(favEventQuery, (err, result) => {
                    if (result.length > 0) {
                        /* let idUser;
                         let favId;
                         for (let i=0; i<result.length; i++) {
                             let item = result[i];
                             idUser = item.user_id;
                             favId = item.favorite_event_id;
                             AllFavId.push(favId);

                         }
                         console.log(AllFavId);*/
                        let query = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event from `events` WHERE id = '" + event_id + "' AND `delete_status` = '" + status + "' ORDER BY `id` DESC";
                        db.query(query, (err, result) => {

                            if (err) {
                                res.json({
                                    status: false,
                                    response: err,
                                    message: 'Something Went Wrong!'
                                });
                            } else {
                                let arr = [];
                                let favEventId;
                                let item = result[0];
                                if(item.images!=null){

                                    item['images'] = item.images.split(',');
                                }
                                else{
                                    item['images'] = [];
                                }
                                favEventId = item.event_id;
                                item['is_favouite_event'] = '1';
                                arr.push(item);
                                res.json({
                                    status: true,
                                    response: arr,
                                    message: 'Particular event is here with fav user!'
                                });

                            }

                        });

                    } else {

                        let query = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event from `events` WHERE id = '" + event_id + "' AND `delete_status` = '" + status + "' ORDER BY `id` DESC";
                        db.query(query, (err, result) => {
                            if (err) {
                                res.json({
                                    status: false,
                                    response: err,
                                    message: 'Something went Wrong!'
                                });

                            } else {
                                let array = [];

                                let item = result[0];
                                if(item.images!=null){

                                    item['images'] = item.images.split(',');
                                }
                                else{
                                    item['images'] = [];
                                }

                                array.push(item);
                                res.json({
                                    status: true,
                                    response: array,
                                    message: 'All Events are here!'
                                });

                            }


                        });


                    }


                });
            } else {
                res.json({
                    status: false,
                    response: response,
                    message: 'User does not exists!'
                });


            }


        });


    } else {
        let query = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event from `events` WHERE id='" + event_id + "' AND `delete_status` = '" + status + "' ORDER BY `id` DESC";
        db.query(query, (err, result) => {
            if (err) {
                res.json({
                    status: false,
                    response: err,
                    message: 'Something went Wrong!'
                });

            } else {
                let array = [];
                let item = result[0];
                if(item.images!=null){

                    item['images'] = item.images.split(',');
                }
                else{
                    item['images'] = [];
                }

                array.push(item);


                res.json({
                    status: true,
                    response: array,
                    message: 'All Events are here!'
                });

            }


        });


    }


}
//fetch user's favorite events
module.exports.userFavoriteEvents=function(req,res){
    let user_id = req.body.userId;
    let response = [];
    const schema = Joi.object().keys({
        'userId': Joi.number().required().error(new Error('Please fill the user id first and it must be a number')),
    });
    Joi.validate({
        userId:req.body.userId,
    }, schema, function (err, value) {

        if (err) {

            res.json({
                status: false,
                response: response,
                message: err.message
            });

        } else {
            let arrayList = [];
            let CheckUser = "SELECT * FROM `users` WHERE id = '"+user_id+"'";
            db.query(CheckUser,(err,result)=>{
               if(result.length > 0){
          let FavEvents = "SELECT * FROM `events_favorite_list` WHERE user_id = '" + user_id + "'";
          db.query(FavEvents,(err,result)=>{
              if(result.length > 0){

               for(let i =0; i<result.length; i++){
                 let item = result[i];
                 let eventId = item.favorite_event_id;
                /* let EventsList = "SELECT * FROM `events` WHERE id = '"+eventId+"'";
                 db.query(EventsList,(err,result)=>{
                     console.log(result);
                     if(result.length > 0){
                       for(let j=0; j < result.length; j++){
                           let Items = result[j];
                           if(Items.images!=null){

                               Items['images'] = Items.images.split(',');
                           }
                           else{
                               Items['images'] = [];
                           }
                           Items['is_favouite_event'] = 1;

                           arrayList.push(Items);
                       }
                         res.json({
                             status: true,
                             response: arrayList,
                             message: 'user has favourite event.'
                         });

                     }


                 });*/

               arrayList.push(eventId);

               }
               console.log(arrayList);
               let eventIds = arrayList.toString();
               console.log(eventIds);
               let AllFavEvents = "SELECT id AS event_id,user_id,title,description,images,place,start_date,start_time,end_date,end_time,guest,location_lat,location_long,contact_email,contact_number,is_favouite_event FROM `events` where id in ("+eventIds+")";
               console.log(AllFavEvents);
               db.query(AllFavEvents,(err,result)=>{
                   console.log(result);
if(err){
    res.json({
        status: true,
        response: err,
        message: 'something went wrong!.'
    });

}else{
    let arrayResult = [];
    for(let k=0;k<result.length;k++){
        let Items = result[k];
        if(Items.images!=null){

            Items['images'] = Items.images.split(',');
        }
        else{
            Items['images'] = [];
        }
        Items['is_favouite_event'] = 1;

        arrayResult.push(Items);


    }
    res.json({
        status: true,
        response: arrayResult,
        message: 'user has favourite event.'
    });

}


               });



              }
              else{

                  res.json({
                      status: false,
                      response: response,
                      message: 'user has no favourite event.'
                  });
              }




          });


               }
               else {

                   res.json({
                       status: false,
                       response: response,
                       message: 'user not found with this Id.'
                   });


               }


            });

        }


    });



}