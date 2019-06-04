var axios = require('axios');
require('dotenv').config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var omdbkey = keys.omdb
var twitter = new Twitter(keys.twitter)

var action = process.argv[2];
var search = process.argv[3];

 var omdbaxios = "http://www.omdbapi.com/?t=" + search + "&plot=full&rotten=true&apikey=" + omdbkey;

function prompt(){
if(action==="movie-this"){
    axios.get(omdbaxios).then(
    function(response){
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating " +response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
});
}

else if (action === "spotify-this-song"){
spotify.search({type: 'track', query: search}, function(err,data){
    if (err) {
        return console.log('Error occured: ' + err);
    
    }
    console.log("-----------------")
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Track: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Link: " + data.tracks.items[0].preview_url);
}
)}




else if (action === "tweet-this"){
twitter.post('statuses/update', {status: search})
.then(function (tweet) {
      console.log(tweet);
      console.log("Made it");
}).catch(function (error) {
    throw error;
  });
}




else if (action === "do-what-it-says"){
fs.readFile("random.text","utf8",function(err,data){
    if(err){
        return console.log(err);
    
    }
    else{
    var dataArr = data.split(",");
    action = dataArr[0];
    search = dataArr[1];
    }
    prompt();

    
});
}

}

prompt();