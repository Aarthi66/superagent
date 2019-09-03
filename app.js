var express = require("express");
var app = express();
var port = 4001;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/userprofile");

var nameSchema = new mongoose.Schema({
  username: String,
  emailid: String,
  password: String,
  code: String
});

var userprofile = mongoose.model("User", nameSchema);
// app.use(express.static(__dirname+"public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index1.html");
});

app.get("/forget-password", (req, res) => {
  res.sendFile(__dirname + "/password.html");
});

app.get("/test", (req, res) => {
  res.send({ test: true });
});

app.listen(port, () => {
  console.log(" ------ ----- Server listenening to port ---- -----> " + port);
});

app.post("/sample", function(req, res) {
  res.send({ postRequest: true, body: req.body });
  // res.sendFile(__dirname+"/index.html")
  console.log(req.body);
});

app.put("/sample", function(req, res) {
  res.send({ putRequest: true, body: req.body });
  console.log(req.body);
});

app.get("/sample", function(req, res) {
  res.send({ getRequest: true, body: req.body });
  console.log(req.body);
});

app.head("/sample", function(req, res) {
  res.send({ headRequest: true, body: req.body });
  console.log(req.body);
});

app.post("/addname", function(req, res) {
  console.log(req.body);
});

app.post("/signup", function(req, res) {
  console.log("signup result", req.body);
  var UserPro = new userprofile(req.body);
  UserPro.save();
  //   user.find({ val: "hdejefx" }, function(err, result) {
  //     if(err){console.log(res.json(err))}
  //     console.log(result);
  //     var newobj=JSON.stringify(result);
  //     console.log(newobj[0])
  //     console.log(result[0].val);
  // });
  //   console.log("result", req.body);
});

app.post("/login", function(req, res) {
  console.log("request", req.body);
  var output = userprofile.find({ username: req.body.username });
  console.log("output", output);
  userprofile.find({ username: req.body.username }, function(err, result) {
    console.log("error", err);
    if (!err) {
      console.log("result", result);
      if (result[0].password === req.body.password) {
        console.log("Successfully logged in");
      } else {
        console.log("error");
      }
    } else {
      console.log("Username doesn't exist");
    }
  });
  // res.send({res: true})
  res.sendFile(__dirname + "/xhr.html");
});
// app.get("/login",function(req,res){
//   res.sendFile(__dirname+"/xhr.html");
// })
