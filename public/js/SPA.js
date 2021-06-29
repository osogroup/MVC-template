$(document).ready(function () {
  HTMLGenerate();
});


// gets all the Objects/Arrays from objectConfig.json and returns them
const configData = async () => {
  var listConfig = await fetch("/tempData/objectConfig.json").then(response => { return response.json(); });
  // console.log("configData output ", listConfig);
  return listConfig;
}

// gets all the Objects/Arrays from listOfObjects.json and returns them
const tempData = async () => {
  var objVars = await fetch("/tempData/listOfObjects.json").then(response => { return response.json(); });
  // console.log("tempData output ", objVars);
  return objVars;
}

// gets data from JSON file according to the URL's type
const typeData = async () => {
  var typeVars = await fetch("tempData/"+objType+".json").then(response=>{return response.json();});
  return typeVars;
}


// -------------------------------------------- Check localStorage --------------------------------------------


// function that searches the localStorage to see if the value already exists
function checkLocalStorage(check) {
  var objItem = {};
  var objectKeys = objType + '_' + objItemID;

  if (localStorage.getItem(objectKeys) != null) {
    // console.log("This is localStorage.getItem(objectKeys)", localStorage.getItem(objectKeys));
    var forOfLoop = JSON.parse(localStorage.getItem(objectKeys));
    console.log("objectKeys exists..!");
    // console.log(localStorage);
  }
  else {
    var forOfLoop = check.objTypeData[objItemID];
    console.log("objectKeys was just created..!");
    var repositoryItem = check.data[objType];

    //   if object id is equal to the one im searching for
    for(const[repositoryKey, repositoryValue] of Object.entries(check.data[objType])) {
      // repositoryKey this is the id number 
      // repositoryValue this is the object
      if (objType+'_'+repositoryKey == objectKeys) {
        objItem = repositoryItem[repositoryKey];
        // console.log("This is objItem: ", objItem);
        var objItemString = JSON.stringify(objItem);
        // console.log("This is objItemString: ", objItemString);
        addToLocalStorage(objectKeys, objItemString);
        // console.log(localStorage);
      }
    }
  }
  // this is either coming from localStorage or from the JSON file
  return forOfLoop;
}


// -------------------------------------------- Add To localStorage --------------------------------------------


// function that adds a new item to localStorage
function addToLocalStorage(position, value) {
  localStorage.setItem(position, value);
}


// -------------------------------------------- List Remove Function --------------------------------------------


function listRemoveFunction(btn) {
  // console.log("This is the row's ID number:",btn.parentNode.parentNode.querySelector('.id').innerText);
  console.log("Removed ID",btn.parentNode.parentNode.querySelector('.id').innerText)
  btn.parentNode.parentNode.remove(btn.parentNode.parentNode);
}


// ------------------------------------------------ ID Generator ------------------------------------------------


const generateID = async () => {
  var data = await tempData();
  if(objType) {
    var objTypeData = data[objType];
    var i = 0;
    for(const [idKey, idValue] of Object.entries(objTypeData)) {
      i++;
    }
    return i;
  }
}


// ------------------------------------------------ Capitalizer ------------------------------------------------


function capitalize(name) {
  var newName = name[0].toUpperCase()+name.substring(1);
  return newName;
}


// gathers, sorts, and organizes all the Objects and data from the JSON files, generates HTML, and appends it to #TitleOfList in index.html
const HTMLGenerate = async () => {

  var data = await tempData();
  var config = await configData();
  var IDGen = await generateID();

  if(!objType) {
    console.log("There is no Object Type...");

    var noObjectType  = '<div id="contacts">'
                    + '<div class="row">'
                      + '<p id="header">'
                        + '<img id="imageSpacing" src="/images/MindfulMeasuresLogo.png" alt="LogoImage" width="80">';

    // creating the links for the header
    for (const [headerKey, headerValue] of Object.entries(data)) {
      noObjectType        +='<a class="headerLinks" href="/?type='+headerKey+'&value=list">' + capitalize(headerKey)+ '</a>';
    }

    noObjectType      +='</p>'
                    + '<h1>OAS Object List</h1>'
                  + '</div>'
                + '</div>';
    $('#TitleOfList').append(noObjectType);
    return;
  }
  
  console.log("Entering HTMLGenerate()");


  // --------------------------------------------- Navigation Bar ---------------------------------------------


  var headerHTML  = '<div id="contacts">'
                    + '<div class="row">'
                      + '<p id="header">'
                        + '<img id="imageSpacing" src="/images/MindfulMeasuresLogo.png" alt="LogoImage" width="80">';

  // creating the links for the header
  for (const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML          +='<a class="headerLinks" href="/?type='+headerKey+'&value=list">' + capitalize(headerKey) + '</a>';
  }

  headerHTML          +='</p>'
                      + '<h1>OAS Object List</h1>'
                    + '</div>'
                  + '</div>';
  $('#TitleOfList').append(headerHTML);

  // console.log("objType in HTMLGenerate() ", objType);

  // creating object row
  var inputThings = '<div class="row hacker-list">'
    + '<div class="col-12">';

  // getting Object names and data
  // for (const [key, val] of Object.entries(data)) {

  // displaying Object Name
  var tHeader = inputThings + '<a href="/?type='+objType+'&itemid='+IDGen+'&value=create"><button style="border-radius:10px;">Create Item</button></a><h1>' + capitalize(objType) + '</h1>';

  // creating sortable list library container 
  tHeader += '<div id="' + objType + 'Container">';

  // creating table input Row
  tHeader += '<div class="inputBoxes row">';

  // setting object type configuration
  var objTypeConfig = config[objType];

  // setting table column width for each object type
  var col = 12 / (objTypeConfig.list.length);

  tHeader += '</div>';


  // ------------------------------------------ The Search Box ------------------------------------------


  // creating the search box and designating its own row
  var searchVariable = '<div class="searchBox row">'
    + '<div class="col-4">'
    + '<input class="search" style="border-radius:10px;" placeholder="Search"/>'
    + '</div>'
    + '</div>';


  // ----------------------------------------- The Table Headers -----------------------------------------

  
  // opening table header row and adding The Search Box to tHeader
  tHeader += searchVariable + '<div class="tableHeader row">';

  // creating table header from list configuration
  for (const [listKey, listValue] of Object.entries(objTypeConfig.list)) {
    if (listValue == 'id') {
      tempColumn = col - 2;
    } else {
      tempColumn = col;
    }

    // creating table header HTML
    tHeader += '<div class="col-' + tempColumn + ' sort touchBox" data-sort="' + listValue + '"><span class="innerSpan"><strong>'+ capitalize(listValue) + '</strong></span></div>';
  }

  // closing the header row
  tHeader += '</div>';


  // ---------------------------------------------- Item Rows ----------------------------------------------


  var objItems = tHeader;

  // containing list items
  objItems += '<div class="inputValues list">';

  // getting item attributes
  // console.log("THIS IS MY FOCUS", data[objType]);
  for (const [SLKey, SLValue] of Object.entries(data[objType])) {

    // creating the object item rows
    objItems += '<div class="row">';

    // getting list configuration
    for (const [firstKey, firstValue] of Object.entries(objTypeConfig.list)) {

      if (firstValue == "id") {
        var tempCol = col - 2;
      } else {
        var tempCol = col;
      }
      // create item columns in HTML
      objItems += '<div class="col-' + tempCol + '"><span class="' + firstValue + '">' + SLValue[firstValue] + '</span></div>';
    }


    // ------------------------------------------ Edit Button URL ------------------------------------------


    // creating edit buttons
    objItems += '<div class=col-1>'
      + '<a href="/?type=' + objType + '&itemid=' + SLValue.id + '&value=edit">'
      + '<button class="edit-item-btn" style="border-radius:10px;"> Edit </button>'
      + '</a>'
      + '</div>'
      + '<div class=col-1>'
      + '<button class="remove-item-btn" style="border-radius:10px;" onclick="listRemoveFunction(this)"> Remove </button>'
      + '</div>';

    // closing object item row
    objItems += '</div>';
  }

  // closing list items
  objItems += '</div>';

  // closing sortable list library container
  objItems += '</div>';

  // append each entire item row to index.html as it loops
  $('#TitleOfList').append(objItems);

  // valueNames instantiation
  var options = {
    valueNames: []
  };

  // adding object list to valueNames for sortability
  for (const [sortKey, sortValue] of Object.entries(objTypeConfig.list)) {
    options.valueNames.push(sortValue);
  }

  // Init list ** VERY IMPORTANT, DO NOT DELETE **
  var contactList = new List(objType+'Container', options);

  // closing each id=hacker-list div
  $('#TitleOfList').append('</div>');

  console.log("Exiting HTMLGenerate()... Buttons ready");
}

if (URLValue == 'edit') {
  $(document).ready(function(){
    doTheStrings();
  });
  
  
  // function that is called when the Update button is pressed, it displays 
  // the value that is being edited in the console
  function showValue() {
    var superKey = objType+ '_' +objItemID;
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
    var superKey = objType+ '_' +objItemID;
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


  // ------------------------------------------------- Stringify -------------------------------------------------


  // runs when the document.ready function is ready
  const doTheStrings = async () => {

    var arrayFields = [];
    var arrayOfOptions = [];
    var arrayOfOptionsNames = [];
    var statusOptions = [];


    if(objType == null || objItemID == null) {
      alert('Enter "?type=task&itemid=0" at the end of the current URL');
    }
    else {
      var data = await tempData();
      var config = await configData();
      var type = await typeData();
      var objTypeData = data[objType];
      var tagTypeData = data['tags']; // objTypeData specifically for tags
      var configTypeData = config[objType];
      // console.log("This is type: ", type);

      var checkLocalStorageParams = {
        data : data,
        objTypeData : objTypeData
      };

      // filling arrayOfOptions[]
      var tagData = data.tags;
      // console.log("This is tagData (data.tags): ", tagData);
      

      // -------------------------------------------- Navigation Bar --------------------------------------------


      var HTMLoutput = '<div id="contacts">'
      + '<div class="row">'
        + '<p id="header">'
          + '<img id="imageSpacing" src="images/MindfulMeasuresLogo.png" alt="LogoImage" width="80">';
      
      // creating the links for the header
      for(const [headerKey, headerValue] of Object.entries(data)) {
        HTMLoutput += '<a class="headerLinks" href="/?type='+headerKey+'&value=list">'+headerKey.toUpperCase()+'</a>';
      }
    
      // closing header row
      HTMLoutput += '</p>';

      // H1 header to let the user know which object they're editing
      HTMLoutput += '<h1>Edit '+capitalize(objType)+' Item</h1>'
                + '</div>';

      var forOfLoop = checkLocalStorage(checkLocalStorageParams);


      // --------------------------------------- Item Header and Inputs ---------------------------------------


      // (((((((((((((((((((((((((((((((((((((creating item header row)))))))))))))))))))))))))))))))))))))

      HTMLoutput += '<div class="row">'; 
      // create HTML header and fields
      for (const [headerKey, headerValue] of Object.entries(forOfLoop)) {
        // console.log("This is headerKey:",headerKey); // id, name, ... tags
        // console.log("This is headerValue:",headerValue); // 1, COI: Static Site HTML Structure, ... [0]
        if (headerKey == 'id') {
          HTMLoutput += '<div class="col-4 minHeight">'
                        + '<div class="col-12">'+headerKey.toUpperCase()+'</div>';

        }
        else {
          HTMLoutput += '<div class="col-4 minHeight">';
        }
        
        if (configTypeData.editable.includes(headerKey) == true) {

          // making object item an input textbox

          var typeHeader = type[headerKey];
          // console.log("This is typeHeader:",typeHeader);

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
              HTMLoutput += myInputFunction(parameters);
              // console.log("This is myInputFunction:", myInputFunction(parameters));
              // console.log("This is parameters.sVal:",parameters.sVal);
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
                  + '<div class="col-2"><button style="border-radius:10px;" onclick="showValue()">Update</button></div>';

      HTMLoutput += '</div>';

      $('#HTMLdiv').append(HTMLoutput);
    }
  }
  
  
  // ----------------------------------------------- Input Function -----------------------------------------------


  // takes the inpType and sends new parameters to the proper function
  function myInputFunction(myParams) {
    // console.log("myParams.sVal is",myParams.sVal);
    var newParams = {
      newHKey : myParams.hKey,
      newHVal : myParams.hVal
    };
    var arrayParams = {
      newHKey : myParams.hKey,
      newHVal : myParams.hVal,
      newScripts : myParams.scripts,
      newFields : myParams.fields,
      newNames: myParams.names,
      newData : myParams.data
    };
    var optParams = {
      newHKey : myParams.hKey,
      newHVal : myParams.hVal,
      newStatOpts : myParams.statOpts,
      newFields : myParams.fields
    };

    // options: arrayOfOptions, // 0,1

    if (myParams.sVal == "text") {
      return textAttribute(newParams);
    }
    if (myParams.sVal == "textarea") {
      return textareaAttribute(newParams);
    }
    if (myParams.sVal == "number") {
      return numberAttribute(newParams);
    }
    if (myParams.sVal == "date") {
      return calendarAttribute(newParams);
    }
    if (myParams.sVal == "array") {
      return arrayList(arrayParams);
    }
    if (myParams.sVal == "option") {
      return selectAttribute(optParams);
    }
  }


  // ----------------------------------------------- Text Attribute -----------------------------------------------


  function textAttribute(text) {
    var textHTML = '';

    textHTML  +='<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+capitalize(text.newHKey)+'</legend>'
                    + '<input type="text" class="col-12 textInput" id="input'+text.newHKey+'" style="border-radius:10px;" value="'+text.newHVal+'" placeholder="'+text.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
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
                        + '<legend>'+capitalize(textarea.newHKey)+'</legend>'
                        + '<textarea class="col-11" id="input'+textarea.newHKey+'" style="border-radius:10px;" placeholder="'+textarea.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'+textarea.newHVal+'</textarea>'
                      + '</fieldset>'
                    + '</form>'
                  + '</div>';

    return textareaHTML;
  }


  // ------------------------------------------------ Select Attr ------------------------------------------------


  function selectAttribute(options) {
    var selectHTML = '';
    var superKey = objType+ '_' +objItemID;
    var myString = localStorage.getItem(superKey);
    var myObject = JSON.parse(myString);
    var myObjectStatus = myObject[options.newHKey]; // Not Started/In-Progress/Complete

    selectHTML  +='<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(options.newHKey)+'</legend>'
                      + '<select id="input'+options.newHKey+'" name="'+options.newHKey+'" style="border-radius:10px;" value="optionDisp" onchange="selectedOption(this.name)">';

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
    var superKey = objType+ '_' +objItemID;
    var myString = localStorage.getItem(superKey);
    var myObject = JSON.parse(myString);
    var change = selected;
    myObject[str] = change;
    backToString = JSON.stringify(myObject);
    addToLocalStorage(superKey, backToString);
    // console.log("status is now", change);
    
  }


  // ------------------------------------------------ Number Attr ------------------------------------------------


  function numberAttribute(num) {
    var numberHTML = '';

    numberHTML  +='<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(num.newHKey)+'</legend>'
                      + '<input type="number" id="input'+num.newHKey+'" value="'+num.newHVal+'" style="border-radius:10px;" placeholder="'+num.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">'
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
                        + '<legend>'+capitalize(date.newHKey)+'</legend>'
                        + '<input type="date" id="input'+date.newHKey+'" value="'+date.newHVal+'" style="border-radius:10px;" name="'+date.newHKey+'" onchange="newDate(this.name)">'
                      + '</fieldset>'
                    + '</form>'
                  + '</div>';

    return calendarHTML;
  }

  // updates localStorage when a new date is selected
  function newDate(date) {
    var selected = $('#inputdueDate').val();
    var superKey = objType+ '_' +objItemID;
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
    var objTypeID = objType+'_'+objItemID;
    var tagNumbers = [];
    var tagNames = [];
    var tagObj = {};

    HTMLoutput  +='<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(array.newHKey)+'</legend>'
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
      HTMLarrayValues       +='<div class="col-12"><div class="col-10">'+arrayValue+'</div><input type="button" id="remvBtn_'+objTypeID+'_'+array.newHKey+'_'+arrayKey+'" class="col-2" style="border-radius:10px;" value="-" onclick="removeFunction(this)"></div>';
    }
    
    // creating the select tag
    HTMLoutput += HTMLarrayValues
                          + '</div>'
                        + '</div>'
                        + '<br><select id="'+objTypeID+'_'+array.newHKey+'" name="scripts" style="border-radius:10px;">';

    // creating all the options from the arrayOfOptions array in the select tag
    for (const [optionKey, optionValue] of Object.entries(array.newData.tags)) {
      HTMLoutput          +='<option id="optionValue_'+optionValue.id+'" value="'+optionValue.name+'">'+optionValue.name+'</option>';
    }

    // closing the form tags and creating the add button
    HTMLoutput          +='</select>'
                        + '<input type="button" id="addBtn_'+objTypeID+'_'+array.newHKey+'" value="Add" style="border-radius:10px;" onclick="addFunction(this)"/>'
                      + '</fieldset>'
                    + '</form>'
                  + '</div>';

    return HTMLoutput;
  }


  // ------------------------------------------------ Add function ------------------------------------------------


  // part of the arrayList function that will add whatever is the selected option to localStorage
  function addFunction(addBtn) {
    // console.log("This is addFunction parameters:",addBtn);
    var objTypeID = objType+'_'+objItemID; // task_5
    var value = addBtn.id.replace('addBtn_', ''); // task_5_tags
    var opt = value.replace(objTypeID+'_', ''); // tags
    var tagList = [];

    // setting localObj equal to localStorage.getItem(task_0/task_1/task_2/ ...)
    var localObj = JSON.parse(localStorage.getItem(objTypeID));
    var select = document.getElementById(value); // entire select and options found previous to the Add button

    // getting the number from the id of the selected option
    var elementVal = select.options[select.selectedIndex].id.replace(/optionValue_/, ''); // 0/1/2

    var HTMLoutput = '<div class="col-12"><div id="" class="col-10">'+select.options[elementVal].value+'</div><input type="button" id="remvBtn_'+value+'_'+elementVal+'" class="col-2" style="border-radius:10px;" value="-" onclick="removeFunction(this)"></div>';

    tagList = localObj[opt];
    // console.log("This is tagList: ", tagList);

    if (tagList.includes(Number(elementVal))) {
      console.log("tagList already includes", elementVal);
    }
    else {
      tagList.push(Number(elementVal));
      tagList.sort();
      JSON.stringify(tagList);
      localObj[opt] = tagList;
      // console.log("This is the localObj with updated tags: ", localObj);
      localStorage.setItem(objTypeID, JSON.stringify(localObj));
      $('#appendTo').append(HTMLoutput);
    }
    // location.reload();
  }


  // ----------------------------------------------- Remove function -----------------------------------------------


  // removes an item from localStorage and reloads the window which regenerates the display area
  function removeFunction(val) { // val is the entire remove button
    // console.log("This is val:",val);
    var objTypeID = objType+'_'+objItemID; // task_5


    //    =======>>>>> Editing localStorage <<<<<=======


    var wholeRow = val.parentNode;
    wholeRow.remove();


    //    =======>>>>> Editing localStorage <<<<<=======


    // getting all the variables that I need for making temp array and splicing
    var keyAndIndex = val.id.replace('remvBtn_'+objTypeID+'_', ''); // tags_0/tags_1/tags_2
    var valIDNum = keyAndIndex.replace(/\D/g, ''); // 0/1/2
    var keyWithoutIndex = keyAndIndex.replace('_'+valIDNum, ''); // tags

    // putting localStorage key in an object 
    var localObj = JSON.parse(localStorage.getItem(objTypeID));

    // creating temporary array
    var localObjTags = localObj[keyWithoutIndex];

    // removing a value from temporary array
    localObjTags.splice(localObjTags.indexOf(Number(valIDNum)), 1);

    // setting the localObj['tags'] equal to the temp array
    localObj[keyWithoutIndex] = localObjTags;

    // updating localStorage with newer values
    localStorage.setItem(objTypeID, JSON.stringify(localObj));

  }
}

if (URLValue == 'create') {
  $(document).ready(function(){
    if (objType == null)
    alert("add '?type=task' to the URL");
    
    createHTML();
    // createObjectList();
  });

  const typeData = async () => {
    var objVars = await fetch("../tempData/"+objType+".json").then(response=>{return response.json();});
    return objVars;
  }

  function showChange() {
    console.log(localStorage);
  }

  // function that is linked to the oninput attribute in the input box, every time
  // the value in the input is changed, this function will update the localStorage
  function anyChange(str) { // entire input tag
    var myStr = [];
    var myObj = {};
    var superKey = objType+ '_' +objItemID; // ex. task_21
    var objKey = str.id.replace(superKey+'_', ''); // name 
    // console.log("This is objKey:", objKey);
    var myStr = localStorage.getItem(superKey);
    // console.log("This is myStr:", myStr);
    var myObj = JSON.parse(myStr);
    var changeValue = str.value;
    // console.log("This is changeValue:", changeValue);
    myObj[objKey] = changeValue;
    // console.log("This is the new myObj:",myObj);
    backToString = JSON.stringify(myObj);
    // console.log("This is backToString ", backToString);
    localStorage.setItem(superKey, backToString);
  }

  const createHTML = async () => {
    var data = await tempData();
    var config = await configData();
    var type = await typeData();
    var objTypeData = data[objType];
    var configTypeData = config[objType];
    var tempKey = objType+'_'+objItemID;
    console.log("This is tempKey:",tempKey);
    // console.log("This is data:",data);
    
    var tagKeys = [];
    var tagNames = [];
    var tagObj = {};
    
    // putting id of new item into localStorage
    var obj = {'id':objItemID};
    var str = JSON.stringify(obj);
    localStorage.setItem(tempKey, str);


    // ---------------------------------------------- Navigation Bar ----------------------------------------------


    var HTMLoutput = '<div id="contacts">'
    // creating nav bar row
                    + '<div class="row">'
                      + '<p id="header">'
                        + '<img id="imageSpacing" src="images/MindfulMeasuresLogo.png" alt="LogoImage" width="80">';
    
    // creating the links for the header
    for(const [headerKey, headerValue] of Object.entries(data)) {
      HTMLoutput += '<a class="headerLinks" href="/?type='+headerKey+'&value=list">'+headerKey.toUpperCase()+'</a>';
    }
    
    HTMLoutput += '</p>';

    // closing nav bar row
    HTMLoutput += '</div>';


    // ------------------------------------------ Item Header and Inputs ------------------------------------------


    HTMLoutput += '<h1>Creating '+capitalize(objType)+' Item</h1>';

    // creating item header and input row
    HTMLoutput  +='<div class="row">'
                  + '<div class="col-4"><div class="col-12">ID</div><div class="col-12">'+objItemID+'</div></div>'

    // looping to find all the values in the editable key according to objType (tag, task, deliverable)
    for (const [editableKey, editableValue] of Object.entries(configTypeData.editable)) {
      // editableKey: 0, 1, 2, ...
      // editableValue: name, description, tags, ...

      // fill the options array with editableValue.opts
      if (type[editableValue].inpType == 'option') {
        // console.log("This is type[editableValue].opts:", type[editableValue].opts);
        var optionsArray = type[editableValue].opts;
      }

      if (type[editableValue].inpType == 'array') {
        var arrayArray = type[editableValue].opts;
        // console.log("This is arrayArray:",arrayArray);
        
        // for loop putting all the tag names into an array according to the values in arrayArray
        for (const [arrayKey, arrayValue] of Object.entries(data['tags'])) {
          // arrayValue: object 0, object 1, object 2
          if (arrayArray.includes(arrayValue.id)) {
            tagKeys.push(arrayValue.id);
            tagNames.push(arrayValue.name);
          }
        }
        // console.log("This is tagKeys:", tagKeys);
        // console.log("This is tagNames:", tagNames);

        // filling tagObj with two arrays: tagNumbers and tagNames
        tagKeys.forEach((key, i) => tagObj[key] = tagNames[i]);
        // console.log("This is tagObj:", tagObj);
      }

      // creating the header and input fields
      HTMLoutput  +='<div class="col-4">';


      // +++++++++++++++++++++++++++++++++++++++++++++++++++ Parameters +++++++++++++++++++++++++++++++++++++++++++++++++++


      var inputParameters = {
        inputType: type[editableValue].inpType,
        placeholder: type[editableValue].placeholder,
        value: editableValue,
        temp: tempKey,
        options: optionsArray,
        tags: tagObj
      };

      // console.log("This is type[editableValue].type", type[editableValue].type);
      HTMLoutput += inputFunction(inputParameters);

      HTMLoutput += '</div>';
    }

    // closing item header and input row
    HTMLoutput  +='</div>'
                + '<div class="row">'
                  + '<div class="col-10"></div>'
                  + '<div class="col-2"><button style="border-radius:10px;" onclick="displayStorage()">Create</button></div>'
                + '<div>';

    $('#everything').append(HTMLoutput);

  }


  // ----------------------------------------------- Display Storage ----------------------------------------------


  function displayStorage() {
    console.log(localStorage);
  }


  // ############################################### Input Function ###############################################


  function inputFunction(params) {

    newParams = {
      temp : params.temp,
      value: params.value,
      placeholder: params.placeholder,
      options: params.options,
      tags: params.tags
    };

    if (params.inputType == "text") {
      // console.log("inpType == 'text'");
      return textAttribute(newParams);
    }
    if (params.inputType == "textarea") {
      // console.log("inpType == 'textarea'");
      return textareaAttribute(newParams);
    }
    if (params.inputType == "number") {
      // console.log("inpType == 'number'");
      return numberAttribute(newParams);
    }
    if (params.inputType == "date") {
      // console.log("inpType == 'date'");
      return calendarAttribute(newParams);
    }
    if (params.inputType == "option") {
      // console.log("inpType == 'option'");
      return selectAttribute(newParams);
    }
    if (params.inputType == "array") {
      // console.log("inpType == 'array'");
      return arrayList(newParams);
    }

  }


  // ----------------------------------------------- Text Attribute -----------------------------------------------


  function textAttribute(text) {
    var textHTML = '';

    textHTML += '<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(text.value)+'</legend>'
                      + '<input type="text" id="'+text.temp+'_'+text.value+'" class="col-11" name="" style="border-radius:10px;" placeholder="'+text.placeholder+'" oninput="anyChange(this)">' //onchange="showChange()"
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
                      + '<legend>'+capitalize(textarea.value)+'</legend>'
                      + '<textarea id="'+textarea.temp+'_'+textarea.value+'" class="col-11" style="border-radius:10px;" placeholder="'+textarea.placeholder+'" oninput="anyChange(this)"></textarea>'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

    return textareaHTML;
  }


  // ------------------------------------------------ Number Attr ------------------------------------------------


  function numberAttribute(num) {
    var numberHTML = '';

    numberHTML += '<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(num.value)+'</legend>'
                      + '<input type="number" id="'+num.temp+'_'+num.value+'" class="col-11" name="" style="border-radius:10px;" style="border-radius:10px;" placeholder="'+num.placeholder+'" oninput="anyChange(this)" min="0" max="100">'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

    return numberHTML;
  }


  // ----------------------------------------------- Calendar Attr -----------------------------------------------


  function calendarAttribute(cal) {
    var calendarHTML = '';

    calendarHTML += '<div class="col-12">'
                    + '<form action="#" method="post" class="demoForm">'
                      + '<fieldset class="minHeight">'
                        + '<legend>'+capitalize(cal.value)+'</legend>'
                        + '<input type="date" id="'+cal.temp+'_'+cal.value+'" name="" style="border-radius:10px;" oninput="anyChange(this)">'
                      + '</fieldset>'
                    + '</form>'
                  + '</div>';

    return calendarHTML;
  }


  // ------------------------------------------------ Select Attr ------------------------------------------------


  function selectAttribute(sel) {
    var selectHTML = '';

    selectHTML += '<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(sel.value)+'</legend>'
                      + '<select id="'+sel.temp+'_'+sel.value+'" name="optionDisp" style="border-radius:10px;" value="optionDisp" oninput="selectedOption(this)">'
                        + '<option value="Select a Status">Select an Option</option>';
  
    for (const [varsKey, varsValue] of Object.entries(sel.options)) {
      selectHTML +=       '<option value="'+varsValue+'">'+varsValue+'</option>';
    }
    selectHTML        +='</select>'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';
    
    return selectHTML;
  }

  function selectedOption(selOpt) { // the entire select tag (including the options)
    var selID = selOpt.id; // task_21_status
    var superKey = objType+'_'+objItemID; // task_21
    var objKey = selID.replace(superKey+'_', ''); // status
    var myObject = JSON.parse(localStorage.getItem(superKey));
    myObject[objKey] = selOpt.value; // status: Not Started/In-Progress/Complete
    backToString = JSON.stringify(myObject);
    localStorage.setItem(superKey, backToString);
  }


  // ------------------------------------------------- Array List -------------------------------------------------


  function arrayList(array) {
    var HTMLoutput = '';

    HTMLoutput  +='<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>'+capitalize(array.value)+'</legend>'
                        + '<div id="outerDiv">'
                          + '<div id="appendTo"></div>'
                        + '</div>'
                        + '<br><select id="'+array.temp+'_'+array.value+'" name="scripts" style="border-radius:10px;">';

    // creating all the options from the arrayOfOptions array in the select tag
    for (const [optionKey, optionValue] of Object.entries(array.tags)) {
        HTMLoutput        +='<option id="optionValue_'+optionKey+'" value="'+optionValue+'">'+optionValue+'</option>';
    }

    // closing the form tags and creating the add button
    HTMLoutput          +='</select>'
                        + '<input type="button" id="addButton_'+array.temp+'_'+array.value+'" class="addButton" style="border-radius:10px;" value="Add" onclick="addFunction(this)"/>'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

    return HTMLoutput;
  }


  // ------------------------------------------------ Add function ------------------------------------------------


  // part of the arrayList function that will add whatever is the selected option to localStorage
  function addFunction(addBtn) {
    var objTypeID = objType+'_'+objItemID; // task_21
    var value = addBtn.id.replace('addButton_', ''); // task_21_tags
    var opt = value.replace('task_21_', ''); // tags
    var tagList = [];

    // setting localObj equal to localStorage.getItem(task_0/task_1/task_2/ ...)
    var localObj = JSON.parse(localStorage.getItem(objTypeID));
    var select = document.getElementById(value); //entire select above add button

    // getting the number from the id of the selected option
    var elementVal = select.options[select.selectedIndex].id.replace(/optionValue_/, ''); // 0/1/2

    if (localObj[opt] == null || localObj[opt] == "") {
      tagList = [];
    }
    else {
      tagList = localObj[opt];
    }

    var HTMLoutput = '<div class="col-12"><div id="" class="col-10">'+select.options[elementVal].value+'</div><input type="button" id="remvBtn_'+value+'_'+elementVal+'" class="col-2" style="border-radius:10px;" value="-" onclick="removeFunction(this)"></div>';

    // adding the selected option value to the list based off of certain conditions
    if(tagList == null || tagList == "") {
      tagList.push(Number(elementVal));
      localObj[opt] = tagList;
      // console.log("This is localObj:",localObj);
      localStorage.setItem(objTypeID, JSON.stringify(localObj));
      $('#appendTo').append(HTMLoutput);
    }
    else {
      if (tagList.includes(Number(elementVal))) {
        console.log("tagList already includes", elementVal);
      }
      else {
        tagList.push(Number(elementVal));
        tagList.sort();
        JSON.stringify(tagList);
        localObj[opt] = tagList;
        // console.log("This is the localObj with updated tags: ", localObj);
        localStorage.setItem(objTypeID, JSON.stringify(localObj));
        $('#appendTo').append(HTMLoutput);
      }
    }
  }


  // ----------------------------------------------- Remove function -----------------------------------------------


  // removes an item from localStorage and from the page as well
  function removeFunction(val) { // val is the entire remove button
    // console.log("This is val:",val);
    var objTypeID = objType+'_'+objItemID;


    // =======>>>>> Removing div from document <<<<<=======

    
    var wholeRow = val.parentNode;
    wholeRow.remove();


    //    =======>>>>> Editing localStorage <<<<<=======


    // removing all the text from the remove button's id
    var keyAndIndex = val.id.replace('remvBtn_'+objTypeID+'_', ''); // tags_0/tags_1/tags_2
    var valIDNum = keyAndIndex.replace(/\D/g,''); // 0/1/2
    var keyWithoutIndex = keyAndIndex.replace('_'+valIDNum, ''); // tags
    var localObj = JSON.parse(localStorage.getItem(objTypeID));
    // console.log("This is localObj: ", localObj);
    
    var localObjTags = localObj[keyWithoutIndex];
    // console.log("This is localObjTags: ", localObjTags);

    // removing the value from the temporary array
    localObjTags.splice(localObjTags.indexOf(Number(valIDNum)), 1);

    // setting the array that will be stringified equal to the temporary array
    localObj.tags = localObjTags;

    // setting localStorage with the updated array
    localStorage.setItem(objTypeID, JSON.stringify(localObj));
  }


  // ------------------------------------------------ Object List ------------------------------------------------


  function objectAttribute() {
    var objectHTML = '';

    objectHTML += '<div class="col-6">'
                    + '<form action="#" method="post" class="demoForm">'
                      + '<fieldset class="minHeight">'
                        + '<legend>Object List</legend>'
                        + '<div id="objOuter">'
                          + '<div id="objAppend"></div>'
                        + '</div>'
                        + '<br><select id="objScripts">'
                          + '<option value="1">opt1</option>'
                          + '<option value="2">opt2</option>'
                          + '<option value="3">opt3</option>'
                          + '<option value="4">opt4</option>'
                        + '</select>'
                        + '<input type="button" id="showObject" value="Add" onclick="addFunction(\'objScripts\')"/>'
                      + '</fieldset>'
                    + '</form>'
                  + '</div>';

    $('#objectSpot').append(objectHTML);
  }



  var objectFields = {
    'option_1': {
      "id":0,
      "name":"COI: Design Wireframes",
      "description":"These tasks will result in a user interface to create an object item.",
      "status":"in-progress",
      "dueDate":"5/15/2021",
      "estEff":10
    },
    'option_2': 'Filler Text 2 Filler Text 2',
    'option_3': 'Filler Text 3 Filler Text 3'
  };

  var fillFields =  { 
    'option_1': 'Filler Text 1 Filler Text 1',
    'option_2': 'Filler Text 2 Filler Text 2',
    'option_3': 'Filler Text 3 Filler Text 3',
    'option_4': 'Filler Text 4 Filler Text 4',
    'option_5': 'Filler Text 5 Filler Text 5',
    'option_6': 'Filler Text 6 Filler Text 6',
    'option_7': 'Filler Text 7 Filler Text 7' 
  };

  function createObjectList() {
    console.log("Entering createHTML2()...");
    
    var i = 0;
    var outputHTML = '';
    var HTMLobjectValues = '';

    outputHTML += '<form>'
                  + '<fieldset>'
                    + '<legend>Object List</legend>'
                    + '<div id="objOuter">'
                      + '<div id="objAppend"></div>'
                    + '</div>';

    for (const[objectKey, objectValue] of Object.entries(objectFields)) {
      // (objectKey: option 1, option 2, option 3)
      HTMLobjectValues += '<div class="row"><div class="col-6">'+objectValue+'</div><div class="col-1"><input type="button" id="remvObj'+i+'" value="-" onclick="removeObject('+i+')"></div></div>';
      // counts up the indices if there's any preset values in the array (uncommon)
      i++;
    }

    outputHTML +=     '<br><select id="objScripts" name="objScripts">';

    for (const [fillKey, fillValue] of Object.entries(fillFields)) {
    outputHTML +=        '<option value="'+fillKey+'">'+fillKey+'</option>';
    }
    outputHTML +=       '<input type="button" id="showObj" value="+">'
                    + '</select>'
                  + '</fieldset>'
                + '</form>';
                
    $('#objectSpot').append(outputHTML);
    $('#objAppend').append(HTMLobjectValues);
  }
}