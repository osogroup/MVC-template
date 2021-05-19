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
    removeBtns = $('.remove-item-btn'),
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
    refreshCallbacks();
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
      removeBtns = $('.remove-item-btn'),
      editBtns = $('.edit-item-btn');
    // Needed to add new buttons to jQuery-extended object
    removeBtns = $('.remove-item-btn');
    editBtns = $(editBtns.selector);

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
});


fetch("../tempData/listOfObjects.json")
  .then(response=>{return response.json();})
  .then(data=>console.log(data.task[0]))



var listHTML = '<div id="contacts" class="container>';
    listHTML +=  '<div class="row">';
    listHTML +=  '<div class="col-12">';
    listHTML +=  '<p id="header"><img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80px">'
                 + '<a class="headerLinks" href="#">Tag</a>'
                 + '<a class="headerLinks" href="#">Task</a>'
                 + '<a class="headerLinks" href="#">Deliverable</a>'
               + '</p></div>';
    listHTML +=  '<div class="col-12" id="TitleOfList">OAS'+type+'Object List</div>';
    for (const [kee, va] of Object.entries(objVars.create)) {
      listHTML += '<div class="col-3">'
                  + '<input type="text" id="'+va+'-field" placeholder="'+va+'" />'
                + '</div>';
    }
    listHTML +=  '<div class=col-1">'
                 + '<button id="add-btn">Add</button>'
                 + '<button id="edit-btn">Edit</button>'
                 + '</div>'
               + '</div>';


// let requestURL = 'https://github.com/osogroup/MVC-template/blob/main/hc/tempData/listOfObjects.json';

// let request = new XMLHttpRequest();

// request.open('GET', requestURL, true);

// request.responseType = 'json';

// request.send();

// request.onload = function() {
//   const tasks = request.response;
//   showTasks(tasks);
// }

// function showTasks(obj) {
//   const tasks = obj['task'];
//   for (var i = 0; i < tasks.length; i++) {

//     const myDiv = document.createElement('div');

//     myDiv.textContent = tasks[i].id;
//   }
// }
