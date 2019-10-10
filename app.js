const express =  require('express');
const bodyParser = require('body-parser');
const mysql =  require('mysql');
const multer =  require('multer');
var app =  express();
var http = require("http").Server(app);
var session = require('express-session');
var passport  = require('passport'); 



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())    
app.use(express.static('public'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))  

app.use(passport.initialize()); 
require('./config/passport')(passport)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 
 

 var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});



var router =  express.Router();   


//project route
 var version = "/api/v1"; 
 app.use(version,require('./routes/login'));
 app.use(version,require('./routes/user')); 



//end  



//test Route
app.get('/',(req,res)=>{
	res.json({status:1})
}) 


 app.use(function(req, res){
  res.status(404).send({msg:'Requested Resource Not Found',status:404});
}); 



http.listen('5000','0.0.0.0',function(){
	 console.log(
    "Express server listening on port");
})

