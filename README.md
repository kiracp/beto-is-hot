# beto-is-hot

Texas candidate for U.S. senate Beto O'Rourke is hot and the world needs to know!

This Twitter bot is deployed on Heroku. It runs hourly, checks for new tweets talking about how Beto O'Rourke is hot, and retweets/favs them. This is my first Twitter bot! Here's how I did it.

### Assumptions
* This tutorial is written for a UNIX-based OS 
* Knowledge of basic command line tools
* `git v2.5.4`, `node v5.6.0`, and `npm v3.6.0` are installed on your machine
* Updated March 2018 - some things may change

### Getting started on Twitter

I create a new Twitter account with a descriptive name (mine is called [@beto_is_hot](https://twitter.com/beto_is_hot)).  

Now we have to get our API info from Twitter. Visit [https://apps.twitter.com/] and click `Create New App`. Fill out the form (you don't need a website URL - example.com will do) and submit to create the app!

Navigate to the `Keys and Access Tokens` tab and click  "Create my Access Token" button. Bookmark this page, and switch over to your command line!

### Writing the bot

Create a new repository with a descriptive name. Mine is called `beto-is-hot`, if you can believe that!

To get started, we'll `cd` into our directory and use the command `npm init` to get our node app set up. Go through the commands (giving your bot a name, a description, feel free to keep the entry point as `index.js`...) when you're done with that, your `package.json` should be written to the repository. 

Then, run `npm install --save twitter` to install the Twitter packages. Now we're ready to start developing!

Let's start with writing a `config.js` file. This gives us all the authentication info for our app, and allows us to tweet through the account we just created. This file only needs to include the following: 

```
module.exports = {
  consumer_key: '[YOUR CONSUMER KEY]',
  consumer_secret: '[YOUR CONSUMER SECRET]',
  access_token_key: '[YOUR ACCESS TOKEN]',
  access_token_secret: '[YOUR ACCESS TOKEN SECRET]'
}
```

You guessed it, all that info will come from the "Create my Access Token" step above. Just copy and paste in your info, and save the `config.js` file. To see an example, check out the `config.js` file in this repository.

Now let's create our app! Mine is in the `index.js` file here. It follows the basic structure:

``` 
// Import dependencies

// Pass config details to twitter
var bot = new Twitter(config);

// Call the API and do what I want to do
function get_the_tweets() {
  // Retrieving, favoriting and retweeting tweets that match my parameters
}

get_the_tweets();
```

Briefly, the commands I use from the Twitter API are:
* `bot.get('search/tweets' ...)` to get tweets with the parameters specified
* `bot.post('favorites/create' ...)` to favorite the tweets I find
* `bot.post('statuses/retweet/' ...)` to retweet the tweets I find

Feel free to clone the my index file and switch out the parameters with your own! Many more commands are available in [Twitter API documentation](https://developer.twitter.com/en/docs).

To run the app, use the command `node index.js`. Make sure you include some logging to see what Tweets your bot is gathering, and check your Twitter account to make sure your bot is following orders!


### Deploying on Heroku

So, my Twitter bot is working! It runs from the command line with the command `node index.js`.

Now I need to create a Procfile, with the contents `worker: node index.js`. This tells the worker what command will run my app. Without making any modifications to this file, I can deploy it to Heroku! 

Sign up for a Heroku account, follow installation instructions, and then create a new app (`New > Create New App`). I gave my app a unique, descriptive name: `beto-is-hot`. 

Then, I return to my local directory. Follow the instructions from Heroku to login (by running the `heroku auth:login` command and typing in my details) and check that your `npm`, `node`, and `git` is up to date. Sweet! Heroku should be ready to go.

In my directory, I use the command `heroku git:remote -a beto-is-hot`. This adds the heroku app as a location to push to.

Then I run my classic git commands:
`git add .`
`git commit -m “adding to heroku”`
And finally
`git push heroku master`

Then I see the entire process building the app, including a verification that my app successfully deployed! Woohoo!

### Set up recurrence with Heroku Scheduler

Ok that’s great, but now I need to set up a recurrence. I’ll do it using the Heroku Scheduler plugin. In my Heroku Dashboard, I click to the `Resources` tab, and see a list of Dynos. By default, the `web` dyno will be enabled. I click the toggle next to `web` to turn it off, and turn ON the toggle next to `worker`, which should have the `node index.js` command pulled in from my Procfile. 

Great, now I need to schedule the recurrence. In `Add-ons`, I search for "Heroku Scheduler" and select the free plan. Then I'll click into the Heroku Scheduler, and type in my start command (in my case, `node index.js`), then select the frequency and next due date. I am running my app hourly. 

On save, my Heroku app will be spun up at the requested frequency! Beto is hot tweets every hour!

### Housekeeping

* Don't forget your `.gitignore` file, which should include `node_modules` and `.DS_Store`. 
* Any questions on this documentation? Tweet at ME at [@classickira](https://twitter.com/classickira)!
* And definitely [follow](https://twitter.com/beto_is_hot) for Beto updates!

### Resources
* https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078
* https://gist.github.com/debashisbarman/bffe0f6cd3c0fd2fe40e

