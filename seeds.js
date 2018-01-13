var mongoose = require("mongoose");
var Event    = require("./models/events");

var data = [
   {
   title: "Event 1",
   imageURL: "https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg",
   description: "This is an event",
   department: "ABC Dept",
   hashtags: [ {tag: "cool"}, {tag: "awesome"} ],
   	agenda: [
   		{
   			agendaInfo: "agenda1" 
   		} ]
   	},
     {
   title: "Event 2",
   imageURL: "https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg",
   description: "This is an event",
   department: "ABC Dept",
   hashtags: [ {tag: "cool"}, {tag: "awesome"} ],
   	agenda: [
   		{
   			agendaInfo: "agenda1" 
   		} ]
   	}
]

function seedDB(){
	Event.remove({}, function(err){
		if(err)
		{
			console.log(err);
		}
		console.log("Removed Campgrounds");

		data.forEach(function(seed){
            Event.create(seed, function(err, createdEvent){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an event");
                    //create a comment
                    User.create(
                        {
                            name: "Ishank"
                        }, function(err, createdUser){
                            if(err){
                                console.log(err);
                            } else {
                                createdEvent.presenters.push(createdUser);
                                createdEvent.save();
                                console.log("Created new user");
                            }
                        });
                }
            });
        });
	})
}

module.exports = seedDB;