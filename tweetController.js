// contactController.js
// Import contact model
Contact = require('./tweetModel');
// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Tweet retrieved successfully",
            data: tweets
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    tweets.findById(req.params.tweets_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: tweets
        });
    });
};
