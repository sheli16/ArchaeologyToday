/* Scraping into DB (18.2.5)
 * ========================== */


/* Students: Using the tools and techniques you learned so far,
 * you will scrape a website of your choice, then place the data
 * in a MongoDB database. Be sure to make the database and collection
 * before running this exercise.

 * Consult the assignment files from earlier in class
 * if you need a refresher on Cheerio. */


// Initialize Express app
var express = require('express');
var app = express();

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "archdb";
var collections = ["headlines"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.send("Archaeology Today");
});


/* TODO: make two more routes
 * -/-/-/-/-/-/-/-/-/-/-/-/- */

// Route 1 
// =======
// This route will retrieve all of the data 
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get('/alldata', function(req, res) {
  db.archdb.find({}, function()
  res.send(collections);
});

// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data  
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?
app.get('/archaeology', function(req, res) {
	request('http://www.archaeology.org/news', function(err, res, body){
	console.log(html);
	var $ = cheerio.load(html);
  res.send(collections);  
});

	$('.news_title').each(function(i, element){
		var title = $(this).text();
		var link = $(this).find('a').attr('href');
		var imgLink = $(this).find('a').find('img').attr("src");

		results.push({
		"Link": imgLink,
		"title":title,
		"url": link

	});
}); 
console.log(results);
/* -/-/-/-/-/-/-/-/-/-/-/-/- */


// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});