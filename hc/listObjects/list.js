var options = {
  valueNames: [ 'id', 'name', 'city', 'problem' ]
};

var contactList = new List('contacts', options);

var idField = $('#id-field'),
    nameField = $('#name-field'),
    cityField = $('#city-field'),
    problemField = $('#problem-field'),
    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');

refreshCallbacks();

addBtn.click(function() {
  contactList.add({
    id: Math.floor(Math.random()*110000),
    name: nameField.val(),
    city: cityField.val(),
    problem: problemField.val()
  });
  clearFields();
  refreshCallbacks();
});

editBtn.click(function() {
  var item = contactList.get('id', idField.val())[0];
  item.values({
    id:idField.val(),
    name: nameField.val(),
    city: cityField.val(),
    problem: problemField.val()
  });
  clearFields();
  editBtn.hide();
  addBtn.show();
});

function refreshCallbacks() {
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $(removeBtns.selector);
  editBtns = $(editBtns.selector);
  
  removeBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    contactList.remove('id', itemId);
  });
  
  editBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    var itemValues = contactList.get('id', itemId)[0].values();
    idField.val(itemValues.id);
    nameField.val(itemValues.name);
    cityField.val(itemValues.city);
    problemField.val(itemValues.problem);
    
    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
  nameField.val('');
  cityField.val('');
  problemField.val('');
}
