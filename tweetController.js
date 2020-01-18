// contactController.js
// Import contact model
Tweet = require('./tweetModel');
// Handle index actions
exports.index = function (req, res) {
    Tweet.get(function (err, tweets) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Tweet retrieved successfully",
            data: addSentiment(tweets)
        });

    });
};

// Handle view contact info
exports.view = function (req, res) {
    tweets.findById(req.params.tweets_id, function (err, tweets) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: tweets
        });
    });
};

var ml = require("ml-sentiment")();

function addSentiment(tweets) {
    var tweetsWithSetniment = tweets.map((tweet) => {
        const sentiment = ml.classify(tweet.body);
        let emoji = "😕";
        if (sentiment >= 5) {
            emoji = "😃";
        } else if (sentiment > 0) {
            emoji = "🙂";
        } else if (sentiment == 0) {
            emoji = "😐";
        }
        return {
            ...tweet,
            emoji,
            sentiment
        };
    });
    return tweetsWithSetniment;
}