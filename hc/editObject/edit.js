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


  // ------------------------------------------- Navigation Bar -------------------------------------------


  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
    + '<p id="header">'
      + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // H1 header to let the user know which object they're editing
  headerHTML += '<h1>Edit '+objType+' Item</h1>'
            + '</div>';
  $('#HTMLoutput').append(headerHTML);


  // ------------------------------------------- Items Header -------------------------------------------


  // create the items header row
  var itemHeader = '<div class="row">'
                   + '<div class="col-1"><div class="col-12">ID</div></div>'
                   + '<div class="col-4"><div class="col-12">Name</div></div>'
                   + '<div class="col-6"><div class="col-12">Description</div></div>'
                   + '<div class="col-1"><div class="col-12">Tags</div></div>'
                 + '</div>';  
  $('#HTMLoutput').append(itemHeader);


  // ------------------------------------------- Items Values -------------------------------------------
  
  
  // creating the item value row
  var itemFields = '<div class="row">'
 
                   // create item areas with the type and id (since that stuff isn't in the editable areas) 
                   + '<div class="col-1"><div class="col-12">'+objItemID+'</div></div>'

                   // creating the input boxes in the item row  
                   + '<div class="col-4"><input class="col-12" type="text" placeholder="'+objItemName+'"></div>'
                   + '<div class="col-6"><input class="col-12" type="text" placeholder="'+objItemDesc+'"></div>'
                   + '<div class="col-1"><input class="col-12" type="text" placeholder="'+objItemTags+'"></div>'
                 // closing item row
                 + '</div>';
  $('#HTMLoutput').append(itemFields);

  // making the Update Button
  var updateButton = '<div class="row">'
                    +  '<div class="col-11"></div>'
                    +  '<div class="col-1"><button>Update</button></div>'
                   + '</div>';
   $('#HTMLoutput').append(updateButton);


  // use objItemID (and the other ones) to get data out of the JSON file that create and fill in the input boxes











  console.log("Exiting outputHTML()");
}
