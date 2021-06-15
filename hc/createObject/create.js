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
const tempData = async () => {
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
  var data = await tempData();
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

    // creating the header and input fields
    HTMLoutput  +='<div class="col-4">';


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    var inputParameters = {
      inputType: type[editableValue].inpType,
      placeholder: type[editableValue].placeholder,
      value: editableValue,
      temp: tempKey
    };

    // console.log("This is type[editableValue].type", type[editableValue].type);
    HTMLoutput += inputFunction(inputParameters);
    

    // if the editableValue is in the required list according to objType 
    if (configTypeData.required.includes(editableValue) == true) {
      // make the input box with a "required" attribute (includes '*' to let the admin see the required fields)
      HTMLoutput += '<br><input type=textarea placeholder="*" required>';
    }
    // else
    else {
      //   do what I already did below
      HTMLoutput += '<br><input type=textarea>';
    }

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
    placeholder: params.placeholder
  };

  if (params.inputType == "text") {
    console.log("inpType == 'text'");
    return textAttribute(newParams);
  }
  if (params.inputType == "textarea") {
    console.log("inpType == 'textarea'");
    // return textareaAttribute(params.value);
  }
  if (params.inputType == "number") {
    console.log("inpType == 'number'");
    // return numberAttribute(params.value);
  }
  if (params.inputType == "date") {
    console.log("inpType == 'date'");
    // return calendarAttribute(params.value);
  }
  if (params.inputType == "array") {
    console.log("inpType == 'array'");
    // return arrayList(params.value);
  }
  if (params.inputType == "option") {
    console.log("inpType == 'option'");
    // return selectAttribute(params.value);
  }

}


// ----------------------------------------------- Text Attribute -----------------------------------------------


function textAttribute(text) {
  var textHTML = '';

  textHTML += '<div class="col-11">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+text.value+'</legend>'
                    + '<input type="text" id="'+text.temp+'_'+text.value+'" class="col-12" name="" placeholder="'+text.placeholder+'" oninput="anyChange(this)" onchange="showChange()">'
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
                    + '<legend>'+textarea+'</legend>'
                    + '<textarea class="textareaInput" rows="3" cols="22"></textarea>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return textareaHTML;
}


// ------------------------------------------------ Select Attr ------------------------------------------------


function selectAttribute(vars) {
  if (!vars) {return alert("vars doesnt exist");}
  var selectHTML = '';

  selectHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Status</legend>'
                    + '<select name="optionDisp" value="optionDisp">';

  for (const [varsKey, varsValue] of Object.entries(vars.options)) {
    selectHTML +=       '<option value="'+varsValue+'">'+varsValue+'</option>';
  }
  selectHTML        +='</select>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';
  
  return selectHTML;
}

// variables that will be passed into selectAttribute()
optionVariables = {
  options : [ 
    'Not Started', 
    'In-Progress', 
    'Complete' 
  ]
};


// ------------------------------------------------ Number Attr ------------------------------------------------


function numberAttribute(vars) {
  if (!vars) {return alert("vars doesnt exist");}
  var numberHTML = '';

  numberHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Est Eff</legend>'
                    + '<input type="number" id="numInput" name="" min="0" max="'+vars+'">'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return numberHTML;
}


// ----------------------------------------------- Calendar Attr -----------------------------------------------


function calendarAttribute() {
  var calendarHTML = '';

  calendarHTML += '<div class="col-12">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>Due Date</legend>'
                      + '<input type="date" id="calInput" name="">'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

  return calendarHTML;  
}


// ------------------------------------------------- Array List -------------------------------------------------


function arrayList(vars) {

  if (!vars.existing || !vars.options || !vars.attrType){
    alert("vars has an empty array");
    return;
  }
  console.log("This is the input for arrayList(vars): ", vars);

  var HTMLoutput = '';
  var HTMLarrayValues = '';
  var arrayFields = vars.existing;
  var arrayOfOptions = vars.options;
  var type = vars.attrType;

  HTMLoutput  +='<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Tags</legend>'
                      + '<div id="outerDiv">'
                        + '<div id="appendTo"></div>'
                      + '</div>';

  // showing all the items in the arrayFields array (none if the array is preset as empty)
  for (const[arrayKey, arrayValue] of Object.entries(arrayFields)) {
  HTMLarrayValues     +='<div class="row"><div class="col-10">'+arrayValue+'</div><div class="col-2"><input type="button" id="remvBtn'+arrayKey+'" value="-" onclick="removeFunction('+arrayKey+')"></div></div>';

  // counts up the indices if there's any preset values in the array (uncommon)
  i++;
  }

  // creating the select tag
  HTMLoutput += HTMLarrayValues     
                      + '<br><select id="scripts" name="scripts">';

  // creating all the options from the arrayOfOptions array in the select tag
  for (const [optionKey, optionValue] of Object.entries(arrayOfOptions)) {
  HTMLoutput          +='<option value="'+optionValue+'">'+optionValue+'</option>';
  }

  // closing the form tags and creating the add button
  HTMLoutput        +='</select>'
                    + '<input type="button" id="showTxt" value="Add" onclick="addFunction(\'scripts\')"/>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  return HTMLoutput;

}
  
var variables = {
  options : arrayOfOptions,
  existing : arrayFields,
  attrType : objType
};


// ------------------------------------------------ Add function ------------------------------------------------


function addFunction(variable) {
  var select = document.getElementById(variable);  

  // access text property of selected option
  elementVal = select.options[select.selectedIndex].text;
  arrayFields.push(elementVal);
  
  // adding a new row and columns to the HTML
  var HTMLelement = '<div class="row"><div class="col-10">'+elementVal+'</div><div class="col-2"><input type="button" id="remvBtn'+i+'" value="-" onclick="removeFunction('+i+')"></div></div>';
  $('#appendTo').append(HTMLelement);

  // adjusting indices
  i++;
}


// ----------------------------------------------- Remove function -----------------------------------------------


function removeFunction(val) {
  var HTMLelement = '';

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
  elm.appendChild(tag);
  $('#appendTo').append(HTMLelement);

  console.log("This is arrayFields after .splice(): ", arrayFields);

  // adjusting indices for add function
  i--;
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