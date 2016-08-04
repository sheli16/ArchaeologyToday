

// 1: On Load
// ==========

// The first thing this js file will do: ask the backend for a json file 
$.getJSON('/all', function(data) {
  // for each entry of that json...
  for (var i = 0; i<data.length; i++){
    // append each animal of the named properties to the table
    $('.card-content').append('<tr><td>'+ data[i].title + '</td>' + 
                         '<td>'+ data[i].link + '</td></tr>');
  }
});


// 2: Button Interactions
// ======================

// When user clicks the weight sort button, display table sorted by weight 
