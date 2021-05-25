$(document).ready(function(){
  
  // console.log("objType in the JS file " , objType);

  createHTML();

  // var options = {
  //   valueNames: [ 'id', 'name', 'desc', 'status', 'tags', 'due', 'est' ]
  // };

  // var contactList = new List('contacts', options);
  
  // var idField = $('#id-field'),
  // nameField = $('#name-field'),
  // descField = $('#desc-field'),
  // statusField = $('#status-field'),
  // tagsField = $('#tags-field'),
  // dueField = $('#due-field'),
  // estField = $('#est-field'),
  // addBtn = $('#add-btn'),
  // editBtn = $('#edit-btn').hide(),
  // removeBtns = $('.remove-item-btn'),
  // editBtns = $('.edit-item-btn');
  
  
  // refreshCallbacks(contactList);
  
  // addBtn.click(function() {
  //   contactList.add({
  //     id: Math.floor(Math.random()*110000),
  //     name: nameField.val(),
  //     desc: descField.val(),
  //     status: statusField.val(),
  //     tags: tagsField.val(),
  //     due: dueField.val(),
  //     est: estField.val()
  //   });
  //   clearFields();
  //   refreshCallbacks(contactList);
  // });
  
  
  // // editBtn.click(function() {
  // //   var item = contactList.get('id', idField.val())[0];
  // //   item.values({
  //   //     id:idField.val(),
  //   //     name: nameField.val(),
  //   //     city: cityField.val(),
  //   //     problem: problemField.val(),
  //   //     solution: solutionField.val()
  //   //   });
  //   //   clearFields();
  //   //   editBtn.hide();
  //   //   addBtn.show();
  //   // });
  
  // function refreshCallbacks(contactList) {
  //   var idField = $('#id-field'),
  //   nameField = $('#name-field'),
  //   descField = $('#desc-field'),
  //   statusField = $('#status-field'),
  //   tagsField = $('#tags-field'),
  //   dueField = $('#due-field'),
  //   estField = $('#est-field'),
  //   addBtn = $('#add-btn'),
  //   editBtn = $('#edit-btn').hide(),
  //   removeBtns = $('.remove-item-btn'),
  //   editBtns = $('.edit-item-btn');
  //   // Needed to add new buttons to jQuery-extended object
    
  //   removeBtns.click(function() {
  //     console.log("Entering remove function", this);
  //     var itemId = $(this).parent().parent().find('.id').text();
  //     console.log($(this).parent().parent().find('.id'));
  //     console.log("this is the item id " + itemId);
  //     contactList.remove('id', itemId);
  //   });
    
    
  //   editBtns.click(function() {
  //     var itemId = $(this).closest('tr').find('.id').text();
  //     var itemValues = contactList.get('id', itemId)[0].values();
  //     idField.val(itemValues.id);
  //     nameField.val(itemValues.name);
  //     descField.val(itemValues.desc);
  //     statusField.val(itemValues.status);
  //     tagsField.val(itemValues.tags);
  //     dueField.val(itemValues.due);
  //     estField.val(itemValues.est);
      
  //     editBtn.show();
  //     addBtn.hide();
  //   });
  // }
  
  // function clearFields() {
  //   idField.val('');
  //   nameField.val('');
  //   descField.val('');
  //   statusField.val('');
  //   tagsField.val('');
  //   dueField.val('');
  //   estField.val('');
  // }      
});
    
// gets all the Objects/Arrays from objectConfig.json and returns them
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

// gathers, sorts, and organizes all the Objects and data from the JSON files, generates HTML, and appends it to #TitleOfList in index.html
const createHTML = async () => {
  console.log("Entering createHTML()");
  var data = await tempData();
  var config = await configData();


  // ---------------------------------------- Page Header ------------------------------------------


  var headerHTML = '<div id="contacts">'
                   + '<div class="row">'
                     + '<div class="col-12">'
                       + '<p id="header">'
                       + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80">';

  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML +=        '<a class="headerLinks" href="/hc/listObjects/?type='+headerKey+'">'+headerKey+'</a>';
  }

        headerHTML  += '</p>'
                   + '</div>'
                   + '<h1>OAS Object List</h1>'
                 + '</div>'
  $('#TitleOfList').append(headerHTML);

  // console.log("objType in createHTML() ", objType);

  // creating object row
  var inputThings = '<div class="row hacker-list">'
                   + '<div class="col-12">';

    // getting Object names and data
    // for (const [key, val] of Object.entries(data)) {

    // displaying Object Name
    var tHeader = inputThings + '<h1>'+objType+'</h1>';

    // creating sortable list library container 
    tHeader += '<div id="'+objType+'Container">';

      // creating table input Row
      tHeader += '<div class="inputBoxes row">';

        // setting object type configuration
        var objTypeConfig = config[objType];

        // setting table column width for each object type
        var col = 12/(objTypeConfig.list.length);


  // ------------------------------------- The Input Boxes -----------------------------------------

        // getting config Objects and data
        for (const [inputKey, inputValue] of Object.entries(objTypeConfig.required)) {

          // making id columns narrower to fit more things on the page
          if(inputValue == 'id') {
            tempColumn = col-2;
          }else{
            tempColumn = col;
          } 

          // creating table inputs
          tHeader +=  '<div class="col-'+tempColumn+'">'
                      + '<input type="text" id="'+objType+'-'+inputValue+'-field" placeholder="'+inputValue+'" />'
                    + '</div>';
        }

        // creating the add button HTML
        addButtonHTML = '<div class="col-1"><button class="edit-btn">Apply</button><button class="add-btn">Add</button></div>';

        // closing table input row and adding addButtonHTML to tHeader
        tHeader += addButtonHTML + '</div>';
        
        
  // -------------------------------------- The Search Box -----------------------------------------

        // creating the search box and designating its own row
        var searchVariable =  '<div class="searchBox row">'
                              + '<div class="col-4">'
                                + '<input class="search" placeholder="Search"/>'
                              + '</div>'
                            + '</div>';
        

  
  // ------------------------------------- The Table Headers ----------------------------------------
  
        // opening table header row and adding The Search Box to tHeader
        tHeader += searchVariable + '<div class="tableHeader row">';
      
        // creating table header from list configuration
        for (const [listKey, listValue] of Object.entries(objTypeConfig.list)) {
          if(listValue == 'id') {
            tempColumn = col-2;
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
      objItems += '<div class="inputValues list">';

      // getting item attributes
      // console.log("THIS IS MY FOCUS", data[objType]);
      for (const [SLKey, SLValue] of Object.entries(data[objType])) {
        // creating the object item rows
        objItems += '<div class="row">';

        // getting list configuration
        for (const [firstKey, firstValue] of Object.entries(objTypeConfig.list)) {

          if(firstValue == "id") {
            var tempCol = col-2;
          }else{
            var tempCol = col;
          }
          // create item columns in HTML
          objItems += '<div class="col-'+tempCol+'"><span class="'+firstValue+'">'+SLValue[firstValue]+'</span></div>';
        }

        // closing object item rows
        objItems += '<div class=col-1><a href="/hc/editObject/?type='+objType;

        var objTypeData = data[objType];
        // for loop to get all the editable fields
        for (const[editableKey, editableValue] of Object.entries(SLValue)) {
          console.log("This is editableValue: ", editableValue);
          objItems += '&item'+editableValue+'='+editableKey[editableValue];
        } 
        objItems += '"><button class="edit-item-btn"> Edit </button></a>'
                + '</div>'
                + '<div class=col-1>'
                  + '<button class="remove-item-btn"> Remove </button>'
                + '</div>';

        // closing object item row
          objItems  += '</div>';
      }

      // closing list items
      objItems += '</div>';

    // closing sortable list library container
    objItems += '</div>';

    // append each entire item row to index.html as it loops
    $('#TitleOfList').append(objItems);

    // valueNames instantiation
    var options = {
      valueNames: [  ]
    };

    // adding object list to valueNames for sortability
    for(const[sortKey, sortValue] of Object.entries(objTypeConfig.list)) {
      options.valueNames.push(sortValue);
    }

    // creating
    
    // closing each id=hacker-list div
    $('#TitleOfList').append('</div>');

    var containerList = {};
    containerList[objType] = new List(objType+'Container', options);
    
    refreshCallbacks(containerList[objType]);

    // variable declaration
    var idField = $('#'+objType+'-id-field'),
    nameField = $('#'+objType+'-name-field'),
    descField = $('#'+objType+'-desc-field'),
    statusField = $('#'+objType+'-status-field'),
    tagsField = $('#'+objType+'-tags-field'),
    dueField = $('#'+objType+'-due-field'),
    estField = $('#'+objType+'-est-field'),
    editBtn = $('.edit-btn').hide(),
    addBtn = $('.add-btn');

    // pushes the edited values into the rows to be updated
    editBtn.click(function() {
      var item = containerList[objType].get('id', idField.val())[0];
      item.values({
        id:idField.val(),
        name: nameField.val()
        // city: cityField.val(),
        // problem: problemField.val(),
        // solution: solutionField.val()
      });
      clearFields();
      editBtn.hide();
      addBtn.show();
    });

    function refreshCallbacks(obj) {
      var idField = $('#'+objType+'-id-field'),
      nameField = $('#'+objType+'-name-field'),
      descField = $('#'+objType+'-desc-field'),
      statusField = $('#'+objType+'-status-field'),
      tagsField = $('#'+objType+'-tags-field'),
      dueField = $('#'+objType+'-due-field'),
      estField = $('#'+objType+'-est-field'),
      addBtn = $('.add-btn'),
      editBtn = $('.edit-btn').hide(),
      removeBtns = $('.remove-item-btn'),
      MultipleEditBtns = $('.edit-item-btn');
      
      // removes a row of data from the container
      removeBtns.click(function() {
        console.log("Entering remove function", this);
        var listContainer = $(this).parent().parent().parent().parent().attr('id');
        var itemId = $(this).parent().parent().find('.id').text();
        console.log("this is the item id " + itemId);
        var obj = new List(listContainer, options);
        obj.remove('id', itemId);
      });
      
      // pulls the value from the rows and puts them into the input boxes for editing 
      MultipleEditBtns.click(function() {
        var itemId = $(this).parent().parent().find('.id').text();
        var itemValues = obj.get('id', itemId)[0].values();
        idField.val(itemValues.id);
        nameField.val(itemValues.name);
        // descField.val(itemValues.desc);
        // statusField.val(itemValues.status);
        // tagsField.val(itemValues.tags);
        // dueField.val(itemValues.due);
        // estField.val(itemValues.est);
        
        editBtn.show();
        addBtn.hide();
      });
      // Exit of refreshCallbacks();
    }

    // adds what is typed into the input fields into a new row
    addBtn.click(function() {
      console.log("Entering addBtn.click(function() {...}");
      containerList[objType].add({
        id: idField.val(),
        name: nameField.val()
        // id: Math.floor(Math.random()*110000),
        // desc: descField.val(),
        // status: statusField.val(),
        // tags: tagsField.val(),
        // due: dueField.val(),
        // est: estField.val()
      });
      clearFields();
      refreshCallbacks(containerList[objType]);
    });

    // clears the input fields after "Edit" or "Add" buttons are pushed
    function clearFields() {
      idField.val('');
      nameField.val('');
      descField.val('');
      statusField.val('');
      tagsField.val('');
      dueField.val('');
      estField.val('');
    }

    // Exiting the last forOf loop
  // }
  console.log("Exiting createHTML(), Buttons ready..");
}