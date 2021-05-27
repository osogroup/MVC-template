$(document).ready(function(){
  
  // createHTML();
  // doTheHTML();
  doTheStringify();
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

const createHTML = async () => {
  var data = await tempData();
  var config = await configData();

  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
    + '<p id="header">'
      + '<img id="imageSpacing" src="MindfulMeasuresLogo.png" alt="LogoImage" width="50">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML += '<a class="headerLinks" href="?type='+headerKey+'">'+headerKey.toUpperCase()+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // making a propt scenario where there is no object type selected
  if (objType == null) {
    headerHTML += '<h1>Select Item from Header to Create Item...</h1>';
  }
  else {
    headerHTML += '<h1>Create '+objType+' Item</h1>';
  }
  headerHTML += '</div>';
  $('#everything').append(headerHTML);
  
}

























function doTheHTML() {
  
  console.log(localStorage);
  var inputBox = '<br><br><br><div class="row"><div class="col-8">Name</div>'
                 + '<input class="col-8" id="inputBoxname" type="textarea" placeholder="name" value="'+localStorage.getItem("name")+'" oninput="anyChange(this.placeholder)"></div>';
     inputBox += '<div class="row"><div class="col-8">Age</div>'
                 + '<input class="col-8" id="inputBoxage" type="textarea" placeholder="age" value="'+localStorage.getItem("age")+'" oninput="anyChange(this.placeholder)"></div>';
  $('#everything').append(inputBox);

}















function anyChange(str) {
  console.log("This is the str: ", str);
  var myString = localStorage.getItem(objType+ '_' +objItemID);
  console.log("This is myString", myString);
  var myObject = JSON.parse(myString);
  console.log("This is myObject: ", myObject);
  var change = document.getElementById('input'+str);
  var changeValue = change.value;
  console.log("This is changeValue: ", changeValue);

  var itemKey = objType+ '_' +objItemID;

  // localStorage.setItem(itemKey.str, changeValue);
  // console.log(localStorage);
}

const doTheStringify = async () => {
  var data = await tempData();
  var config = await configData();
  var objTypeData = data[objType];
  var configTypeData = config[objType];


  // example localStorage(task_0, '{"id":0,"name":"COI: Design Wireframes","description":"These tasks will result in a user interface to create an object item.","status":"in-progress","tags":[0],"dueDate":"5/15/2021","estEff":10}');

  var exampleObj = {"id":0,"name":"COI: Design Wireframes","description":"These tasks will result in a user interface to create an object item.","status":"in-progress","tags":[0],"dueDate":"5/15/2021","estEff":10};

  // console.log("This is exampleObj: ", exampleObj);

  var exampleJSON = JSON.stringify(exampleObj);

  // console.log("This is exampleJSON: ", exampleJSON);

  // console.log("Name via exampleObj: ", exampleObj.name);

  var JSONObject = JSON.parse(exampleJSON);

  // console.log("This one's the JSONObject ", JSONObject);

  // console.log("JSONObject.name... ", JSONObject.name);


  var objectKeys = objType + '_' + objItemID;
  console.log("This is objectKeys: ", objectKeys);
  var objItem = {};

  // if item exists 
  if (localStorage.getItem(objectKeys) != null) {
    console.log("objectKeys exists..!");
    console.log(localStorage);

    // pull item from localStorage
    localStorage.getItem(objType+'_'+objItemID);

  } 
  else {
    console.log("objectKeys doesn't exist yet..!");
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
        console.log("This is objItem: ", objItem);
        var objItemString = JSON.stringify(objItem);
        console.log("This is objItemString: ", objItemString);
        localStorage.setItem(objectKeys, objItemString);
        console.log(localStorage);
      }
    }
  }
  
  // creating item header row
  var headerHTML = '<div class="row">';

  // create HTML header and fields
  for (const [headerKey, headerValue] of Object.entries(objTypeData[objItemID])) {
    console.log("This is headerKey", headerKey); // id, name
    console.log("This is headerValue", headerValue); // 1, COI: Static Site HTML Structure

    headerHTML += '<div class="col-4 minHeight">'
                  + '<div class="col-12">'+headerKey+'</div>';
    if (configTypeData.editable.includes(headerKey) == true)
    {
      // making object item an input textbox
      headerHTML += '<br><input class="col-12" id="input'+headerKey+'" type="textarea" value="'+headerValue+'" placeholder="'+headerKey+'" oninput="anyChange(this.placeholder)">';
    }
    else
    {
      // making object item a regular div
      headerHTML += '<br><div class="col-12">'+headerValue+'</div>';
    }

    // closing object item column
    headerHTML += '</div>';
  }

  // closing item header row
  headerHTML += '</div>';
  $('#everything').append(headerHTML);


}

// update localStorage values when input fields are changed

//   update objItem with new changes
//   stringify updated objItem
//   save (localStorage(<type_id>, objItem))
















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
