$(document).ready(function(){
  // outputHTML();
  doTheStrings();
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


// gets data from GitHub according to the URL's type
const typeData = async () => {
  var typeVars = await fetch("../tempData/"+objType+".json").then(response=>{return response.json();});
  return typeVars;
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
  addToLocalStorage(superKey, backToString);
}


// -------------------------------------------- Clear localStorage --------------------------------------------


// type "clr()" in the console or use this function within another to clear localStorage
function clr() {
  localStorage.clear();
}


// -------------------------------------------- Check localStorage --------------------------------------------


// function that searches the localStorage to see if the value already exists
function checkLocalStorage(check) {

  var objItem = {};
  var objectKeys = objType + '_' + objItemid;

  if (localStorage.getItem(objectKeys) != null) {
    // console.log("This is localStorage.getItem(objectKeys)", localStorage.getItem(objectKeys));
    var forOfLoop = JSON.parse(localStorage.getItem(objectKeys));
    console.log("objectKeys exists..!");
    // console.log(localStorage);

    // pull item from localStorage
    localStorage.getItem(objType+'_'+objItemid);

    console.log(localStorage);

    // create HTML header and fields
  }
  else {
    var forOfLoop = check.objTypeData[objItemid];
    console.log("objectKeys was just created..!");
    var repositoryItem = check.data[objType];
    // console.log("This is the repositoryItem..", repositoryItem);
    // console.log("This is repositoryItem[0]", repositoryItem[0]);

    //   pull item from repository (get item by using "var objTypeData = data[objType]";)

    //   if object id is equal to the one im searching for
    for(const[repositoryKey, repositoryValue] of Object.entries(check.data[objType])) {
      // console.log("This is repositoryKey: ", repositoryKey); // this is the id number 
      // console.log("This is repositoryValue: ", repositoryValue); // this is the object
      if (objType+'_'+repositoryKey == objectKeys) {
        objItem = repositoryItem[repositoryKey];
        // console.log("This is objItem: ", objItem);
        var objItemString = JSON.stringify(objItem);
        // console.log("This is objItemString: ", objItemString);
        addToLocalStorage(objectKeys, objItemString);
        console.log(localStorage);
      }
    }
  }
  // this is either coming from localStorage or from the 
  return forOfLoop;
}


// -------------------------------------------- Add To localStorage --------------------------------------------


// function that adds a new item to localStorage
function addToLocalStorage(position, value) {
  localStorage.setItem(position, value);
}


// ------------------------------------------------- Stringify -------------------------------------------------


// runs when the document.ready function is ready
const doTheStrings = async () => {

  var arrayFields = [];
  var arrayOfOptions = [];
  var arrayOfOptionsNames = [];
  var statusOptions = [];


  if(objType == null || objItemid == null) {
    alert('Enter "?type=task&itemid=0" at the end of the current URL');
  }
  else {
    var data = await tempData();
    var config = await configData();
    var type = await typeData();
    var objTypeData = data[objType];
    var tagTypeData = data['tags']; // objTypeData specifically for tags
    var configTypeData = config[objType];
    console.log("This is type: ", type);

    var checkLocalStorageParams = {
      data : data,
      objTypeData : objTypeData
    };

    // filling arrayOfOptions[]
    var tagData = data.tags;
    console.log("This is tagData (data.tags): ", tagData);
    

    // -------------------------------------------- Navigation Bar --------------------------------------------


    var HTMLoutput = '<div id="contacts">'
    + '<div class="row">'
      + '<p id="header" class="col-12">'
        + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="80">';
    
    // creating the links for the header
    for(const [headerKey, headerValue] of Object.entries(data)) {
      HTMLoutput += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
    }
  
    // closing header row
    HTMLoutput += '</p>';

    // H1 header to let the user know which object they're editing
    HTMLoutput += '<h1>Edit '+objType+' Item</h1>'
              + '</div>';

    var forOfLoop = checkLocalStorage(checkLocalStorageParams);


    // --------------------------------------- Item Header and Inputs ---------------------------------------


    // creating item header row
    HTMLoutput += '<div class="row">';

    // create HTML header and fields
    for (const [headerKey, headerValue] of Object.entries(forOfLoop)) {
      // headerKey: id, name, ... tags
      // headerValue: 1, COI: Static Site HTML Structure, ... [0]
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

        var typeHeader = type[headerKey];

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

          if (stuffKey == "inpType") {
            // stuffValue: text, textarea, text, array, date, number

            // filling arrayOfOptions
            if (stuffValue == 'array') {

              // console.log("The information lines up..");
              for (const [tagKey, tagValue] of Object.entries(headerValue)) {
                // console.log("This is tagKey: ", tagKey); // positions in array
                // console.log("This is tagValue: ", tagValue); // values in those positions
                arrayOfOptions.push(tagValue);
              }
              
              // Taking info from arrayOfOptions and using them to get the names from the list
              for (const [tagTypeKey, tagTypeValue] of Object.entries(tagTypeData)) {
                // console.log("This is tagTypeKey: ", tagTypeKey); // 0, 1, 2
                // console.log("This is tagTypeValue: ", tagTypeValue); // object 0, object 1, object 2
                // console.log("This is tagTypeValue['name']: ", tagTypeValue['name']);
                arrayFields.push(tagTypeValue['name']);
                // console.log("This is arrayFields: ", arrayFields);

                // filling arrayOfOptionsNames with tag names if arrayOfOptions includes the tag's ID number
                if (arrayOfOptions.includes(tagTypeValue['id'])) {
                  arrayOfOptionsNames.push(tagData[tagTypeValue['id']].name);
                }
              }
              // console.log("This is arrayOfOptionsNames: ", arrayOfOptionsNames);

            }

            var parameters = {
              sVal : stuffValue,  // text, textarea, array, ...
              hKey : headerKey, // id, name, description, ...
              hVal : headerValue,  // 1, COI: Static Site HTML Structure, ...
              fields : arrayFields,
              options: arrayOfOptions, // 0,1
              names: arrayOfOptionsNames, // Design Wireframes, Code Structure & Style
              scripts : "scripts",
              statOpts : statusOptions,
              data : data
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












// ----------------------------------------------- Input Function -----------------------------------------------


// takes the inpType and sends new parameters to the proper function
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
    newNames: params.names,
    newData : params.data
  };
  var optParams = {
    newHKey : params.hKey,
    newHVal : params.hVal,
    newStatOpts : params.statOpts,
    newFields : params.fields
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
    return selectAttribute(optParams);
  }
}


// ----------------------------------------------- Text Attribute -----------------------------------------------


function textAttribute(text) {
  var textHTML = '';

  textHTML  +='<div class="col-12">'
              + '<form action="#" method="post" class="demoForm">'
                + '<fieldset class="minHeight">'
                  + '<legend>'+text.newHKey+'</legend>'
                  + '<input type="text" class="col-12 textInput" id="input'+text.newHKey+'" value="'+text.newHVal+'" placeholder="'+text.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
                + '</fieldset>'
              + '</form>'
            + '</div>';

  return textHTML;
}


// --------------------------------------------- Textarea Attribute ---------------------------------------------


function textareaAttribute(textarea) {
  var textareaHTML = '';

  textareaHTML  +='<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+textarea.newHKey+'</legend>'
                      + '<textarea class="textareaInput" id="input'+textarea.newHKey+'" placeholder="'+textarea.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()" rows="6" cols="20">'+textarea.newHVal+'</textarea>'
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
  var myObjectStatus = myObject[options.newHKey]; // Not Started/In-Progress/Complete

  selectHTML  +='<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+options.newHKey+'</legend>'
                    + '<select id="input'+options.newHKey+'" name="'+options.newHKey+'" value="optionDisp" onchange="selectedOption(this.name)">';

  for (const [varsKey, varsValue] of Object.entries(options.newStatOpts[0])) {

    // checking if the option is the one existing in the localStorage... if it is then it puts the 'selected' attribute in the tag
    if (varsValue == myObjectStatus) {
      selectHTML      +='<option value="'+varsValue+'" selected>'+varsValue+'</option>';
    }
    else {
      selectHTML      +='<option value="'+varsValue+'">'+varsValue+'</option>';
    }
  }
  selectHTML        +='</select>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return selectHTML;
}

// updates localStorage when a new option is selected
function selectedOption(str) {
  var selected = $('#inputstatus').find(':selected').text();
  var superKey = objType+ '_' +objItemid;
  var myString = localStorage.getItem(superKey);
  var myObject = JSON.parse(myString);
  var change = selected;
  myObject[str] = change;
  backToString = JSON.stringify(myObject);
  addToLocalStorage(superKey, backToString);
  console.log("status is now", change);
  
}


// ------------------------------------------------ Number Attr ------------------------------------------------


function numberAttribute(num) {
  var numberHTML = '';

  numberHTML  +='<div class="col-12">'
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

  calendarHTML  +='<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+date.newHKey+'</legend>'
                      + '<input type="date" id="input'+date.newHKey+'" value="'+date.newHVal+'" name="'+date.newHKey+'" onchange="newDate(this.name)">'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

  return calendarHTML;
}

// updates localStorage when a new date is selected
function newDate(date) {
  var selected = $('#inputdueDate').val();
  var superKey = objType+ '_' +objItemid;
  var myString = localStorage.getItem(superKey);
  var myObject = JSON.parse(myString);
  var change = selected;
  myObject[date] = change;
  backToString = JSON.stringify(myObject);
  addToLocalStorage(superKey, backToString);
  console.log("dueDate is now ", change);
  
}


// ------------------------------------------------- Array List -------------------------------------------------


function arrayList(array) {
  
  // console.log("This is the input for arrayList(array): ", array);

  var HTMLoutput = '';
  var HTMLarrayValues = '';
  var objTypeID = objType+'_'+objItemid;
  var tagNumbers = [];
  var tagNames = [];
  var tagObj = {};

  HTMLoutput  +='<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+array.newHKey+'</legend>'
                      + '<div id="outerDiv">'
                        + '<div id="appendTo">';

  // fill up array, tagNumbers, with tag numbers
  for (const [arrayKey, arrayValue] of Object.entries(JSON.parse(localStorage.getItem(objTypeID)))) {
    // console.log("This is arrayKey: ", arrayKey); // id, name, description, status, ...
    // console.log("This is arrayValue: ", arrayValue); // 1, COI: Static Site HTML Structure, This task creates the structure of the Static site, ...
    if (arrayKey == 'tags') {
      for (const [tagKey, tagValue] of Object.entries(arrayValue)) {
        tagNumbers.push(tagValue);
      }
    }
  }

  // if tag number array includes the tag number, display the tag name
  for (const [arrayKey, arrayValue] of Object.entries(array.newData.tags)) {
    if (tagNumbers.includes(arrayValue.id)) {
      tagNames.push(arrayValue.name);
    }
  }

  // filling tagObj with two arrays: tagNumbers and tagNames
  tagNumbers.forEach((key, i) => tagObj[key] = tagNames[i]);

  // showing all the items in the arrayOfOptionsNames array (none if the array is preset as empty)
  for (const[arrayKey, arrayValue] of Object.entries(tagObj)) {
    HTMLarrayValues       +='<div class="row"><div class="col-10">'+arrayValue+'</div><div class="col-2"><input type="button" id="remvBtn_'+arrayKey+'" value="-" onclick="removeFunction(this)"></div></div>';
    // counts up the indices if there's any preset values in the array
  }
  
  // creating the select tag
  HTMLoutput += HTMLarrayValues
                        + '</div>'
                      + '</div>'
                      + '<br><select id="scripts" name="scripts">';

  // creating all the options from the arrayOfOptions array in the select tag
  for (const [optionKey, optionValue] of Object.entries(array.newData.tags)) {
    if (optionKey in tagObj) {
      HTMLoutput          +='<option id="optionValue_'+optionValue.id+'" value="'+optionValue.name+'">'+optionValue.name+'</option>';
    }
    else {
      HTMLoutput          +='<option id="optionValue_'+optionValue.id+'" value="'+optionValue.name+'" selected>'+optionValue.name+'</option>';
    }
    
  }

  // closing the form tags and creating the add button
  HTMLoutput          +='</select>'
                      + '<div id="buttonSpot">'
                      + '<input type="button" id="showTxt" value="Add" onclick="addFunction()"/>'
                    + '</div>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return HTMLoutput;
}


// ------------------------------------------------ Add function ------------------------------------------------


// part of the arrayList function that will add whatever is the selected option to localStorage
function addFunction() {
  var objTypeID = objType+'_'+objItemid;
  var tagList = [];

  // setting localObj equal to localStorage.getItem(task_0/task_1/task_2/ ...)
  var localObj = JSON.parse(localStorage.getItem(objTypeID));
  var select = document.getElementById('scripts');

  // getting the number from the id of the selected option
  elementVal = select.options[select.selectedIndex].id.replace(/optionValue_/, '');

  tagList = JSON.parse(localStorage.getItem(objTypeID)).tags;
  console.log("This is tagList: ", tagList);

  if (tagList.includes(Number(elementVal))) {
    console.log("tagList already includes", elementVal);
  }
  else {
    tagList.push(Number(elementVal));
    tagList.sort();
    JSON.stringify(tagList);
    localObj.tags = tagList;
    console.log("This is the localObj with updated tags: ", localObj);
    localStorage.setItem(objTypeID, JSON.stringify(localObj));
  }
  location.reload();
}


// ----------------------------------------------- Remove function -----------------------------------------------


// removes an item from localStorage and reloads the window which regenerates the display area
function removeFunction(val) { // val is the entire remove button
  var objTypeID = objType+'_'+objItemid;

  // removing all the text from the remove button's id
  var valIDNum = val.id.replace(/remvBtn_/, '');
  // console.log("This is valIDNum: ", valIDNum);
  var localObj = JSON.parse(localStorage.getItem(objTypeID));
  // console.log("This is localObj: ", localObj);
  
  localObjTags = localObj.tags;
  // console.log("This is localObjTags: ", localObjTags);

  // console.log("This is the index of valIDNum: ", localObjTags.indexOf(Number(valIDNum)));
  localObjTags.splice(localObjTags.indexOf(Number(valIDNum)), 1);
  // console.log("This is the updated localObjTags: ", localObjTags);

  localObj.tags = localObjTags;
  // console.log("This is localObj now: ", localObj);

  localStorage.setItem(objTypeID, JSON.stringify(localObj));

  location.reload();
}