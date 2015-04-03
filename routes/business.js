/*
* @dev Kasun Peiris
* @des defining all the routes and functionalities for the business application
* @ver 1.0
*/


// listing dependencies
var express= require('express'),
	router=express.Router(),//espress routes 
	mongoose= require('mongoose'),// db model dependencies
	Bussiness=require('../models/business-db'),//this is the table requireing from the given dir ;
	formidable= require('formidable'),//requiring the formidabel pacakge 
	util=require('util'),//requireing util package
	fs=require('fs-extra'),//file system
    basicAuth = require('basic-auth-connect'),//basic authentication
	expressValidator = require('express-validator');//experess validator

//user authentication using basic Authentication 
var userAuth= basicAuth(function(user,pass,fn){
		//setting the variable to hold user and pass
	var result= (user==='admin' && pass ==='admin');
		if(result){
			fn(null,user);
		}else{
			fn(null);
		}
});//end of the basic authentication


//get the request from user for adding a business
router.get('/add-business',function(req,res,next){
	//rendering the add-business jade template
	res.render('add-business');
})

//get the post request for adding a business to the database	
router.post('/add-business',function(req,res,next){
	
	//validate the url and the methord
	 if (req.url == '/add-business' && req.method.toLowerCase() == 'post') {
    	 
    	var form = new formidable.IncomingForm(),// parse a file upload 
	    	businessid;//hold the business id
			//vaiables to hold the values that pass through the form
		var BusinessAdd;

		//form parse to get the values and show in the site 	
		 form.parse(req, function(err, fields, files) {

		var	businessName =fields.business_name,
			businessAddress=fields.business_address,
			businessPhoneNumber=fields.business_phone,
			businessEmail=fields.business_email,
			businessOwner=fields.business_owner,
			businessDescription=fields.business_description,
			businessWebsite=fields.business_web,
			businessSocialFB=fields.business_fb,
			businessSocialLI=fields.business_li,
			image_url;
			//setting the image url variable based on user input
			if(files.business_logo.name == ''){
				image_url='http://placehold.it/300x100';
			}
			else {
				image_url='/images/'+files.business_logo.name;
			}
			//checking for facebook url 
			if(fields.business_fb =='http://'){
				businessSocialFB='https://www.facebook.com/';
			}else {
				businessSocialFB=fields.business_fb;
			}
			 //check for linked in url
			if(fields.business_li =='http://'){
				businessSocialLI='https://www.linkedin.com/';
			}else {
				businessSocialLI=fields.business_li;
			}
			 
			if(fields.business_web =='http://'){
				businessWebsite='/';
			}else {
				businessWebsite=fields.business_web;
			}
			 
			//prepairing the object and setting in to the global variable
			BusinessAdd={
				businessName: businessName,
				businessAddress: businessAddress,
				businessPhoneNumber: businessPhoneNumber,
				businessEmail: businessEmail,
				businessOwner:businessOwner,
				businessDescription:businessDescription,
				businessWebsite:businessWebsite,
				businessSocialFB:businessSocialFB,
				businessSocialLI:businessSocialLI,
				businessLogoUrl:image_url
			}
      		 // res.writeHead(200, {'content-type': 'text/plain'});
      		 // res.write('received upload:\n\n');
      		 // res.end(util.inspect({fields: fields, files: files}));
    	});//end of form pars

	form.on('end', function(fields,files) {

		var temp_path= this.openedFiles[0].path, //temporary file path
			new_path = 'public/images/', //new file path
			file_name;
			
			//check if the user submitted a new file
			if (this.openedFiles[0].name == ''){
				file_name= 'default.jpg'; //file name	
			}else {
				file_name=this.openedFiles[0].name;
			}
			
			//using file system to copy the file in to new path and create the business
			fs.copy(temp_path,new_path + file_name ,function(err){
				
					//check for errors
				if(err){
					res.render('error',{error:err});
					res.end('Problem with your image upload');
				}//end of if
				else{
					//calling the database table connection
					Bussiness.create(BusinessAdd,function( err,business){//call back function
						//check for errors
						if(err){
							res.render('error',{error:err});
						}
						else{
							res.render('business-added',{ business:business});
							res.end();
						}//end of else
					});//end of business create
				}//end of else

			});//end of file system copy
	});//end of form on end
  }//end of if 
});//end of the post

// get all business show all the businesses

router.get('/all-businesses',function(req,res,next){

	Bussiness.find(function(err,business){
		//check for errors
		if (err) {
			//render the error page with the erro
			res.render('error',{error:err});
			res.render('error',{error:e});
		}
		else{
			//rendering the all business template and send the businesses as jason
			res.render('all-businesses',{ busines:business});
			// console.log(business);  
		}
	});//end of business find

});//end of business get 

// get all business on the home page
router.get('/',function(req,res,next){

	Bussiness.find(function(err,business){
		//check for errors
		if (err) {
			//render the error page with the erro
			res.render('error',{error:err});
		}
		else{
			//rendering the all business template and send the businesses as jason
			res.render('index',{ busines:business});
			console.log(business);
		}
	});//end of business find

});//end of business get 

//Delete all business
router.get('/delete-business/:id',function(req,res,next){

	//get the id from the url and stroe it in a variable
	var id= req.params.id;


	Bussiness.remove({_id:id}, function(err,Bussiness){
			//check for errors
			if(err){
				res.send('Business ' + id + 'Not Found');
			}
			else{
				//url redirection
				res.statusCode =302;
				//adding the req.headers will take the host name
				res.setHeader('Location','http://'+ req.headers['host']+'/all-businesses');
				res.end();
			}//end of else
	});//end of business remove
});//end of delete all business

//routing to the edit business 
router.get('/edit-business/:id', function(req,res,next){

	//get the id from the url and stroe it in a variable
	var id= req.params.id;

	Bussiness.findById(id,function(err,Business){

		//check for errors
		if(err){
			res.send('Business'+id+'Not Found');
		}
		else{
			//render the edit business page
			res.render('edit-business',{business:Business});
			console.log(Business);
		}
	});//end of business find by id
});//end of business edit


router.post('/edit-business/:id',function(req,res,next){
    
	//global varaibles
	var form = new formidable.IncomingForm(),// parse a file upload 
		businessid,//hold the business id
		BusinessEdit;//hold the object

	//form parse to get the values from the form submit 	
	 form.parse(req, function(err, fields, files) {
		//getting the business id from the hidden field and set in the variable
		businessid =fields.id;
		//setting variables to hold form field values
	var	businessName =fields.business_name,
		businessAddress=fields.business_address,
		businessPhoneNumber=fields.business_phone,
		businessEmail=fields.business_email,
		businessOwner=fields.business_owner,
		businessDescription=fields.business_description,
		businessWebsite=fields.business_web,
		businessSocialFB=fields.business_fb,
		businessSocialLI=fields.business_li,
		image_url;

		//setting the image url variable based on user input
		if(files.business_logo.name == ''){
			image_url=fields.image_url;
		}
		else {
			image_url='/images/'+files.business_logo.name;
		}
		//checking for facebook url 
		if(fields.business_fb =='http://'){
			businessSocialFB='https://www.facebook.com/';
		}else {
			businessSocialFB=fields.business_fb;
		}
		 //check for linked in url
		if(fields.business_li =='http://'){
			businessSocialLI='https://www.linkedin.com/';
		}else {
			businessSocialLI=fields.business_li;
		}

		if(fields.business_web =='http://'){
			businessWebsite='/';
		}else {
			businessWebsite=fields.business_web;
		}
		//prepairing the object and setting in to the global variable
		BusinessEdit={
			_id:businessid,
			businessName: businessName,
			businessAddress: businessAddress,
			businessPhoneNumber: businessPhoneNumber,
			businessEmail: businessEmail,
			businessOwner:businessOwner,
			businessDescription:businessDescription,
			businessWebsite:businessWebsite,
			businessSocialFB:businessSocialFB,
			businessSocialLI:businessSocialLI,
			businessLogoUrl:image_url
		}
	    // res.writeHead(200, {'content-type': 'text/plain'});
	    // res.write('received upload:\n\n');
	    // res.end(util.inspect({fields: fields, files: files}));
	});//end of form pars

	//after submitting the form
	form.on('end', function(fields,files) {

		var temp_path= this.openedFiles[0].path, //temporary file path
			new_path = 'public/images/', //new file path
			file_name;

			//check if the user submitted a new file
			if (this.openedFiles[0].name == ''){
				file_name= 'default.jpg'; //file name	
			}else {
				file_name=this.openedFiles[0].name;
			}
			//file system copy function
			fs.copy(temp_path,new_path + file_name ,function(err){
				//check for errors
				if(err){

					res.render('error',{error:err});
					res.end('Problem with your image upload');
				}//end of if
				else{	
					//update the record
					Bussiness.update({_id:businessid},BusinessEdit,function( err,Business){//call back function
						//check for errors
						if(err){
							console.log(err);
							res.send('Business Information Not Updated');
						}
						else{
							//url redirection
							res.statusCode =302;
							//adding the req.headers will take the host name
							res.setHeader('Location','http://'+ req.headers['host']+'/all-businesses');
							res.end();
						}//end of else
					});//end of business update
				}//end of else
			});//end of file system copy
	});//end of form on end
});//end of business edit post 

router.get('/api',function(req,res,next){

	res.render('api');
});//end of user get


//API Get All Products request handler
router.get('/api/business-records',userAuth,function(req,res,next){
	//using the mongoose find methord get all the business in the db
	Bussiness.find(function(err,Bussiness){
		// console.log(Bussiness);
		//check for errors or empty object
		if(err || Bussiness == ''){
			res.send('No Business Found Error:'+err);
		}
		else {
			res.send(Bussiness);
		}
	});//end of business find
});//end of API handeler


// API Get all products by name
router.get('/api/business-records/:name',userAuth,function(req,res,next){
	//getting the name value entered by user in the url
	var name = req.params.name;
	//using the mongoose find methord get all the business by name in the db
	Bussiness.find({businessName:name}, function(err,Bussiness){
		//check for errors or empty object
		if(err || Bussiness){
			res.send('Business '+ name + ' Not In our Records');
		}else {
			res.send(Bussiness);
		}
	});//end of business find
});//end of API handeler

//make the controler public
module.exports = router;