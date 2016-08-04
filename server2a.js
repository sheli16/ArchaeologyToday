/* Scraper: Server #2  (18.9) 
 * ========================= */

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



console.log("\n******************************************\n" +
            "Hooking mongodb\n" +
            "no errors:" +
            "\n******************************************\n")

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.send("Archaeology Today");
});

// first, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the Archaeology website:" +
            "\n******************************************\n")



// make a request call for nhl.com's homepage 
app.get('/archaeology', function(req, res) {
request('http://www.archaeology.org/news', function (error, response, html) {
console.log(html);
  // load the body of the html into cheerio
  var $ = cheerio.load(html);
  res.send(collections);
    });

  // an empty array to save our scraped data
  var result = [];

  // With cheerio, find each span.news_title -tag with the class "headline-link"
  $('span.news_title').each(function(i, element){

      // save the text of the span.news as "title"
      var title = $(this).text();

      // find th span.news_title  tag's parent a-tag, 
      // and save it's href value as "link"
      var link = $(element).parent().attr('href');
      
      // for each span.news_title -tag, make an object with data we scraped
      // For each image tag add

// var date = $(element).parent('div').attr('.news_date_title');

      // and push it to the result array
      result.push({
        title:title,
        link:link,
        // date:date
      });
    });

  // after the program scans each  span.news_title .headline-link, log the result
  console.log(result);
  return result;
});

  // listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});



// console.log(result);

// // make a request call for nhl.com's homepage 
// request(result.link, function (error, response, html) {

//   // load the body of the html into cheerio
//   var $ = cheerio.load(html);

//   // an empty array to save our scraped data
//   var articleImg = [];

//   // With cheerio, find each span.news_title -tag with the class "headline-link"
//   $('p.span').each(function(i, element){


// var imgLink = $(element).find('p').find('img').attr("src");

//       // and push it to the result array
//       result.push({
//         pic:imgLink
//       });
//     });
//  // after the program scans each  span.news_title .headline-link, log the result
//   console.log(result);
//   return result
//   });
