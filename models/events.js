var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
   title: String,
   imageURL: String,
   description: String,
   department: String,
   date: { type: Date, default: Date.now },
   hashtags: [ {tag: String} ],
   organiser: [
   		{
  			type: mongoose.Schema.Types.ObjectId,
  			ref: "User"
   		}],
   presenters: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   	],
   	agenda: [
   		{
   			agendaDate: { type: Date, default: Date.now },
   			agendaInfo: String
   		}
   	]
});

module.exports = mongoose.model("Event", eventSchema);