
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const db =  require('./db')

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'false';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(req,jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let id  =jwt_payload.id;
  //check database user  
  var query ='SELECT * FROM `user` WHERE `id` = '+id;
   db.query(query,function(err,user){
      if (user) { 
        console.log('true')
    next(null, user);
  } else { console.log('false') 
  req.authError ='Invalid Request';
    next(null, false);
  }
   })
 
});
// use the strategy 
module.exports  =passport=>{
  passport.use(strategy);
}  

