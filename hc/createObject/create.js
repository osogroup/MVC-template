$(document).ready(function(){
  if (objType == null)
  alert("add '?type=task' to the URL");
  
  createHTML();
  createHTML2();
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

var arrayFields = [ /* 'Ron', 'John', 'James' */ ];
var i = 0;

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
  // arrayFields.push('Peter');
  // arrayFields.push('James');
  // arrayFields.push('John');
  // localStorage.setItem('task_0', arrayFields);


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

  var HTMLarray = '';
  var HTMLarrayValues = '';


  // ---------------------------------------------- Display Array ----------------------------------------------


  HTMLarray += '<form action="#" method="post" class="demoForm">'
                + '<fieldset>'
                  + '<legend>Get Text of Selected Option</legend>'
                  + '<div id="outerDiv">'
                    + '<div id="appendTo"></div>'
                  + '</div>';

  // showing all the items in the arrayFields array (none if the array is preset as empty)
  for (const[arrayKey, arrayValue] of Object.entries(arrayFields)) {
    // (arrayKey: 0, 1, 2)
    // (arrayValue: peter, james, john)
    HTMLarrayValues +=    '<div class="row"><div class="col-6">'+arrayValue+'</div><div class="col-1"><input type="button" id="remvBtn'+arrayKey+'" value="-" onclick="removeFunction('+arrayKey+')"></div></div>';
    
    // counts up the indices if there's any preset values in the array (uncommon)
    i++;
  }

  // creating the select tag
  HTMLarray +=      '<br><select id="scripts" name="scripts">';

  // creating all the options from the arrayOfOptions array in the select tag
  for (const [optionKey, optionValue] of Object.entries(arrayOfOptions)) {
    HTMLarray +=       '<option value="'+optionValue+'">'+optionValue+'</option>';
  }

  // closing the form tags and creating the add button
  HTMLarray +=       '</select>'
                    + '<input type="button" id="showTxt" value="Add"/>'
                + '</fieldset>'
              + '</form>';

  // HTMLoutput += '<button onclick="generateID()">Run generateID()</button>';


  $('#arraySpot').append(HTMLarray);
  $('#appendTo').append(HTMLarrayValues);

  // begin addFunction()
  (function() {
    
    // get reference to select tag's id
    var select = document.getElementById('scripts');


    // ---------------------------------------------- Add function ----------------------------------------------

    // creating Add button click function
    document.getElementById('showTxt').onclick = function () {

      // access text property of selected option
      elementVal = select.options[select.selectedIndex].text;
      arrayFields.push(elementVal);
      
      // adding a new row and columns to the HTML
      var HTMLelement = '<div class="row"><div class="col-6">'+elementVal+'</div><div class="col-1"><input type="button" id="remvBtn'+i+'" value="-" onclick="removeFunction('+i+')"></div></div>';
      $('#appendTo').append(HTMLelement);

      // adjusting indices
      i++;
    }
  }());
}


// ---------------------------------------------- Remove funtion ----------------------------------------------


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
    HTMLelement += '<div class="row"><div class="col-6">'+elementValue+'</div><div class="col-1"><input type="button" id="remvBtn'+elementKey+'" value="-" onclick="removeFunction('+elementKey+')"></div></div>';
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


// const generateID = async () => {
//   var data = await tempData();
//   // console.log("This is data: ", data);
//   var objTypeData = data[objType];
//   // console.log("This is objTypeData: ", objTypeData);

//   var i = 0;
//   for(const [idKey, idValue] of Object.entries(objTypeData)) {
//     i++;
//   }
//   console.log("This is i: ", i);
//   return i;
// }









var fillFields =  { 
  'option 1': 'Filler Text 1 Filler Text 1',
  'option 2': 'Filler Text 2 Filler Text 2',
  'option 3': 'Filler Text 3 Filler Text 3',
  'option 4': 'Filler Text 4 Filler Text 4',
  'option 5': 'Filler Text 5 Filler Text 5',
  'option 6': 'Filler Text 6 Filler Text 6',
  'option 7': 'Filler Text 7 Filler Text 7' 
};







function createHTML2() {
  console.log("Entering createHTML2()...");

  var outputHTML = '';

  outputHTML += '<form>'
                + '<fieldset>'
                  + '<legend>Object List</legend>'
                  + '<div id="objOuter">'
                    + '<div id="objAppend"></div>'
                  + '</div>'
                  + '<br><select>';

  for (const [objectKey, objectValue] of Object.entries(fillFields)) {
  outputHTML +=        '<option>'+objectKey+'</option>';
  }
  outputHTML +=     + '<input type="button" id="showObj" value="+">'
                  + '</select>'
                + '</fieldset>'
              + '</form>';
              
  $('#objectSpot').append(outputHTML);

  console.log("Exiting createHTML2()...");
}





















































//   // making a propt scenario where there is no object type selected
//   if (objType == null) {
//     HTMLoutput += '<h1>Select Item from Header to Create Item...</h1>';
//   }
//   else {
//     HTMLoutput += '<h1>Create '+objType+' Item</h1>';
//   }
//   HTMLoutput += '</div>';
//   $('#everything').append(HTMLoutput);


// function doTheHTML() {
  
//   console.log(localStorage);
//   var inputBox = '<br><br><br><div class="row"><div class="col-8">Name</div>'
//                  + '<input class="col-8" id="inputBoxname" type="textarea" placeholder="name" value="'+localStorage.getItem("name")+'" oninput="anyChange(this.placeholder)"></div>';
//      inputBox += '<div class="row"><div class="col-8">Age</div>'
//                  + '<input class="col-8" id="inputBoxage" type="textarea" placeholder="age" value="'+localStorage.getItem("age")+'" oninput="anyChange(this.placeholder)"></div>';
//   $('#everything').append(inputBox);

// }




// function showValue() {
//   var superKey = objType+ '_' +objItemID;
//   var superObject = JSON.parse(localStorage.getItem(superKey));
//   console.log(superObject);
// }

// function showData() {
//   console.log(localStorage);
// }

// function anyChange(str) {
//   var superKey = objType+ '_' +objItemID;
//   // console.log("This is the str: ", str);
//   var myString = localStorage.getItem(superKey);
//   // console.log("This is myString", myString);
//   var myObject = JSON.parse(myString);
//   // console.log("This is myObject: ", myObject);
//   var change = document.getElementById('input'+str);
//   var changeValue = change.value;
//   myObject[str] = changeValue;
//   // console.log("this is myObject[str]", myObject[str]);
//   backToString = JSON.stringify(myObject);
//   // console.log("This is backToString ", backToString);
//   localStorage.setItem(superKey, backToString);
// }


// const doTheStringify = async () => {

//   if(objType == null || objItemID == null) {
//     alert('Please enter "?type=task&itemid=0" at the end of the current URL');
//   }
//   else {
//     var data = await tempData();
//     var config = await configData();
//     var objTypeData = data[objType];
//     var configTypeData = config[objType];


//     // -------------------------------------------- Navigation Bar --------------------------------------------


//     var HTMLoutput = '<div id="contacts">'
//     + '<div class="row">'
//       + '<p id="header" class="col-12">'
//         + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="50">';
    
//     // creating the links for the header
//     for(const [headerKey, headerValue] of Object.entries(data)) {
//       HTMLoutput += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
//     }
    
//     // closing header row
//     HTMLoutput += '</p>';
  
//     // H1 header to let the user know which object they're editing
//     HTMLoutput += '<h1>Edit '+objType+' Item</h1>'
//               + '</div>';

//     var objectKeys = objType + '_' + objItemID;
//     // console.log("This is objectKeys: ", objectKeys);
//     var objItem = {};

//     // if item exists 
//     if (localStorage.getItem(objectKeys) != null) {
//       var forOfLoop = JSON.parse(localStorage.getItem(objectKeys));
//       console.log("objectKeys exists..!");
//       console.log(localStorage);

//       // pull item from localStorage
//       localStorage.getItem(objType+'_'+objItemID);

//       // create HTML header and fields
//     } 
//     else {
//       var forOfLoop = objTypeData[objItemID]
//       console.log("objectKeys was just created..!");
//       var repositoryItem = data[objType];
//       // console.log("This is the repositoryItem..", repositoryItem);
//       // console.log("This is repositoryItem[0]", repositoryItem[0]);

//       //   pull item from repository (get item by using "var objTypeData = data[objType]";)

//       //   if object id is equal to the one im searching for
//       for(const[repositoryKey, repositoryValue] of Object.entries(data[objType])) {
//         // console.log("This is repositoryKey: ", repositoryKey); // this is the id number 
//         // console.log("This is repositoryValue: ", repositoryValue); // this is the object
//         if (objType+'_'+repositoryKey == objectKeys) {
//           objItem = repositoryItem[repositoryKey];
//           // console.log("This is objItem: ", objItem);
//           var objItemString = JSON.stringify(objItem);
//           // console.log("This is objItemString: ", objItemString);
//           localStorage.setItem(objectKeys, objItemString);
//           console.log(localStorage);
//         }
//       }


//     // --------------------------------------- Item Header and Inputs ---------------------------------------

      
//     }
//     // creating item header row
//     HTMLoutput += '<div class="row">';

//     // create HTML header and fields
//     for (const [headerKey, headerValue] of Object.entries(forOfLoop)) {
//       // console.log("This is headerKey", headerKey); // id, name
//       // console.log("This is headerValue", headerValue); // 1, COI: Static Site HTML Structure
//       HTMLoutput += '<div class="col-4 minHeight">'
//                     + '<div class="col-12">'+headerKey+'</div>';
//       if (configTypeData.editable.includes(headerKey) == true)
//       {

//         // making object item an input textbox
//         HTMLoutput += '<br><input class="col-12" id="input'+headerKey+'" type="textarea" value="'+headerValue+'" placeholder="'+headerKey+'" oninput="anyChange(this.placeholder)" onchange="showData()">';
//       }
//       else
//       {

//         // making object item a regular div
//         HTMLoutput += '<br><div class="col-12">'+headerValue+'</div>';
//       }

//       // closing object item column
//       HTMLoutput += '</div>';
//     }

//     // closing item header row
//     HTMLoutput += '</div>';

//     // Update button that will activate a function that outputs the value to the console
//     HTMLoutput += '<div class="row">';

//     HTMLoutput += '<div class="col-10"></div>'
//                 + '<div class="col-2"><button onclick="showValue()">Update</button></div>';

//     HTMLoutput += '</div>';

//     $('#everything').append(HTMLoutput);
//   }
// }






































// update localStorage values when input fields are changed

//   update objItem with new changes
//   stringify updated objItem
//   save (localStorage(<type_id>, objItem))









  // example localStorage(task_0, '{"id":0,"name":"COI: Design Wireframes","description":"These tasks will result in a user interface to create an object item.","status":"in-progress","tags":[0],"dueDate":"5/15/2021","estEff":10}');

  var exampleObj = {"id":0,"name":"COI: Design Wireframes","description":"These tasks will result in a user interface to create an object item.","status":"in-progress","tags":[0],"dueDate":"5/15/2021","estEff":10};

  // console.log("This is exampleObj: ", exampleObj);

  var exampleJSON = JSON.stringify(exampleObj);

  // console.log("This is exampleJSON: ", exampleJSON);

  // console.log("Name via exampleObj: ", exampleObj.name);

  var JSONObject = JSON.parse(exampleJSON);

  // console.log("This one's the JSONObject ", JSONObject);

  // console.log("JSONObject.name... ", JSONObject.name);








// check if item (type_id) exists in localStorage

  // pull item from localStorage and set objectItem

// elseif item doesn't exist then pull data from the object list

  // pull item out of the object list

  // get the objItem by using object type (see line 39 in edit.js)

  // if object id is equal to the one i want then set that object item into objItem

  // set object item 

// create HTML header and fields

// when input changes set localStorage

  // update objItem with new changes

  // stringify updated objItem (JSON.stringify(objItem))

  // save to localStorage (with type_id as the localStorage key and the objItem is the value)

  // 
