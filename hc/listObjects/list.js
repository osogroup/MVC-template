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
    var top = '<h1>'+key+'</h1>';
    top += '<div class="row">';
    var listData = config[key];
    var col = 12/(listData.list.length);
    console.log(key+" configs ", listData);
    for (const [first, last] of Object.entries(listData.list)) {
      console.log("This is first ", first);
      console.log("This is last ", last);

      top += '<div class="col-'+col+'">'
                     + last
                   + '</div>';
    }

    for (const [second, secondToLast] of Object.entries(listData.list)) {
      console.log("This is second ", second);
      console.log("This is secondToLast ", secondToLast);
      // top += '<div class="col-'+col+'">'+ /*something goes here with a dot to connect to secondToLast*/ secondToLast+'</div>';
    }
    // for (const[prop, access] of Object.entries(val)) {
    //   for (const [property, accessible] of Object.entries(access)) {
    //     console.log("property is: ", property);
    //     console.log("accessible is: ", accessible);
    //
    //     top += '<div class=col-'+col+'>'+property.first+'</div>';
    //   }
    // }

    //------------------------------------------------------ Data Filling ------------------------------------------------------------------






    top += '</div>';
    $('#forLoop').append(top);
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
