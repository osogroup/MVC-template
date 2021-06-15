$(document).ready(function(){
  if (objType == null)
  alert("add '?type=task' to the URL");
  
  createHTML();
  // createObjectList();
});

const configData = async () => {
  var listConfig = await fetch("../tempData/objectConfig.json").then(response=>{return response.json();});
  // console.log("configData output ", listConfig);
  return listConfig;
}

// gets all the Objects/Arrays from listOfObjects.json and returns them
const listData = async () => {
  var objVars = await fetch("../tempData/listOfObjects.json").then(response=>{return response.json();});
  // console.log("tempData output ", objVars);
  return objVars;
}

const typeData = async () => {
  var objVars = await fetch("../tempData/"+objType+".json").then(response=>{return response.json();});
  return objVars;
}

function showChange() {
  console.log(localStorage);
}

// function that is linked to the oninput attribute in the input box, every time
// the value in the box is changed, this function will update the localStorage
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

var i = 0;
var arrayFields = [ 
  'Ron', 
  'John', 
  'James' 
];

var arrayOfOptions = [ 
  'Scrolling Divs JavaScript',
  'JavaScript Tooltips', 
  'Continuous Scroller', 
  'Rotating Banner JavaScript', 
  'Random Image PHP', 
  'PHP Form Generator', 
  'PHP Table Class', 
  'PHP Order Forms',
  'Test Option'
];

const createHTML = async () => {
  var data = await listData();
  var config = await configData();
  var type = await typeData();
  var objTypeData = data[objType];
  var configTypeData = config[objType];
  var tempKey = objType+'_'+objItemID;
  console.log("This is tempKey:",tempKey);
  
  // putting id of new item into localStorage
  var obj = {'id':objItemID};
  var str = JSON.stringify(obj);
  localStorage.setItem(tempKey, str);


  // ---------------------------------------------- Navigation Bar ----------------------------------------------


  var HTMLoutput = '<div id="contacts">'
  // creating nav bar row
                  + '<div class="row">'
                    + '<p id="header">'
                      + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="80">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    HTMLoutput += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
  }
  
  HTMLoutput += '</p>';

  // closing nav bar row
  HTMLoutput += '</div>';


  // ------------------------------------------ Item Header and Inputs ------------------------------------------


  HTMLoutput += '<h1>Creating '+objType+' Item</h1>';

  // creating item header and input row
  HTMLoutput  +='<div class="row">'
                + '<div class="col-4"><div class="col-12">id</div><div class="col-12">'+objItemID+'</div></div>'

  // looping to find all the values in the editable key according to objType (tag, task, deliverable)
  for (const [editableKey, editableValue] of Object.entries(configTypeData.editable)) {
    console.log("This is the editableKey:", editableKey); // 0, 1, 2, ...
    console.log("This is the editableValue: ", editableValue); // name, description, tags, ...


    // fill the options array with editableValue.opts
    if (type[editableValue].inpType == 'option') {
      console.log("This is type[editableValue].opts:", type[editableValue].opts);
      var optionsArray = type[editableValue].opts;
    }

    if (type[editableValue].inpType == 'array') {
      var arrayArray = type[editableValue].opts;
      console.log("This is arrayArray:",arrayArray);

      var tagNames = {};
      // for loop putting all the tag names into an array according to the values in arrayArray
      for (const [arrayKey, arrayValue] of Object.entries(arrayArray)) {
        // console.log("id of 0, 1, and 2 pls",data['tags'][arrayValue].id)
        if (arrayArray.includes(data['tags'][arrayValue].id)) {
          console.log("YES");
        }
      }
    }

    // creating the header and input fields
    HTMLoutput  +='<div class="col-4">';


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    var inputParameters = {
      inputType: type[editableValue].inpType,
      placeholder: type[editableValue].placeholder,
      value: editableValue,
      temp: tempKey,
      options: optionsArray
    };

    // console.log("This is type[editableValue].type", type[editableValue].type);
    HTMLoutput += inputFunction(inputParameters);
    

    // if the editableValue is in the required list according to objType 
    // if (configTypeData.required.includes(editableValue) == true) {
    //   // make the input box with a "required" attribute (includes '*' to let the admin see the required fields)
    //   HTMLoutput += '<br><input type=textarea placeholder="*" required>';
    // }
    // // else
    // else {
    //   //   do what I already did below
    //   HTMLoutput += '<br><input type=textarea>';
    // }

    // closing the header and input fields
    HTMLoutput += '</div>';
  }

  // closing item header and input row
  HTMLoutput  +='</div>'
              + '<div class="row">'
                + '<div class="col-10"></div>'
                + '<div class="col-2"><button onclick="displayStorage()">Create</button></div>'
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
    options: params.options
  };

  if (params.inputType == "text") {
    console.log("inpType == 'text'");
    return textAttribute(newParams);
  }
  if (params.inputType == "textarea") {
    console.log("inpType == 'textarea'");
    return textareaAttribute(newParams);
  }
  if (params.inputType == "number") {
    console.log("inpType == 'number'");
    return numberAttribute(newParams);
  }
  if (params.inputType == "date") {
    console.log("inpType == 'date'");
    return calendarAttribute(newParams);
  }
  if (params.inputType == "option") {
    console.log("inpType == 'option'");
    return selectAttribute(newParams);
  }
  if (params.inputType == "array") {
    console.log("inpType == 'array'");
    return arrayList(newParams);
  }

}


// ----------------------------------------------- Text Attribute -----------------------------------------------


function textAttribute(text) {
  var textHTML = '';

  textHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+text.value+'</legend>'
                    + '<input type="text" id="'+text.temp+'_'+text.value+'" class="col-11" name="" placeholder="'+text.placeholder+'" oninput="anyChange(this)">' //onchange="showChange()"
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
                    + '<legend>'+textarea.value+'</legend>'
                    + '<textarea id="'+textarea.temp+'_'+textarea.value+'" class="textareaInput" placeholder="'+textarea.placeholder+'" rows="3" cols="22" oninput="anyChange(this)"></textarea>'
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
                    + '<legend>'+num.value+'</legend>'
                    + '<input type="number" id="'+num.temp+'_'+num.value+'" class="col-11" name="" placeholder="'+num.placeholder+'" oninput="anyChange(this)" min="0" max="100">'
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
                      + '<legend>'+cal.value+'</legend>'
                      + '<input type="date" id="'+cal.temp+'_'+cal.value+'" name="" oninput="anyChange(this)">'
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
                    + '<legend>'+sel.value+'</legend>'
                    + '<select id="'+sel.temp+'_'+sel.value+'" name="optionDisp" value="optionDisp" oninput="selectedOption(this)">'
                      + '<option value="Select an Option">Select an Option</option>';
 
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
                    + '<legend>'+array.value+'</legend>'
                      + '<div id="outerDiv">'
                        + '<div id="appendTo">';

  // fill up array, tagNumbers, with tag numbers
  // for (const [arrayKey, arrayValue] of Object.entries(JSON.parse(localStorage.getItem(objTypeID)))) {
  //   // arrayKey: id, name, description, status, ...
  //   // arrayValue: 1, COI: Static Site HTML Structure, This task creates the structure of the Static site, ...
  //   if (arrayKey == 'tags') {
  //     for (const [tagKey, tagValue] of Object.entries(arrayValue)) {
  //       tagNumbers.push(tagValue);
  //     }
  //   }
  // }

  // // if tag number array includes the tag number, display the tag name
  // for (const [arrayKey, arrayValue] of Object.entries(array.newData.tags)) {
  //   if (tagNumbers.includes(arrayValue.id)) {
  //     tagNames.push(arrayValue.name);
  //   }
  // }

  // // filling tagObj with two arrays: tagNumbers and tagNames
  // tagNumbers.forEach((key, i) => tagObj[key] = tagNames[i]);

  // // showing all the items in the arrayOfOptionsNames array (none if the array is preset as empty)
  // for (const[arrayKey, arrayValue] of Object.entries(tagObj)) {
  //   HTMLarrayValues       +='<div class="row"><div class="col-10">'+arrayValue+'</div><div class="col-2"><input type="button" id="remvBtn_'+arrayKey+'" value="-" onclick="removeFunction(this)"></div></div>';
  //   // counts up the indices if there's any preset values in the array
  // }
  
  // // creating the select tag
  // HTMLoutput += HTMLarrayValues
  //                       + '</div>'
  //                     + '</div>'
  //                     + '<br><select id="scripts" name="scripts">';

  // // creating all the options from the arrayOfOptions array in the select tag
  // for (const [optionKey, optionValue] of Object.entries(array.newData.tags)) {
  //   if (optionKey in tagObj) {
  //     HTMLoutput          +='<option id="optionValue_'+optionValue.id+'" value="'+optionValue.name+'">'+optionValue.name+'</option>';
  //   }
  //   else {
  //     HTMLoutput          +='<option id="optionValue_'+optionValue.id+'" value="'+optionValue.name+'" selected>'+optionValue.name+'</option>';
  //   }
    
  // }

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