// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var tweetSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: String,
    link: String,
});
// Export Contact model
var tweets = module.exports = mongoose.model('tweets', tweetSchema);
module.exports.get = function (callback, limit) {
    tweets.find(callback).limit(limit);
};