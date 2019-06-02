var axios = require('axios');
require('dotenv').config();
// var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var omdbkey = keys.omdb

var action = process.argv[2];
var search = process.argv[3];

 var omdbaxios = "http://www.omdbapi.com/?t=" + search + "&plot=full&rotten=true&apikey=" + omdbkey;


if(action==="movie-this"){
    console.log("Movie Time")
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




else if (action === "concert-this"){


}

else if (action === "do-what-it-says"){

}