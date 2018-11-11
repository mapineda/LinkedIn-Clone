var db = require('./../config/mysql');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function handle_request(msg, callback) {
    console.log("Inside kafka sign up Recruiter backend");
    console.log("In handle request:" + JSON.stringify(msg));

    var email = msg.email;
    var password = msg.password;
    var first_name = msg.first_name;
    var last_name = msg.last_name;

    db.selectQuery('SELECT email FROM recruiter_profile WHERE email= ?', [email], function (err, result) {
        // console.log("Result:", result)
        if(err) {
            console.log("Something went wrong during Recruiter signup!")
        }
        else if (result && result.length == 0) {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    var post = {
                        email: msg.email,
                        password: hash,
                        first_name: first_name,
                        last_name: last_name
                    }
                    db.insertQuery('INSERT INTO recruiter_profile SET ?', post, function (e, result) {
                        if (e) {
                            console.log("Recruiter Signup Error = ", e)
                        }
                        else {
                            var _id = result.insertId;
                            var data = { success: true, id : _id, email:email }
                            console.log("final_token = ", data)
                            callback(null,data);
                        }
                    });
                }
            })
        }
        else {
            callback(null,{success: false});
        }
    });
}

module.exports = {
    handle_request: handle_request
}