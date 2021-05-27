$(document).ready(function(){
  
  // createHTML();
  doTheHTML();
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













function anyChange(str) {
  var change = document.getElementById('inputBox'+str);
  var changeValue = change.value;

  console.log("Text Box contains..", changeValue);
  console.log("str is: ", str);
  localStorage.setItem(str, changeValue);
  console.log(localStorage);
}

function doTheHTML() {
  
  console.log(localStorage);
  var inputBox = '<br><br><br><div class="row"><div class="col-8">Name</div>'
                 + '<input class="col-8" id="inputBoxname" type="textarea" placeholder="name" value="localStorage.getItem(name)" oninput="anyChange(this.placeholder)"></div>';
     inputBox += '<div class="row"><div class="col-8">Age</div>'
                 + '<input class="col-8" id="inputBoxage" type="textarea" placeholder="age" value="localStorage.getItem(name)" oninput="anyChange(this.placeholder)"></div>';

  $('#everything').append(inputBox);

}


