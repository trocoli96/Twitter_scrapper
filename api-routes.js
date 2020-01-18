// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import contact controller
var tweetController = require('./tweetController');

// Contact routes
router.route('/tweets')
    .get(tweetController.index);

// Export API routes
module.exports = router;