const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0.kxphu.mongodb.net/contactDance?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
const port = process.env.PORT || 8080; 

//defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      // res.send("Your details has be saved to database");
      res.redirect("/contact");
        console.log(req.body)
    }).catch(()=>{
        res.send("Your details couldn't be saved to database");
        console.log(req.body)
    })
})

// START THE SERVER
app.listen(port, ()=>{
    process.env.PORT
    console.log(`The application started successfully on port ${port}`);
});
APP_CONFIG = {
  "mongo": {
    "hostString": "mongodb+srv://dbuser:dbuser@cluster0.kxphu.mongodb.net/<contactDance>?retryWrites=true&w=majority",
    "user": "dbuser",
    "db": "contactDance"
  }
}
var mongoPassword = 'dbuser';
			
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var config = JSON.parse(process.env.APP_CONFIG);
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(
    "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
    config.mongo.hostString, 
    function(err, db) {
      if(!err) {
        res.end("We are connected to MongoDB");
      } else {
        res.end("Error while connecting to MongoDB");
      }
    }
  );
});
server.listen(process.env.PORT);