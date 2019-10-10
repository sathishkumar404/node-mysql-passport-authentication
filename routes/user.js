var express =  require('express');
var router =  express.Router();
var db   = require('../config/db.js');
var path  = require('path');


router.post('/user/list',(req,res)=>{
	  var query =' SELECT * FROM `user` ';
	     db.query(query, function (err, response) {
      if (err) {
        console.log(err.message);
        res.send({ status: 0, msg: "Failed", data: [] });
      } 
       else if (response.length == 0) { 
       	res.send({status:0,msg:'No Records Found'})
       }
         else {
        res.send({ status: 1, msg: "Failed", data: response });

          }

        });

}) 



router.get('/user/delete/:id',(req,res)=>{ 
	var id  = req.params.id;
	var query = 'DELETE FROM `user` WHERE `user`.`id` = '+id; 
	db.query(query,function(err,response){
		if(err){

        res.send({ status: 0, msg: "Failed", data: [] });
    }else{
    	 res.send({ status: 1, msg: "Success" });
    }
	})
}) 


router.post('/user/edit/:id',(req,res)=>{
	res.send('works fine')
})



module.exports =  router;