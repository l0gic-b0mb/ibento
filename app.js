var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({  extended: true }));
app.set("view engine", "ejs");

app.get("/",function(req, res){
	res.send("Han bhai chal rha h");
})

app.get("/index/",function(req,res){
	res.render("index");
})

app.listen(6969, function(){
	console.log("Servingo ibento at porto 6969");
	console.log("Spanish Yo :P")
})