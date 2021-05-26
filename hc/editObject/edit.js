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
    headerHTML += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // H1 header to let the user know which object they're editing
  headerHTML += '<h1>Edit '+objType+' Item</h1>'
            + '</div>';
  $('#HTMLoutput').append(headerHTML);


  // -------------------------------------------------- Items Header --------------------------------------------------


  // creating items header row
  var itemHeader = '<div class="row">';

  // This is INCORRECT, using the ID is only going to work when the ID is equal to the position in the array
  for (const [headerKey, headerValue] of Object.entries(objTypeData[objItemid])) {
    // console.log("This is headerKey: ", headerKey);
    // console.log("This is headerValue: ", headerValue);
    itemHeader += '<div class="col-4">'
                  + '<div class="col-12">'+headerKey+'</div>'
                  + '<br><input class="col-12" type="textarea" placeholder="'+headerValue+'">'
                + '</div>';
  }
  // closing item header row
  itemHeader += '</div>';
  $('#HTMLoutput').append(itemHeader);

  // -------------------------------------------------- Items Values --------------------------------------------------
  
  console.log("objTypeData is: ", objTypeData)
  var n = objTypeData.editable.includes("name");
  console.log("Is n in the array...?", n);


  // creating the item value row
  var itemFields = '<div class="row">'
 
                 // for (every item in the objType list) {
                   // if (the objItem is in the editable list) 
                   // {
                     // make it an input textbox
                   // }
                   // else
                   // {
                     // make it a regular div
                   // }
                 // }

                   // creating item area
                   + '<div class="col-1"><div class="col-12">'+objItemid+'</div></div>'

                   // creating item input boxes
                   + '<div class="col-2"><input class="col-12" type="textarea" placeholder="'+objItemname+'"></div>'
                   + '<div class="col-2"><input class="col-12" type="textarea" placeholder="'+objItemdescription+'"></div>'

                   // creating item area
                   + '<div class="col-2"><div class="col-12">'+objItemstatus+'</div></div>'

                   //  creating item input box
                   + '<div class="col-2"><input class="col-12" type="textarea" placeholder="'+objItemtags+'"></div>'

                   //  creating item areas
                   + '<div class="col-2"><div class="col-12">'+objItemdueDate+'</div></div>'
                   + '<div class="col-1"><div class="col-12">'+objItemestEff+'</div></div>'

                 // closing item value row
                 + '</div>';
  // $('#HTMLoutput').append(itemFields);

  // making the Update Button
  var updateButton = '<div class="row">'
                    +  '<div class="col-11"></div>'
                    +  '<div class="col-1"><button>Update</button></div>'
                   + '</div>';
   $('#HTMLoutput').append(updateButton);


  // use objItemID (and the other ones) to get data out of the JSON file that create and fill in the input boxes











  console.log("Exiting outputHTML()");
}
