var mongoclient = require("mongodb").MongoClient;
var url = "mongodb+srv://alexander:alexander@carbappdb-zeoro.mongodb.net/CarbAppDB?retryWrites=true";
var express = require("express");
var path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var port = process.env.port || 8082;

// Connecting to my remote mysql DB
/*app.use("/", function(req, res, next){
var con = mysql.createConnection({
		host: "remotemysql.com",
		user: "bupFWhT8t5",
		password: "HtaOPLrUi5",
		database: "bupFWhT8t5",
		port:3306
	});
	con.query("SELECT * FROM mytable", function(err, rows){
		if(err) throw err;
		console.log(rows[0].name + " " + rows[0].nutritionper100gcarbohydrate);
	});
	
	next();
});*/


app.use(express.static("public"));
app.post("/users",urlencodedParser, function(req, res) {
	res.send("Thank you, the data has been received.");
	console.log(req.body.username);
	console.log(req.body.password);
	console.log(req.body.confirmpassword);
	console.log(req.body.email);
	mongoclient.connect(url, {useNewUrlParser:true}, function(err, db){
		if(err) throw err;
		console.log("Successful connection");
		var database = db.db("CarbAppDB");
		
		var obj = {
			username:req.body.username,
			password:req.body.password,
			confirmpassword:req.body.confirmpassword,
			email:req.body.email
		};
		database.collection("users").insertOne(obj, function(err, result){
			if(err) throw err;
			console.log("Data has been entered to the database (users table).");
		});
		
	});
});
	
	//Route for querying all food types
	app.get("/foods", function(req, res){
		var con = mysql.createConnection({
		host: "remotemysql.com",
		user: "bupFWhT8t5",
		password: "HtaOPLrUi5",
		database: "bupFWhT8t5",
		port:3306
	});
		con.query("SELECT * FROM mytable LIMIT 15", function(err, result){
			if(err) throw err;
			res.json(result);
		});
		
	});

app.get("/", function(req, res) {
	res.send("Server is working");
	console.log("The server is listening at port: " + port);
});

// Route to handle the path (/home)
app.get("/home", function(req, res){
	res.sendFile(path.join(__dirname + "/home.html"));
});
// Route to handle the path (/food)
app.get("/food", function(req, res){
	res.sendFile(path.join(__dirname + "/food.html"));
});

// Route to handle the path (/login)
app.get("/login", function(req, res){
	res.sendFile(path.join(__dirname + "/login.html"));
});

// Route ro handle the path (/register)
app.get("/register", function(req, res){
	res.sendFile(path.join(__dirname + "/register.html"));
});

app.listen(port);