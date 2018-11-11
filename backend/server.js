/** require dependencies */
const express = require("express");
//const routes = require('./routes')
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
let signupRecruiter = require('./routes/signupRecruiter');
let signupApplicant = require('./routes/signupApplicant');
let signinRecruiter = require('./routes/signinRecruiter');
let uploadCompanyLogo = require('./routes/uploadCompanyLogo');
let postJob = require('./routes/postJob');
let expressValidator = require("express-validator");
var morgan = require('morgan');
let cors = require('cors');
const config = require('./config');
const app = express()
app.use(cookieParser());
var passport = require('passport');
app.use(passport.initialize());
const multer = require('multer');

let port = 5000 || process.env.PORT


/** set up middlewares */

app.use(cors({ origin: `http://${config.frontend_host}`, credentials: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${config.frontend_host}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(expressValidator());
app.use(morgan('dev'));

// define routes
app.use("/signup_recruiter/", signupRecruiter);
app.use("/signup_applicant/", signupApplicant);
app.use("/signin_recruiter/", signinRecruiter);
app.use("/upload_company_logo/", uploadCompanyLogo);
app.use("/post_job", postJob);

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});