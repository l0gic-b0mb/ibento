var mongoose 			  = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
// USER - email, name
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    imageURL: String,
    canCreate: Boolean,
    canPresent: Boolean,
    canAttend: Boolean,
    linkedInProfile: String,
    bio: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);