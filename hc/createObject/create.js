$(document).ready(function(){
  if (objType == null)
  alert("add '?type=task' to the URL");
  
  createHTML();
  // createObjectList();
  // doTheHTML();
  // doTheStringify();
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

var i = 0;
var arrayFields = [ 'Ron', 'John', 'James' ];
var arrayOfOptions = [ 'Scrolling Divs JavaScript',
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
  var objTypeData = data[objType];
  var configTypeData = config[objType];


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
  HTMLoutput += '<div class="row">'

  // looping to find all the values in the editable key according to objType (tag, task, deliverable)
  for (const [editableKey, editableValue] of Object.entries(configTypeData.editable)) {
    // console.log("This is the editableValue: ", editableValue); (name, description, tags)

    // creating the header and input fields
    HTMLoutput += '<div class="col-4">'
                  + '<div class="col-12">'+editableValue+'</div>';
    
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
  HTMLoutput += '</div>';

  $('#everything').append(HTMLoutput);
}


// ------------------------------------------------ Add funtion ------------------------------------------------


function addFunction() {
  var select = document.getElementById('scripts');  

  // access text property of selected option
  elementVal = select.options[select.selectedIndex].text;
  arrayFields.push(elementVal);
  
  // adding a new row and columns to the HTML
  var HTMLelement = '<div class="row"><div class="col-10">'+elementVal+'</div><div class="col-2"><input type="button" id="remvBtn'+i+'" value="-" onclick="removeFunction('+i+')"></div></div>';
  $('#appendTo').append(HTMLelement);

  // adjusting indices
  i++;
}


// ----------------------------------------------- Remove funtion -----------------------------------------------


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


// ------------------------------------------------ ID Generator ------------------------------------------------


const generateID = async () => {
  var data = await tempData();
  // console.log("This is data: ", data);
  var objTypeData = data[objType];
  // console.log("This is objTypeData: ", objTypeData);

  var i = 0;
  for(const [idKey, idValue] of Object.entries(objTypeData)) {
    i++;
  }
  console.log("This is i: ", i);
  return i;
}


// ----------------------------------------------- Text Attribute -----------------------------------------------


function textAttribute() {
  var textHTML = '';

  textHTML += '<div class="col-6">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Text</legend>'
                    + '<input type="text" class="textInput" name="">'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  $('#textSpot').append(textHTML);
}

textAttribute();


// --------------------------------------------- Textarea Attribute ---------------------------------------------


function textareaAttribute() {
  var textareaHTML = '';

  textareaHTML += '<div class="col-6">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Textarea</legend>'
                    + '<textarea class="textareaInput" rows="2" cols="30"></textarea>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  $('#textareaSpot').append(textareaHTML);
}

textareaAttribute();


// ------------------------------------------------ Select Attr ------------------------------------------------


function selectAttribute(vars) {
  if (!vars) {return alert("vars doesnt exist");}
  var selectHTML = '';

  selectHTML += '<div class="col-4">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Status</legend>'
                    + '<select name="optionDisp" value="optionDisp">';

  for (const [varsKey, varsValue] of Object.entries(vars.options)) {
    selectHTML +=       '<option value="'+varsValue+'">'+varsValue+'</option>';
  }
selectHTML +=         '</select>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';
  $('#optionSpot').append(selectHTML);
}

// variables that will be passed into selectAttribute()
optionVariables = {
  options : [ 'in-progress', 'complete' ]
};

selectAttribute(optionVariables);


// ------------------------------------------------ Number Attr ------------------------------------------------


function numberAttribute(vars) {
  if (!vars) {return alert("vars doesnt exist");}
  var numberHTML = '';

  numberHTML += '<div class="col-4">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Est Eff</legend>'
                    + '<input type="number" id="numInput" name="" min="0" max="'+vars+'">'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  $('#numberSpot').append(numberHTML);
}

numberAttribute(10);


// ----------------------------------------------- Calendar Attr -----------------------------------------------


function calendarAttribute() {
  var calendarHTML = '';

  calendarHTML += '<div class="col-4">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>Due Date</legend>'
                      + '<input type="date" id="calInput" name="">'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

  $('#calendarSpot').append(calendarHTML);
}

calendarAttribute();


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

  HTMLoutput += '<div class="col-6">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>Tags</legend>'
                      + '<div id="outerDiv">'
                        + '<div id="appendTo"></div>'
                      + '</div>';

  // showing all the items in the arrayFields array (none if the array is preset as empty)
  for (const[arrayKey, arrayValue] of Object.entries(arrayFields)) {
  HTMLarrayValues +=    '<div class="row"><div class="col-10">'+arrayValue+'</div><div class="col-2"><input type="button" id="remvBtn'+arrayKey+'" value="-" onclick="removeFunction('+arrayKey+')"></div></div>';

  // counts up the indices if there's any preset values in the array (uncommon)
  i++;
  }

  // creating the select tag
  HTMLoutput +=      '<br><select id="scripts" name="scripts">';

  // creating all the options from the arrayOfOptions array in the select tag
  for (const [optionKey, optionValue] of Object.entries(arrayOfOptions)) {
  HTMLoutput +=       '<option value="'+optionValue+'">'+optionValue+'</option>';
  }

  // closing the form tags and creating the add button
  HTMLoutput +=       '</select>'
                    + '<input type="button" id="showTxt" value="Add" onclick="addFunction()"/>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';

  $('#arraySpot').append(HTMLoutput);
  $('#appendTo').append(HTMLarrayValues);
}
  
var variables = {
  options : arrayOfOptions,
  existing : arrayFields,
  attrType : objType
};

arrayList(variables);


// ------------------------------------------------ Object List ------------------------------------------------


function objectAttribute() {
  var objectHTML = '';

  objectHTML += '<div class="col-6">'
                  + '<form action="#" method="post" class="demoForm">'
                    + '<fieldset class="minHeight">'
                      + '<legend>Object List</legend>'
                      + '<select>'
                        + '<option value="1">opt1</option>'
                        + '<option value="2">opt2</option>'
                        + '<option value="3">opt3</option>'
                        + '<option value="4">opt4</option>'
                      + '</select>'
                      + '<input type="button" id="showObject" value="Add" onclick="addFunction()"/>'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

  $('#objectSpot').append(objectHTML);
}

objectAttribute();




















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