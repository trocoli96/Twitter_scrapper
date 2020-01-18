const axios = require('axios');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url2 = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'data';

// Create a new MongoClient
const client = new MongoClient(url2);

// Use connect method to connect to the server
MongoClient.connect(url2, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);


const url = 'https://twitter.com/GOPChairwoman';

const collections = db.collection('donaldTweets');

const recoveredTweets = [];


    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const tweets = $('.tweet');
            tweets.each(function () {
                const user = $(this).find('.fullname').text();
                const body = $(this).find('.tweet-text').text();
                const username = $(this).find('.username').text();
                const link = 'https://twitter.com' + $(this).find('.tweet-timestamp').attr('href');
                recoveredTweets.push({
                    user,
                    body,
                    username,
                    link
                })
            });

            // Use connect method to connect to the Server
            client.connect(function (err) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                const collection = db.collection('tweets');
                // Insert some documents
                collection.insertMany(recoveredTweets)
                    .then(res => {
                        console.log(res);
                        client.close();
                    })
                    .catch(err => console.log(err));
            });
         });
    });

