$(document).ready(function(){
  outputHTML();
});
// get information from URL (objType, objItemID, objItemName, objItemDesc, and objItemTags) 
// ex. task, 0, COI: Design Wireframes, These tasks will result in a user interface to create an object item, and 0


// pull in data from objectList.JSON and configuration JSON file 
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

// function to create editObject HTML
const outputHTML = async () => {
  console.log("Entering outputHTML()");
  var data = await tempData();
  var config = await configData();
  var inputBoxes = '';

  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
    + '<p id="header">'
      + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML += '<a class="headerLinks" href="?type='+headerKey+'">'+headerKey+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // making a propt scenario where there is no object type selected
  headerHTML += '<h1>Edit '+objType+' Item</h1>'
            + '</div>';
  $('#HTMLoutput').append(headerHTML);

  // create input headers

  // create input boxes with the type and id (since that stuff isn't in the editable areas) 
  // inputBoxes += 

  // use objItemID (and the other ones) to get data out of the JSON file that create and fill in the input boxes











  console.log("Exiting outputHTML()");
}
