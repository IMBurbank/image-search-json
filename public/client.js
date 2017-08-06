// client-side js
// run by the browser each time view template is loaded


(function() {
  var baseUrl = 'https://img-find.glitch.me/search?',
      output = document.getElementById('output'),
      request = document.getElementById('request'),
      topInput = document.getElementById('input-q'),
      queryKeyMap;
  
  fetch('/queryKeyMap').then( function(response) {
    return response.json();
  }).then( function(json) {
    queryKeyMap = json;
  });
  
  topInput.focus();
  
  document.getElementById('search-form').onsubmit = function(event) {
    event.preventDefault();
    
    var query = Object.keys(queryKeyMap).reduce( function(queryStr, key) {
      return event.target['input-' + key].value ? 
        queryStr + key + '=' + event.target['input-' + key].value + '&' : 
        queryStr;
    }, '');
      
    fetch('/search?' + query).then( function(response) {
      return response.json();
    }).then( function(json) {
      request.innerText = baseUrl + query;
      output.innerHTML = '<pre>' + JSON.stringify(json, null, '  ') + '</pre>';
      topInput.value = '';
      topInput.focus();
    });
  }
}());