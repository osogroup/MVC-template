$(document).ready(function(){
  
  createHTML();
});

function createHTML() {
  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
  + '<div class="col-12">'
      + '<p id="header">'
      + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
  headerHTML +=        '<a class="headerLinks" href="/hc/listObjects/?type='+headerKey+'">'+headerKey+'</a>';
  }
  
  headerHTML  +=  '</p>'
              + '</div>'
              + '<h1>OAS Object List'
            + '</div>'
  $('#everything').append(headerHTML);
}