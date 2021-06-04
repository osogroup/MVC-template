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

const taskData = async () => {
  var taskVars = await fetch("../tempData/task.json").then(response=>{return response.json();});
  return taskVars;
}

const tagData = async () => {
  var tagVars = await fetch("../tempData/tag.json").then(response=>{return response.json();});
  return tagVars;
}

const deliverableData = async () => {
  var deliverableVars = await fetch("../tempData/deliverable.json").then(response=>{return response.json();});
  return deliverableVars;
}

// function to create editObject HTML
const outputHTML = async () => {
  console.log("Entering outputHTML()");
  var data = await tempData();
  var config = await configData();
  var taskStuff = await taskData();
  var tagStuff = await tagData();
  var deliverableStuff = await deliverableData();
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
// var tagOptions = [];

const doTheStringify = async () => {

  if(objType == null || objItemid == null) {
    alert('Please enter "?type=task&itemid=0" at the end of the current URL');
  }
  else {
    var data = await tempData();
    var config = await configData();
    var taskStuff = await taskData();
    var tagStuff = await tagData();
    var deliverableStuff = await deliverableData();
    var objTypeData = data[objType];
    var configTypeData = config[objType];
    console.log("This is taskStuff: ", taskStuff);



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
      console.log(localStorage);

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
      // console.log("This is headerKey", headerKey); // id, name
      // console.log("This is headerValue", headerValue); // 1, COI: Static Site HTML Structure
      HTMLoutput += '<div class="col-4 minHeight">'
                    + '<div class="col-12">'+headerKey+'</div>';
      if (configTypeData.editable.includes(headerKey) == true)
      {

        // making object item an input textbox


        // ######################################################################################################################


        var taskHeader = taskStuff[headerKey];
        
        // filling up the statusOptions array before calling selectAttribute()
        for (const [stuffKey, stuffValue] of Object.entries(taskHeader)) {
          if (headerKey == 'status' && stuffKey == 'opts') {
            statusOptions.push(stuffValue);
            console.log("This is statusOptions: ", statusOptions);
          }
        }

        for (const [stuffKey, stuffValue] of Object.entries(taskHeader)) {
          // console.log("This is stuffKey: ", stuffKey); // (required, type, inpType)
          // console.log("This is stuffValue: ", stuffValue); // (true, string, text)
          if (stuffKey == "inpType") {
            // console.log("This is the stuffValue of stuffKey", stuffValue); // (text, textarea, text, array, date, number)
            var parameters = {
              sVal : stuffValue,  // text, textarea, array, ...
              hKey : headerKey, // id, name, description, ...
              hVal : headerValue  // 1, COI: Static Site HTML Structure, ...
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
























// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GOD %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


function inputFunction(params) {
  // console.log("Entering inputFunction()...");
  var newParams = {
    newHKey : params.hKey,
    newHVal : params.hVal
  };
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
    // return arrayList(newParams);
  }
  if (params.sVal == "option") {
    return selectAttribute(newParams);
  }
  // console.log("Exiting inputFunction()...");
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

  selectHTML += '<div class="col-12">'
                + '<form action="#" method="post" class="demoForm">'
                  + '<fieldset class="minHeight">'
                    + '<legend>'+options.newHKey+'</legend>'
                    + '<select id="input'+options.newHKey+'" name="optionDisp" value="optionDisp" placeholder="'+options.newHKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">';

  for (const [varsKey, varsValue] of Object.entries(statusOptions[0])) {
    selectHTML +=       '<option value="'+varsValue+'">'+varsValue+'</option>';
  }
selectHTML +=         '</select>'
                  + '</fieldset>'
                + '</form>'
              + '</div>';
  return selectHTML;
}


// ------------------------------------------------ Number Attr ------------------------------------------------


function numberAttribute(num) {
  var numberHTML = '';
  console.log("This is num.newHKey: ", num.newHKey);
  console.log("This is num.newHVal: ", num.newHVal);

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
                      + '<input type="date" id="input'+date.newHKey+'" value="'+date.newHVal+'" placeholder="'+date.newHKey+'" oninput="anyChange(this.value)" onchange="showData()" name="">'
                    + '</fieldset>'
                  + '</form>'
                + '</div>';

  return calendarHTML;
}


// ------------------------------------------------- Array List -------------------------------------------------


// function arrayList(array) {
//   var i = 0;
//   // if (!vars.existing || !vars.options || !vars.attrType){
//   //   alert("vars has an empty array");
//   //   return;
//   // }
//   console.log("This is the input for arrayList(array): ", array);

//   var HTMLoutput = '';

//   HTMLoutput += '<div class="col-12">'
//                 + '<form action="#" method="post" class="demoForm">'
//                   + '<fieldset class="minHeight">'
//                     + '<legend>Tags</legend>'
//                       + '<div id="outerDiv">'
//                         + '<div id="appendTo"></div>'
//                       + '</div>';

//   // showing all the items in the arrayFields array (none if the array is preset as empty)
//   for (const[arrayKey, arrayValue] of Object.entries(arrayFields)) {
//   HTMLoutput +=    '<div class="row"><div class="col-10">'+arrayValue+'</div><div class="col-2"><input type="button" id="remvBtn'+arrayKey+'" value="-" onclick="removeFunction('+arrayKey+')"></div></div>';

//   // counts up the indices if there's any preset values in the array (uncommon)
//   i++;
//   }

//   // creating the select tag
//   HTMLoutput +=      '<br><select id="scripts" name="scripts">';

//   // creating all the options from the arrayOfOptions array in the select tag
//   for (const [optionKey, optionValue] of Object.entries(arrayOfOptions)) {
//   HTMLoutput +=       '<option value="'+optionValue+'">'+optionValue+'</option>';
//   }

//   // closing the form tags and creating the add button
//   HTMLoutput +=       '</select>'
//                     + '<input type="button" id="showTxt" value="Add" onclick="addFunction(\'scripts\')"/>'
//                   + '</fieldset>'
//                 + '</form>'
//               + '</div>';

//   // $('#arraySpot').append(HTMLoutput);
//   // $('#appendTo').append(HTMLarrayValues);

//   return HTMLoutput;
// }
  
// var arrayFields = [ 'Ron', 'John', 'James' ];

// var arrayOfOptions = [ 
//   'Scrolling Divs JavaScript',
//   'JavaScript Tooltips', 
//   'Continuous Scroller', 
//   'Rotating Banner JavaScript', 
//   'Random Image PHP', 
//   'PHP Form Generator', 
//   'PHP Table Class', 
//   'PHP Order Forms',
//   'Test Option' 
// ];

// var variables = {
//   options : arrayOfOptions,
//   existing : arrayFields,
//   attrType : objType
// };

