var express 			= require("express"),
    app     			= express(),
    mongoose 			= require("mongoose"),
    bodyParser 			= require("body-parser"),
    expressSanitizer    = require("express-sanitizer"),
    methodOverride 		= require('method-override'),
    passport			= require('passport'),
    localStratergy   	= require('passport-local'),
    Event 				= require("./models/events"),
    User 				= require("./models/users"),
    seedDB 				= require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost/inbento_v2", { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Bhai chalega",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req, res){
	res.redirect("/events");
})

app.get("/events/",function(req,res){
	Event.find({},function(err,foundEvent){
		if(err)
		{
			console.log(err)
		}
		else
		{
			res.render("index", {events: foundEvent});
		}
	})
})

app.get("/events/:id",function(req,res){
	console.log(req.params.id);
	Event.findById(req.params.id).populate("organiser presenters").exec(function(err,foundEvent){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(foundEvent);
			res.render("view", {event: foundEvent});
		}
	});
});

//====AUTH ROUTES=====



app.listen(6969, function(){
	console.log("Serving ibento at porto 6969");
})