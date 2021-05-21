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
        removeBtns = $('.remove-item-btn'),
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


  // ---------------------------------------- Page Header ------------------------------------------


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
  $('#tableHeadersandItems').append(headerHTML);

  var inputThings = '<div class="row" id="hacker-list">'
                    + '<div class="col-12">';

    // getting Object names and data
    for (const [key, val] of Object.entries(data)) {

    // displaying Object Name
    var tHeader = '<h1>'+key+'</h1>';

    // creating sortable list library container 
    tHeader += '<div id="'+key+'Container">';



      // creating table input Row
      tHeader += '<div class="row">';

        // setting object type configuration
        var objTypeConfig = config[key];

        // setting table column width for each object type
        var col = 12/(objTypeConfig.list.length);


  // ------------------------------------- The Input Boxes -----------------------------------------


        for (const [inputKey, inputValue] of Object.entries(objTypeConfig.required)) {
          if(inputValue == 'id') {
            tempColumn = col-1;
          }else{
            tempColumn = col;
          } 

          // creating table inputs
          tHeader +=  '<div class="col-'+tempColumn+'">'
                      + '<input type="text" id="'+key+'-'+inputValue+'-field" placeholder="'+inputValue+'" />'
                    + '</div>';
        }

        // create the add button
        addButtonHTML = '<div class="col-1"><button id="add-btn">Add</button></div>';

        // closing table input row and adding the add button
        tHeader += addButtonHTML + '</div>';
        
        
  // -------------------------------------- The Search Box -----------------------------------------


        var searchVariable =  '<div class="row">'
                              + '<div class="col-4">'
                                + '<input class="search" placeholder="Search"/>'
                              + '</div>'
                            + '</div>';
        

  
  // ------------------------------------- The Table Headers ----------------------------------------
  
        // opening table header row
        tHeader += searchVariable + '<div class="row">';
      
        // creating table header from list configuration
        for (const [listKey, listValue] of Object.entries(objTypeConfig.list)) {
          if(listValue == 'id') {
            tempColumn = col-1;
          }else{
            tempColumn = col;
          }
          
          // creating table header HTML
          tHeader += '<div class="col-'+tempColumn+' sort" data-sort="'+listValue+'">'+listValue+'</div>';
        }

      // closing the header row
      tHeader += '</div>';


    //----------------------------------------- Item Rows --------------------------------------------


      var objItems = tHeader;

      // containing list items
      objItems += '<div class="list">';

      // getting item attributes
      for (const [SLKey, SLValue] of Object.entries(val)) {

        // creating the object item rows
        objItems += '<div class="row">';

        // getting list configuration
        for (const [firstKey, firstValue] of Object.entries(objTypeConfig.list)) {

          if(firstValue == "id") {
            var tempCol = col-1;
          }else{
            var tempCol = col;
          }
          // create item columns in HTML
          objItems += '<div class="col-'+tempCol+'"><span class="'+firstValue+'">'+SLValue[firstValue]+'</span></div>'
        }

        // closing object item rows
        objItems += '<div class=col-1>'
                    // + '<button onClick="removeRow();"> - </button>'
                    + '<button class="remove-item-btn"> - </button>'
                  + '</div>';

        // closing object item row
          objItems  += '</div>';
      }

      // closing list items
      objItems += '</div>';

    // closing sortable list library container
    objItems += '</div>';

    // append each entire item row to index.html as it loops
    $('#tableHeadersandItems').append(objItems);

    var options = {
      valueNames: [  ]
    };
    // adding object list to valueNames for sortability
    for(const[sortKey, sortValue] of Object.entries(objTypeConfig.list)) {
      console.log("sortValue is: ", sortValue);
      options.valueNames.push(sortValue);
    }

    var containerList = new List( key+'Container', options);

  }
  $('#tableHeadersandItems').append('</div>');
}
