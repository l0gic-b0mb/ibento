var mongoose 			  = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
// USER - email, name
var userSchema = new mongoose.Schema({
    username: { type:String, default: "ishank"},
    password:{ type: String, default: "isahnk"},
    name: { type:String, default: "Ishank"},
    imageURL: { type:String, default: "https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg"},
    canCreate: { type:Boolean, default: true},
    canPresent: { type:Boolean, default: true},
    canAttend:{ type: Boolean, default: true},
    linkedInProfile: { type:String, default: "abc.com"},
    bio: { type:String,  default: "Gand faad banda"}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);