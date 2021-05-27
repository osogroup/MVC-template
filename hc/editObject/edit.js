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
  var configTypeData = config[objType];
  var objTypeData = data[objType];
  // console.log("This is the objTypeData: ", objTypeData);
  // var col = objTypeData[objItemid].length;
  // console.log("This is the col: ", col);


  // -------------------------------------------------- Navigation Bar --------------------------------------------------


  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
    + '<p id="header" class="col-12">'
      + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="50">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // H1 header to let the user know which object they're editing
  headerHTML += '<h1>Edit '+objType+' Item</h1>'
            + '</div>';
  $('#HTMLoutput').append(headerHTML);


  // -------------------------------------------------- Item Headers --------------------------------------------------


  // creating items header row
  var itemHeader = '<div class="row">';

  // This is INCORRECT, using the ID is only going to work when the ID is equal to the position in the array
  for (const [headerKey, headerValue] of Object.entries(objTypeData[objItemid])) {
    localStorage.setItem(headerKey, headerValue);
    // console.log("This is headerKey: ", headerKey);
    // console.log("This is headerValue: ", headerValue);
    
    // creating each object item column
    itemHeader += '<div class="col-4 minHeight">'
                  + '<div class="col-12">'+headerKey+'</div>';


  // -------------------------------------------------- Item Values --------------------------------------------------


    // checking to see if the headerKey is in the editable array (in objectConfig.json)
    if (configTypeData.editable.includes(headerKey) == true)
    {
      // making object item an input textbox
      itemHeader += '<br><input class="col-12" id="input'+headerKey+'" type="textarea" value="'+localStorage.getItem("headerValue")+'" placeholder="'+headerKey+'" oninput="addLocal(this.value)">';
    }
    else
    {
      // making object item a regular div
      itemHeader += '<br><div class="col-12">'+headerValue+'</div>';
    }

    // closing each object item column
    itemHeader += '</div>';
  }
  console.log(localStorage);
  // closing item header row
  itemHeader += '</div>';
  $('#HTMLoutput').append(itemHeader);


  // -------------------------------------------------- Update Button --------------------------------------------------


  var updateButton = '<div class="row">'
                    +  '<div class="col-11"></div>'
                    +  '<div class="col-1"><button>Update</button></div>'
                   + '</div>';
   $('#HTMLoutput').append(updateButton);

  //  localStorage.removeItem('');

  console.log("Exiting outputHTML()");
}
