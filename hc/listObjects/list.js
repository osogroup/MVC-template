$(document).ready(function(){

  var options = {
    valueNames: [ 'id', 'name', 'desc', 'status', 'tags', 'due', 'est' ]
  };

  var contactList = new List('contacts', options);

  var idField = $('#id-field'),
    nameField = $('#name-field'),
    descField = $('#desc-field'),
    statusField = $('#status-field'),
    tagsField = $('#tags-field'),
    dueField = $('#due-field'),
    estField = $('#est-field'),
    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('#remove-item-btn'),
    editBtns = $('.edit-item-btn');

    refreshCallbacks(contactList);

  addBtn.click(function() {
    contactList.add({
      id: Math.floor(Math.random()*110000),
      name: nameField.val(),
      desc: descField.val(),
      status: statusField.val(),
      tags: tagsField.val(),
      due: dueField.val(),
      est: estField.val()
    });
    clearFields();
    refreshCallbacks(contactList);
  });


// editBtn.click(function() {
//   var item = contactList.get('id', idField.val())[0];
//   item.values({
//     id:idField.val(),
//     name: nameField.val(),
//     city: cityField.val(),
//     problem: problemField.val(),
//     solution: solutionField.val()
//   });
//   clearFields();
//   editBtn.hide();
//   addBtn.show();
// });

  function refreshCallbacks(contactList) {
    var idField = $('#id-field'),
      nameField = $('#name-field'),
      descField = $('#desc-field'),
      statusField = $('#status-field'),
      tagsField = $('#tags-field'),
      dueField = $('#due-field'),
      estField = $('#est-field'),
      addBtn = $('#add-btn'),
      editBtn = $('#edit-btn').hide(),
      removeBtns = $('#remove-item-btn'),
      editBtns = $('.edit-item-btn');
    // Needed to add new buttons to jQuery-extended object


    removeBtns.click(function() {
      console.log("Entering remove function", this);
      var itemId = $(this).parent().parent().find('.id').text();
      console.log($(this).parent().parent().find('.id'));
      console.log("this is the item id " + itemId);
      contactList.remove('id', itemId);
    });

    editBtns.click(function() {
      var itemId = $(this).closest('tr').find('.id').text();
      var itemValues = contactList.get('id', itemId)[0].values();
      idField.val(itemValues.id);
      nameField.val(itemValues.name);
      descField.val(itemValues.desc);
      statusField.val(itemValues.status);
      tagsField.val(itemValues.tags);
      dueField.val(itemValues.due);
      estField.val(itemValues.est);

      editBtn.show();
      addBtn.hide();
    });
  }

  function clearFields() {
    idField.val('');
    nameField.val('');
    descField.val('');
    statusField.val('');
    tagsField.val('');
    dueField.val('');
    estField.val('');

  }

  createHTML();

});


const configData = async () => {
  var listConfig = await fetch("../tempData/objectConfig.json").then(response=>{return response.json();});
  console.log("configData output ", listConfig);
  return listConfig;
}



const tempData = async () => {
  var objVars = await fetch("../tempData/listOfObjects.json").then(response=>{return response.json();});
  console.log("tempData output ", objVars);
  return objVars;
}

const createHTML = async () => {
  var data = await tempData();
  var config = await configData();


  // ----------------------------------------------------- Begin listHTML -----------------------------------------------


  var headerHTML = '<div id="contacts" class="container>'
                   + '<div class="row">'
                     + '<div class="col-12">'
                       + '<p id="header">'
                       + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80px">'
                       + '<a class="headerLinks" href="#">Tag</a>'
                       + '<a class="headerLinks" href="#">Task</a>'
                       + '<a class="headerLinks" href="#">Deliverable</a>'
                     + '</p>'
                   + '</div>'
                   + '<h1>OAS Object List'
                 + '</div>'
  $('#TitleOfList').append(headerHTML);

  var inputThings = '<div class="row" id="hacker-list">'
                    + '<div class="col-12">';
  //------------------------------------------------------- Input Boxes ------------------------------------------------------------------

  for (const [key, value] of Object.entries(data.task)) {
    for (const [first, last] of Object.entries(value)) {
      // console.log("this is last ", last);
      inputThings += '<div class="col-3">'
                     + '<input type="text" id="'+first+'-field" placeholder="'+first+'" />'
                   + '</div>';
    }
    inputThings += '<div class="col-1">'
                   + '<button id="add-btn">Add</button>'
                   // + '<button id="edit-btn">Edit</button>'
                 + '</div>'
               + '</div>';
    $('#inputBoxes').append(inputThings);
    break;
  }


  // ----------------------------------------------------- The Search Box ----------------------------------------------------------------


  var searchVariable = '<div class="row">'
                       + '<div class="col-12">'
                         + '<div class="col-4">'
                           + '<input class="search" placeholder="Search"/>'
                         + '</div>'
                       + '</div>'
                     + '</div>';
  $('#searchBar').append(searchVariable);


  // -------------------------------------------------- The Table's Headers -------------------------------------------------------------


  // this nested for loop goes through the JSON file and puts all the values into the columns on the webpage
  // Ex. all the id's and names of projects that you can scroll through, and eventually, remove.
  for (const [key, val] of Object.entries(data)) {
    console.log("val is: ", val);

    // displaying Object Name
    var tHeader = '<h1>'+key+'</h1>';
    // creating table header Row
    tHeader += '<div class="row">';
    // setting object type configuration
    var objTypeConfig = config[key];
    // setting table column width for each object type
    var col = 12/(objTypeConfig.list.length);
    // console.log(key+" configs ", objTypeConfig);
    // creating table header from list configuration
    for (const [listKey, listValue] of Object.entries(objTypeConfig.list)) {
      // console.log("This is list item key: ", listKey);
      // console.log("This is list item value: ", listValue);
      // creating table header HTML
      tHeader += '<div class="col-'+col+'">'
                     + listValue
                   + '</div>';
    }
    // appending tHeader to index.html
    $('#tableHeaders').append(tHeader);


  // putting object item rows
    var objItems = '<div class="row">'

  // getting item attributes
  for (const [firstKey, firstValue] of Object.entries(objTypeConfig.list)) {
    console.log("firstKey is: ", firstKey);
    console.log("firstValue is: ", firstValue);
    for (const [SLKey, SLValue] of Object.entries(val)) {
      console.log("This is SLKey ", SLKey);
      console.log("This is SLValue ", SLValue);
      console.log("This is SLValue[firstValue]: ", firstValue[SLValue]);
      objItems += '<div class="col-"'+col+'>'+firstValue[SLValue]+'</div>'
    }
  }






  // for (const [firstKey, firstValue] of Object.entries(objTypeConfig.list)) {
  //   console.log("firstKey is: ", firstKey);
  //   console.log("firstValue is: ", firstValue);
  //   for (const [SLKey, SLValue] of Object.entries(val)) {
  //     console.log("This is SLKey ", SLKey);
  //     console.log("This is SLValue ", SLValue);
  //     console.log("This is SLValue[firstValue]: ", SLValue[firstValue]);
  //     objItems += '<div class="col-"'+col+'>'+SLValue[firstValue]+'</div>'
  //   }
  // }
  $('#forLoop').append(objItems);
    // getting list configuration

      // create item column HTML

  // append row to index.html






      objItems += '</div>';
    // for (const[prop, access] of Object.entries(val)) {
    //   for (const [property, accessible] of Object.entries(access)) {
    //     console.log("property is: ", property);
    //     console.log("accessible is: ", accessible);
    //
    //     top += '<div class=col-'+col+'>'+property.first+'</div>';
    //   }
    // }

    //------------------------------------------------------ Data Filling ------------------------------------------------------------------






    for (const [kee, value] of Object.entries(val)) {



      // var nameDesc = '<div class="row">'
      //                + '<div class="col-1">'+value.id+'</div>'
      //                + '<div class="col-2">'+value.name+'</div>'
      //                + '<div class="col-2">'+value.description+'</div>';
      //    if (value.status == null) {
      //      nameDesc += '<div class="col-2"></div>';
      //    }
      //    else {
      //      nameDesc += '<div class="col-2">'+value.status+'</div>';
      //    }
      //    if (value.tags == null) {
      //      nameDesc += '<div class="col-1"></div>';
      //    }
      //    else {
      //      nameDesc += '<div class="col-1">'+value.tags+'</div>';
      //    }
      //    if (value.dueDate == null) {
      //      nameDesc += '<div class="col-2"></div>';
      //    }
      //    else {
      //      nameDesc += '<div class="col-2">'+value.dueDate+'</div>';
      //    }
      //    if (value.estEff == null) {
      //      nameDesc += '<div class="col-1"></div>';
      //    }
      //    else {
      //      nameDesc += '<div class="col-1">'+value.estEff+'</div>';
      //    }
      //      nameDesc += '<div class=col-1><button id="remove-item-btn"> - </button></div>'
      //              + '</div>';
      // $('#forLoop').append(nameDesc);
    }
  }
  $('#forLoop').append('</div>');
}





















//
