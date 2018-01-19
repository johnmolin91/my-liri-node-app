require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');

var Spotify = require('node-spotify-api');
console.log("tk");

var client = new Twitter({
	consumer_key: 'sODRUeRjHK12N3oc1umHM7RwI',
	consumer_secret: 'Yb6lOzN6NGfe1oZEtPSzTpTVu0bOhtA4Sx5f0TsMQO72DtirQ4',
	access_token_key: '844319727535165441-m8L9K2LkMvSngJVwn9WkKvhqpjlzrWH',
	access_token_secret: 'U6vqSQsSzM7gqfY7issJk8WNe5chvdiR16i78qQZs471v'
});

var spotify = new Spotify({
 id: "0497ddee965b4564beead61f491be7e9",
 secret: "d45de14f5f5b4f86bbbe2f55dadaed92"
});

var myTweets = function() {
	client.get('statuses/user_timeline', {screen_name: 'jm71911', count: 20}, function(error, tweets, response) {
		if (!error) {
			var pastTweets = tweets;
				for (var i = 0; i < pastTweets.length; i++) {
					console.log(pastTweets[i].created_at);
					console.log(' ');
					console.log(pastTweets[i].text);
				}
		}
	})
};

var getArtistNames = function(artist) {
	return artist.name;
};

var mySpotify = function(songName) {
	spotify.search({ type: 'track', query: songName }, function(err, data) {
 		if (err) {
   		return console.log('Error occurred: ' + err);
 		} else {
 			var songs = data.tracks.items;
			for(var i=0; i<songs.length; i++){
				console.log(i);
				console.log('artist(s): ' + songs[i].artists.map(
					getArtistNames));
				console.log('song name: ' + songs[i].name);
				console.log('preview song: ' + songs[i].preview_url);
				console.log('album: ' + songs[i].album.name);
				console.log('----------------------')
			}
 		}

	// console.log(data.tracks.items);
	});
};

var myMovie = function(movieName){


request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName + '&y=&plot=short&r=json', function (error, response, body){
	if (!error && response.statusCode && 200) {
		var jsonData = JSON.parse(body);

		console.log('Title: ' + jsonData.Title);
		console.log('Year: ' + jsonData.Year);
		console.log('Rated: ' + jsonData.Rated);
		console.log('IMDB Rating: ' + jsonData.imdbRating);
		console.log('Country: ' + jsonData.Country);
		console.log('Language: ' + jsonData.Language);
		console.log('Plot: ' + jsonData.Plot);
		console.log('Actors: ' + jsonData.Actors);
		console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
		console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
	};
});
};

var choose = function(caseData, functionData){
	switch(caseData){
		case 'my-tweets' :
		myTweets();
		break;
		case 'spotify-this-song':
		mySpotify(functionData);
		break;
		case 'movie-this':
		myMovie(functionData);
		break;
		case 'do-what-it-says':
		doWhatItSays();
		break;
		default:
		console.log('LIRI does not know that');
	}
};

var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function (err, data) {
	  if (err) throw err;

	  var dataArr = data.split(',');

	  if ( dataArr.length == 2){
	  	choose(dataArr[0], dataArr[1]);
	  } else if (dataArr.length == 1) {
	  	choose(dataArr[0]);
	  };
	  });
};

var runThis = function(argOne, argTwo){
	choose(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);