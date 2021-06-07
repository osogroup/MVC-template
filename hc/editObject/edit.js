$(document).ready(function(){
  // outputHTML();
  doTheStringify();
});

// pull in data from objectList.JSON and configuration JSON file 
const configData = async () => {
  var listConfig = await fetch("../tempData/objectConfig.json").then(response=>{return response.json();});
  return listConfig;
}
  
  // gets all the Objects/Arrays from listOfObjects.json and returns them
const tempData = async () => {
  var objVars = await fetch("../tempData/listOfObjects.json").then(response=>{return response.json();});
  return objVars;
}

const typeData = async () => {
  var typeVars = await fetch("../tempData/"+objType+".json").then(response=>{return response.json();});
  return typeVars;
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



  console.log(objTypeData[objItemid]);

  // This is INCORRECT, using the ID is only going to work when the ID is equal to the position in the array
  for (const [headerKey, headerValue] of Object.entries(objTypeData[objItemid])) {

    console.log("This is the objTypeData.id: ", objTypeData.id);
    // TOGGLE THIS TO PULL INFO FROM THE LIST PAGE*************************
    // localStorage.setItem(objType+headerKey+objTypeData.id, headerValue);
    console.log("This is headerKey: ", headerKey);
    console.log("This is headerValue: ", headerValue);
    
    // creating each object item column
    itemHeader += '<div class="col-4 minHeight">'
                  + '<div class="col-12">'+headerKey+'</div>'; 

   
  // -------------------------------------------------- Item Values --------------------------------------------------


    // checking to see if the headerKey is in the editable array (in objectConfig.json)
    if (configTypeData.editable.includes(headerKey) == true)
    {
      // making object item an input textbox
      itemHeader += '<br><input class="col-12" id="input'+headerKey+'" type="textarea" value="'+localStorage.getItem(headerKey)+'" placeholder="'+headerKey+'" oninput="anyChange(this.placeholder)">';
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


// function that is called when the Update button is pressed, it displays 
// the value that is being edited in the console
function showValue() {
  var superKey = objType+ '_' +objItemid;
  var superObject = JSON.parse(localStorage.getItem(superKey));
  console.log(superObject);
}


// function that is called when you blur a textbox, I use this in my onchange
// attribute so I don't see the console log until I click away from an input
function showData() {
  console.log(localStorage);
}


// function that is linked to the oninput attribute in the input box, every time
// the value in the box is changed, this function will update the localStorage
function anyChange(str) {
  var superKey = objType+ '_' +objItemid;
  // console.log("This is the str: ", str);
  var myString = localStorage.getItem(superKey);
  // console.log("This is myString", myString);
  var myObject = JSON.parse(myString);
  // console.log("This is myObject: ", myObject);
  var change = document.getElementById('input'+str);
  var changeValue = change.value;
  myObject[str] = changeValue;
  // console.log("this is myObject[str]", myObject[str]);
  backToString = JSON.stringify(myObject);
  // console.log("This is backToString ", backToString);
  localStorage.setItem(superKey, backToString);
}

var statusOptions = [];

const doTheStringify = async () => {

  var arrayFields = [ 'Ron', 'John', 'James' ];
  var arrayOfOptions = [];
  var arrayOfOptionsNames = [];

  if(objType == null || objItemid == null) {
    alert('Enter "?type=task&itemid=0" at the end of the current URL');
  }
  else {
    var data = await tempData();
    var config = await configData();
    var typeStuff = await typeData();
    var objTypeData = data[objType];
    var tagTypeData = data['tags']; // objTypeData specifically for tags
    var configTypeData = config[objType];
    console.log("This is typeStuff: ", typeStuff);

    // filling arrayOfOptions[]
    var tagData = data.tags;
    console.log("This is tagData: ", tagData);
    

    // Something that gets the values from the array in task => tags so I'll know which tags.name to include
    // for (const [tagKey, tagValue] of Object.entries(tagData[0][1])) {
    //   // console.log("This is tagKey: ", tagKey); // (0, 1, 2)
    //   // console.log("This is tagValue: ", tagValue); // (object 0, object 1, object 2)
    //   for (const [innerKey, innerValue] of Object.entries(tagValue)) {
    //     console.log("This is innerKey: ", innerKey); 
    //     console.log("This is innerValue: ", innerValue);
    //     if (innerKey == 'name') {
    //       arrayOfOptions.push(innerValue);
    //     }
    //   }
    // }



    // -------------------------------------------- Navigation Bar --------------------------------------------


    var HTMLoutput = '<div id="contacts">'
    + '<div class="row">'
      + '<p id="header" class="col-12">'
        + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="50">';
    
    // creating the links for the header
    for(const [headerKey, headerValue] of Object.entries(data)) {
      HTMLoutput += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
    }
  
    // closing header row
    HTMLoutput += '</p>';

    // H1 header to let the user know which object they're editing
    HTMLoutput += '<h1>Edit '+objType+' Item</h1>'
              + '</div>';

    var objectKeys = objType + '_' + objItemid;
    // console.log("This is objectKeys: ", objectKeys);
    var objItem = {};

    // if item exists 
    if (localStorage.getItem(objectKeys) != null) {
      // console.log("This is localStorage.getItem(objectKeys)", localStorage.getItem(objectKeys));
      var forOfLoop = JSON.parse(localStorage.getItem(objectKeys));
      console.log("objectKeys exists..!");
      // console.log(localStorage);

      // pull item from localStorage
      localStorage.getItem(objType+'_'+objItemid);

      // create HTML header and fields
    }
    else {
      var forOfLoop = objTypeData[objItemid]
      console.log("objectKeys was just created..!");
      var repositoryItem = data[objType];
      // console.log("This is the repositoryItem..", repositoryItem);
      // console.log("This is repositoryItem[0]", repositoryItem[0]);

      //   pull item from repository (get item by using "var objTypeData = data[objType]";)

      //   if object id is equal to the one im searching for
      for(const[repositoryKey, repositoryValue] of Object.entries(data[objType])) {
        // console.log("This is repositoryKey: ", repositoryKey); // this is the id number 
        // console.log("This is repositoryValue: ", repositoryValue); // this is the object
        if (objType+'_'+repositoryKey == objectKeys) {
          objItem = repositoryItem[repositoryKey];
          // console.log("This is objItem: ", objItem);
          var objItemString = JSON.stringify(objItem);
          // console.log("This is objItemString: ", objItemString);
          localStorage.setItem(objectKeys, objItemString);
          console.log(localStorage);
        }
      }


      // --------------------------------------- Item Header and Inputs ---------------------------------------


    }
    // creating item header row
    HTMLoutput += '<div class="row">';

    // create HTML header and fields
    for (const [headerKey, headerValue] of Object.entries(forOfLoop)) {
      // console.log("This is headerKey", headerKey); // id, name, ... tags
      // console.log("This is headerValue", headerValue); // 1, COI: Static Site HTML Structure, ... [0]
      if (headerKey == 'id') {
        HTMLoutput += '<div class="col-4 minHeight">'
                      + '<div class="col-12">'+headerKey+'</div>';

      }
      else {
      HTMLoutput += '<div class="col-4 minHeight">';
                    // + '<div class="col-12">'+headerKey+'</div>';
      }
      

      if (configTypeData.editable.includes(headerKey) == true) {

        // making object item an input textbox


        var typeHeader = typeStuff[headerKey];
        
        // filling up the statusOptions array before calling selectAttribute()
        for (const [stuffKey, stuffValue] of Object.entries(typeHeader)) {
          if (headerKey == 'status' && stuffKey == 'opts') {
            statusOptions.push(stuffValue);
            // console.log("This is statusOptions: ", statusOptions);
          }

        }  

        for (const [stuffKey, stuffValue] of Object.entries(typeHeader)) {
          // console.log("This is stuffKey: ", stuffKey); // (required, type, inpType)
          // console.log("This is stuffValue: ", stuffValue); // (true, string, text)


            // #####################################################################################################################


          

          if (stuffKey == "inpType") {
            // stuffValue: text, textarea, text, array, date, number

            // filling arrayOfOptions
            if (stuffValue == 'array') {

              console.log("The information lines up..");
              for (const [tagKey, tagValue] of Object.entries(headerValue)) {
                // console.log("This is tagKey: ", tagKey); // positions in array
                // console.log("This is tagValue: ", tagValue); // values in those positions
                arrayOfOptions.push(tagValue);
              }
              // console.log("This is arrayOfOptions post-filled: ", arrayOfOptions);
              
              // Taking info from arrayOfOptions and using them to get the names from the list
              for (const [tagTypeKey, tagTypeValue] of Object.entries(tagTypeData)) {
                // console.log("This is tagTypeKey: ", tagTypeKey); // 0, 1, 2
                // console.log("This is tagTypeValue: ", tagTypeValue); // object 0, object 1, object 2
                console.log("This is tagTypeValue[id]: ", tagTypeValue['id']);

                // filling arrayOfOptionsNames with tag names if arrayOfOptions includes the tag's ID number
                if (arrayOfOptions.includes(tagTypeValue['id'])) {
                  arrayOfOptionsNames.push(tagData[tagTypeValue['id']].name);
                }
              }
              console.log("This is arrayOfOptionsNames: ", arrayOfOptionsNames);

            }

            var parameters = {
              sVal : stuffValue,  // text, textarea, array, ...
              hKey : headerKey, // id, name, description, ...
              hVal : headerValue,  // 1, COI: Static Site HTML Structure, ...
              fields : arrayFields,
              options: arrayOfOptions, // 0,1
              names: arrayOfOptionsNames, // Design Wireframes, Code Structure & Style
              scripts : "scripts"
            };
            HTMLoutput += inputFunction(parameters);
          }
        }
        
        // HTMLoutput += '<br><input class="col-12" id="input'+headerKey+'" type="textarea" value="'+headerValue+'" placeholder="'+headerKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">';
      }
      else
      {

        // making object item a regular div
        HTMLoutput += '<br><div class="col-12">'+headerValue+'</div>';
      }

      // closing object item column
      HTMLoutput += '</div>';
    }

    // closing item header row
    HTMLoutput += '</div>';

    // Update button that will activate a function that outputs the value to the console
    HTMLoutput += '<div class="row">';

    HTMLoutput += '<div class="col-10"></div>'
                + '<div class="col-2"><button onclick="showValue()">Update</button></div>';

    HTMLoutput += '</div>';

    $('#HTMLdiv').append(HTMLoutput);
  }
}


// ------------------------------------------------ Add function ------------------------------------------------


function addFunction(variable) {
  var select = document.getElementById('scripts');  

  var deletion = document.getElementById('appendTo');
  deletion.remove();

  // access text property of selected option
  elementVal = select.options[select.selectedIndex].text;
  arrayFields.push(elementVal);

  var tag = document.createElement('div');
  tag.setAttribute("id", "appendTo");
  var elm = document.getElementById("outerDiv");
  // console.log("This is elm: ", elm);
  elm.appendChild(tag);
  $('#appendTo').append(HTMLelement);
  

  // creating parameters for removeFunction *need arrayFields and count
  var removeFunctionParameters = {
  };

  // adding a new row and columns to the HTML
  var HTMLelement = '<div class="row"><div class="col-10">'+elementVal+'</div><div class="col-2"><input type="button" id="remvBtn'+variable.addCount+'" value="-" onclick="removeFunction('+i+')"></div></div>';
  $('#appendTo').append(HTMLelement);

  // adjusting indices
}


// ----------------------------------------------- Remove function -----------------------------------------------


function removeFunction(val) {
  var HTMLelement = '';
  console.log("This is removeFunction(val)'s parameters: ", val);
  // removing 1 value from arrayFields starting at index 'val'
  arrayFields.splice(val, 1);

  // getting a variable that represents whichever remove button I push on the browser (technically dont need
  // the specific id since the the value is deleted from arrayFields anyway and then arrayFields is ran through,
  // recreating the display)
  var element = document.querySelector('#remvBtn'+val);

  // deleting the entire div containing the arrayField values
  element.parentNode.parentNode.parentNode.remove(element.parentNode.parentNode.parentNode);
  for (const [elementKey, elementValue] of Object.entries(arrayFields)) {
    HTMLelement += '<div class="row"><div class="col-10">'+elementValue+'</div><div class="col-2"><input type="button" id="remvBtn'+elementKey+'" value="-" onclick="removeFunction('+elementKey+')"></div></div>';
  }
  // next 5 lines create a new div within outerDiv that has the id="appendTo"
  var tag = document.createElement('div');
  tag.setAttribute("id", "appendTo");
  var elm = document.getElementById("outerDiv");
  // console.log("This is elm: ", elm);
  elm.appendChild(tag);
  $('#appendTo').append(HTMLelement);

  console.log("This is arrayFields after .splice(): ", arrayFields);

  // adjusting indices for add function
}
























// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GOD %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


function inputFunction(params) {
  var newParams = {
    newHKey : params.hKey,
    newHVal : params.hVal
  };
  var arrayParams = {
    newHKey : params.hKey,
    newHVal : params.hVal,
    newScripts : params.scripts,
    newFields : params.fields,
    newNames: params.names
  };

  // options: arrayOfOptions, // 0,1

  if (params.sVal == "text") {
    return textAttribute(newParams);
  }
  if (params.sVal == "textarea") {
    return textareaAttribute(newParams);
  }
  if (params.sVal == "number") {
    return numberAttribute(newParams);
  }
  if (params.sVal == "date") {
    return calendarAttribute(newParams);
  }
  if (params.sVal == "array") {
    return arrayList(arrayParams);
  }
  if (params.sVal == "option") {
    return selectAttribute(newParams);
  }
}


// ----------------------------------------------- Text Attribute -----------------------------------------------


function textAttribute(text) {
  var textHTML = '';

  textHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+text.newHKey+'</legend>'
                    + '<input type="text" class="col-12 textInput" id="input'+text.newHKey+'" value="'+text.newHVal+'" placeholder="'+text.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
                    // + '<input type="textarea" class="col-12" id="input'+headerKey+'" value="'+headerValue+'" placeholder="'+headerKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return textHTML;
}


// --------------------------------------------- Textarea Attribute ---------------------------------------------


function textareaAttribute(textarea) {
  var textareaHTML = '';

  textareaHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+textarea.newHKey+'</legend>'
                    + '<textarea class="textareaInput" id="input'+textarea.newHKey+'" placeholder="'+textarea.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()" rows="3" cols="20">'+textarea.newHVal+'</textarea>'
     // + '<input type="textarea" class="col-12" id="input'+headerKey+'" value="'+headerValue+'" placeholder="'+headerKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return textareaHTML;
}


// ------------------------------------------------ Select Attr ------------------------------------------------


function selectAttribute(options) {
  var selectHTML = '';
  var superKey = objType+ '_' +objItemid;
  var myString = localStorage.getItem(superKey);
  var myObject = JSON.parse(myString);
  var myObjectStatus = myObject[options.newHKey]; // in-progress

  selectHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+options.newHKey+'</legend>'
                    + '<select id="input'+options.newHKey+'" name="'+options.newHKey+'" value="optionDisp" onchange="selectedOption(this.name)">';

  for (const [varsKey, varsValue] of Object.entries(statusOptions[0])) {

    // checking if the option is the one existing in the localStorage... if it is then it puts the 'selected' attribute in the tag
    if (varsValue == myObjectStatus) {
      selectHTML +=     '<option value="'+varsValue+'" selected>'+varsValue+'</option>';
    }
    else {
      selectHTML +=     '<option value="'+varsValue+'">'+varsValue+'</option>';
    }
  }
  selectHTML +=       '</select>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return selectHTML;
}

function selectedOption(str) {
  var selected = $('#inputstatus').find(':selected').text();
  var superKey = objType+ '_' +objItemid;
  var myString = localStorage.getItem(superKey);
  var myObject = JSON.parse(myString);
  var change = selected;
  myObject[str] = change;
  backToString = JSON.stringify(myObject);
  localStorage.setItem(superKey, backToString);
  console.log("status is now ", change);
  
}


// ------------------------------------------------ Number Attr ------------------------------------------------


function numberAttribute(num) {
  var numberHTML = '';

  numberHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+num.newHKey+'</legend>'
                    + '<input type="number" id="input'+num.newHKey+'" value="'+num.newHVal+'" placeholder="'+num.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
                  + '</fieldset>'
                + '</form>'
              + '</div>';
  return numberHTML;
}


// ----------------------------------------------- Calendar Attr -----------------------------------------------


function calendarAttribute(date) {
  var calendarHTML = '';

  calendarHTML += '<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+date.newHKey+'</legend>'
                      + '<input type="date" id="input'+date.newHKey+'" value="'+date.newHVal+'" name="'+date.newHKey+'" onchange="newDate(this.name)">'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

  return calendarHTML;
}

function newDate(date) {
  var selected = $('#inputdueDate').val();
  var superKey = objType+ '_' +objItemid;
  var myString = localStorage.getItem(superKey);
  var myObject = JSON.parse(myString);
  var change = selected;
  myObject[date] = change;
  backToString = JSON.stringify(myObject);
  localStorage.setItem(superKey, backToString);
  console.log("dueDate is now ", change);
  
}


// ------------------------------------------------- Array List -------------------------------------------------


function arrayList(array) {
  // if (!vars.existing || !vars.options || !vars.attrType){
  //   alert("vars has an empty array");
  //   return;
  // }
  console.log("This is the input for arrayList(array): ", array);

  var i = 0;
  var HTMLoutput = '';
  var HTMLarrayValues = '';

  HTMLoutput += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Tags</legend>'
                      + '<div id="outerDiv">'
                        + '<div id="appendTo">';

  // showing all the items in the arrayFields array (none if the array is preset as empty)
  for (const[arrayKey, arrayValue] of Object.entries(array.newFields)) {
  HTMLarrayValues +=    '<div class="row"><div class="col-10">'+arrayValue+'</div><div class="col-2"><input type="button" id="remvBtn'+arrayKey+'" value="-" onclick="removeFunction('+i+')"></div></div>';

  // counts up the indices if there's any preset values in the array (uncommon)
  i++;
  }
  HTMLoutput = HTMLoutput+HTMLarrayValues;
  // console.log("This is HTMLoutput: ", HTMLoutput);

  // creating the select tag
  HTMLoutput +=       '</div>'
                  + '</div>'
                +'<br><select id="scripts" name="scripts">';

  // creating all the options from the arrayOfOptions array in the select tag
  for (const [optionKey, optionValue] of Object.entries(array.newNames)) {
  HTMLoutput +=       '<option value="'+optionValue+'">'+optionValue+'</option>';
  }

  // closing the form tags and creating the add button
  HTMLoutput +=       '</select>'
                    + '<input type="button" id="showTxt" value="Add" onclick="addFunction('+array.newFields+')"/>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  // $('#arraySpot').append(HTMLoutput);

  return HTMLoutput;
}
