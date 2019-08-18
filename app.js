const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
//const requester = require('./requester')
var router = express.Router();
var path = __dirname + '/views/';
const mockobject = {
  suburb: "fake suburb",
  commute_time: 5,
  distance: 10
}
var suburbs = [
  { name: 'Auckland', duration: 7, numListings: 100 },
  { name: 'Hamilton', duration: 5, numListings: 70 },
  { name: 'Example 3', duration: 10, numListings: 30 }
];
var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
var inputCommuteLocation, inputCommuteTime;
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// console.log(suburb("auckland","morningside","University-Of-Auckland"))

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.render(path + "index")
});

router.use('/search', function (req, res, next) {
  res.render(path + "search", {
    suburbs: suburbs,
    tagline: tagline,
    mockobject: mockobject,
    inputCommuteLocation: inputCommuteLocation,
    inputCommuteTime: inputCommuteTime
  });
  next()
})

router.post('/search', function (req, res) {
  var inputCommuteLocation = req.body.inputCommuteLocation,
  inputCommuteTime = req.body.inputCommuteTime;
})
app.use("/", router);

app.use("*", function (req, res) {
  res.render(path + "404");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
