// Dependencies
var Twitter = require('twitter');
var config = require('./config.js');

// Pass config details to twitter
var bot = new Twitter(config);

// Params
var params = {
  q: "how hot Beto O’Rourke is",
  result_type: "mixed",
  lang: 'en'
}

function get_the_tweets() {
  bot.get('search/tweets', params, function (err, data, response) {
    if (!err) {
      for (var i=0;i<data.statuses.length;i++){
        console.log(data.statuses[i].text);

        var id = data.statuses[i].id_str;
        console.log(id);

        bot.post('statuses/retweet/'+ id,  function(err, response) {
   	if (err) {
      console.log("ERROR! " + err[0].message);
      if (err[0].message == "You have already retweeted this Tweet.") {

      }
  	  
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

// Every 6 hours
setInterval(get_the_tweets, 360*60*1000);

get_the_tweets();


