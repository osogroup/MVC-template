$(document).ready(function(){
  
  var options = {
    valueNames: [ 'id', 'name', 'city', 'problem', 'solution' ]
  };

  var contactList = new List('contacts', options);

  var idField = $('#id-field'),
    nameField = $('#name-field'),
    cityField = $('#city-field'),
    problemField = $('#problem-field'),
    solutionField = $('#solution-field'),
    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');
  
    refreshCallbacks(contactList);

  addBtn.click(function() {
    contactList.add({
      id: Math.floor(Math.random()*110000),
      name: nameField.val(),
      city: cityField.val(),
      problem: problemField.val(),
      solution: solutionField.val()
    });
    clearFields();
    refreshCallbacks();
  });
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
    cityField = $('#city-field'),
    problemField = $('#problem-field'),
    solutionField = $('#solution-field'),
    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $('.remove-item-btn');
  editBtns = $(editBtns.selector);
  
  removeBtns.click(function() {
    console.log("Entering remove function", this);
    var itemId = $(this).parent().parent().find('.name').text();
    console.log($(this).parent().parent().find('.name'));
    console.log("this is the item name " + itemId);
    contactList.remove('name', itemId);
  });
  
  editBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    var itemValues = contactList.get('id', itemId)[0].values();
    idField.val(itemValues.id);
    nameField.val(itemValues.name);
    cityField.val(itemValues.city);
    problemField.val(itemValues.problem);
    solutionField.val(itemValues.solution);
    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
  nameField.val('');
  cityField.val('');
  problemField.val('');
  solutionField.val('');
}
