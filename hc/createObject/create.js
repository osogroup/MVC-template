$(document).ready(function(){
  
  createHTML();
});

const configData = async () => {
  var listConfig = await fetch("../tempData/objectConfig.json").then(response=>{return response.json();});
  // console.log("configData output ", listConfig);
  return listConfig;
}

// gets all the Objects/Arrays from listOfObjects.json and returns them
const tempData = async () => {
  var objVars = await fetch("../tempData/listOfObjects.json").then(response=>{return response.json();});
  // console.log("tempData output ", objVars);
  return objVars;
}

const createHTML = async () => {
  var data = await tempData();
  var config = await configData();

  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
  + '<div class="col-12">'
      + '<p id="header">'
      + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
  // headerHTML +=        '<a class="headerLinks" href="/hc/listObjects/?type='+headerKey+'">'+headerKey+'</a>';
    headerHTML += '<a class="headerLinks" href="?type='+headerKey+'">'+headerKey+'</a>'
  }
  
  headerHTML  +=  '</p>'
              + '</div>'
              + '<h1>Create '+objType+' Item</h1>'
            + '</div>';
  $('#everything').append(headerHTML);
}