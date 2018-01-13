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
mongoose.connect("mongodb://localhost/inbento_v4", { useMongoClient: true });
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

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})


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

app.get("/events/:id", isLoggedIn,function(req,res){
	console.log(req.params.id);
	Event.findById(req.params.id).populate("presenters").exec(function(err,foundEvent){
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

//====AUTH ROUTES===== //

app.get("/register",function(req,res){
	res.render("register");
})

app.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err)
		{
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/events");
		})
	})
})

app.get("/login", function(req,res){
	res.render("login"); 
})

app.post("/login",passport.authenticate("local", 
	{
		successRedirect: "/events",
		failureRedirect: "/login"
	}), function(req,res){
})

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/events");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


//====================================================

app.listen(6969, function(){
	console.log("Serving ibento at porto 6969");
})