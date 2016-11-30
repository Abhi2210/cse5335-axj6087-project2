/**
 * Created by abhi on 11/28/2016.
 */
var express = require('express');
var appRoot = require('app-root-path');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cors = require("cors");

mongoose.connect("mongodb://abhi22:tutu22@ds143717.mlab.com:43717/heroku_p192hvf2");

var db_schema = new mongoose.Schema({
    Category : String,
    Film : String,
    Director : String,
    Leading_Actors: String,
    Year: Number,
    Country: String
});

var collection = mongoose.model('collection', db_schema, 'movies');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'));
var port = process.env.PORT || 3000
//var port = 3000
app.get("/", function(req, res){
   // res.sendfile(__dirname + '/start.html');
    res.sendfile(__dirname + '/public/index.html');

})

app.get('/movie', function(req, res){
    collection.find({},{"Film":1,"_id":0},function(err, data){
        res.json(data);
        //console.log(data)
    });
})

app.get('/movie/:movie_list', function(req, res){
    console.log("sds : " + req.params.movie_list)
    collection.findOne({"Film": req.params.movie_list},{"_id" : 0},function(err, data){
        res.json(data);
        console.log(data)

    })
})


app.listen(port);
