
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = process.env.OMDB_ID;

exports.twitter ={
    consumer_key:process.env.TWITTER_ID,
    consumer_secret:process.env.TWITTER_SECRET,
    access_token_key:process.env.ACCESS_TOKEN,
    access_token_secret:process.env.ACCESS_TOKEN_SECRET 
} 