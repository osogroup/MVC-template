$(document).ready(function () {
  navBarGenerate();
});


const navBarGenerate = async () => {
  var data = await tempData();
  var HTMLoutput = '<div id="contacts">'
                  + '<div class="row">'
                    + '<p id="header">'
                      + '<img id="imageSpacing" src="images/MindfulMeasuresLogo.png" alt="LogoImage" width="80">';

  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    HTMLoutput +=         '<a class="headerLinks" href="/?type='+headerKey+'&value=list">'+headerKey.toUpperCase()+'</a>';
  }

  // closing header row
  HTMLoutput +=         '</p>'                 
                    + '</div>'
                  + '</div>';

  $('#navBar').append(HTMLoutput);
}
