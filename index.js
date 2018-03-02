// Dependencies
var Twitter = require('twitter');
var config = require('./config.js');

// Pass config details to twitter
var bot = new Twitter(config);

// Params
var params = {
  q: "beto o'rourke is hot",
  result_type: "mixed",
  multi:true,
  lang: 'en'
}

// DO tha dam thing
function get_the_tweets() {
  bot.get('search/tweets', params, function (err, data, response) {
    if (!err) {
      for (var i=0;i<data.statuses.length;i++){
        // Logging 
        console.log(data.statuses[i].text);
        var tweet_id = data.statuses[i].id_str;

        // Favorite the tweets
        bot.post('favorites/create', { id: tweet_id }, function(err, response){
          if(err){
            console.log(err[0].message);
          }
          else{
            console.log("favorited");
          }
        });

        // Retweet the tweets
        bot.post('statuses/retweet/'+ tweet_id,  function(err, response) {
         	if (err) {
            console.log("ERROR! " + err[0].message);
        	} else {
        	  console.log("retweet");
        	}
      })
      }
    } else {
      console.log(err);
    }
  });
}

get_the_tweets();