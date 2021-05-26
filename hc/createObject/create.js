$(document).ready(function(){
  
  // createHTML();
  doTheHTML();
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
    + '<p id="header">'
      + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="50">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML += '<a class="headerLinks" href="?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // making a propt scenario where there is no object type selected
  if (objType == null) {
    headerHTML += '<h1>Select Item from Header to Create Item...</h1>';
  }
  else {
    headerHTML += '<h1>Create '+objType+' Item</h1>';
  }
  headerHTML += '</div>';
  $('#everything').append(headerHTML);
  
}





















function doTheHTML() {
  localStorage.clear();
  localStorage.setItem("name", "Riley");
  console.log(localStorage);

}