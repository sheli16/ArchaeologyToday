/* Scraper: Server #2  (18.9) 
 * ========================= */

// Dependencies:
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html


// first, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the NHL website:" +
            "\n******************************************\n")




// make a request call for nhl.com's homepage 
request('http://www.archaeology.org/news', function (error, response, html) {

  // load the body of the html into cheerio
  var $ = cheerio.load(html);

  // an empty array to save our scraped data
  var result = [];

  // With cheerio, find each span.news_title -tag with the class "headline-link"
  $('#news_container').each(function(i, element){

      // save the text of the span.news as "title"
      // var title = $(this).text();

      // find th span.news_title  tag's parent a-tag, 
      // and save it's href value as "link"
      var link = $(element).parent().attr('href');
      
      // for each span.news_title -tag, make an object with data we scraped
      // For each image tag add
      var para = $(element).parent('p').attr('.news_cont');
var title = $(element).parent('div').attr('.span.news_title');
var date = $(element).parent('div').attr('.news_date_title');

      // and push it to the result array
      result.push({
        title:title,
        link:link,
        date:date,
        para:para
      });
    

  // after the program scans each  span.news_title .headline-link, log the result
  console.log(result);
 return result;
});
// console.log(result);
});