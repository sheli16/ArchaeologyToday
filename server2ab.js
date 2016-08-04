/* Scraper: Server #2  (18.9) 
 * ========================= */

// Initialize Express app
var express = require('express');
var app = express();
var exphbs = require('express3-handlebars');

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "archdb";
var collections = ["headlines"];
var db = mongojs(databaseUrl, collections);


// first, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the Archaeology website:" +
            "\n******************************************\n")


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});



// this makes sure that any errors are logged if mongodb runs into an issue



// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.send("Archaeology Today");
});

app.use('/views', express.static('indexS.html'));

// make a request call for Archaeology.org's homepage 

request('http://www.archaeology.org/news', function (error, response, html) {

  // load the body of the html into cheerio
  var $ = cheerio.load(html);

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
  console.log("\n******************************************\n" +
            "This function is working\n" +
            "from the Archaeology website:" +
            "\n******************************************\n");
console.log(result.title);

});

app.get('/index', function(req, res) {
  res.send("this is the index");
  db.collections.insert(result.title, function(err, saved){
  // show any errors
  if (err) {
    console.log(err);
}
// otherwise, send the response to the client (for AJAX success function)
else{
  res.send(saved);
  console.log("\n******************************************\n" +
            "Last function \n" +
            "from the Archaeology website:" +
            "\n******************************************\n");
  
db.getCollection('archdb.headlines').find({})
db.getCollection('archdb.headlines').insert({})


}
});
});

// // listen on port 3000
 app.listen(3000, function() {
 console.log('App running on port 3000!');
});

