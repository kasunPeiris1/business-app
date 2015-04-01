var mongoose=require('mongoose'),// linking the databse module
	//definig the business table data (fields and colums)
 	businessDirSchema= new mongoose.Schema({
		businessName: String,
		businessLogoUrl: String,
		businessAddress: String,
		businessPhoneNumber: String,
		businessEmail: String,
		businessOwner:String,
		businessDescription:String,
		businessWebsite:String,
		businessSocialFB:String,
		businessSocialLI:String
		
	});
module.exports = mongoose.model('Bussiness',businessDirSchema)