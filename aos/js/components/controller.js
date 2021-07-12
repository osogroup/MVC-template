function viewController(vcVars){
    console.log(vcVars);
    var objs = new Object();
    var html = '';
    if(vcVars.vConfig.view == "adminList"){
        $.ajax({
            url: vcVars.vConfig.urlRoot+'/controllers/ajax/crudObjs.php',
            type: "POST",
            data: {
                crud:"gtObjs",
                objType: vcVars.vConfig.type,
                objs:"all"
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log('sucess');
                $.getScript(vcVars.vConfig.dpath+"/views/list.js", function() {
                    htmlObj = listHTML(data,vcVars.vConfig.type);
                    //console.log(html);
                    $('#view').html(htmlObj.html);
                    var fIelds = htmlObj.fields;
                    var optFields = fIelds.push('id');
                    var options = {
                      valueNames: fIelds
                    };

                    var userList = new List('sortList', options);
                    console.log('User list Options',options);
                });
            },
            error: function (error) {
                console.log(error.responseText);
                console.log('error');
                $('#errors').html(error.responseText);
            }
        });   
    }else if(vcVars.vConfig.view == "adminEdit"){
        $.getScript(vcVars.vConfig.dpath+"/views/edit.js", function() {
            editHTML(vcVars)
                .then(pgData => {
                    $('#pgData').val(pgData.pgjson);
                    $('#view').html(pgData.html);
                });
        });
    }else if(vcVars.vConfig.view == "overview"){
        $('head').append(vcVars.vConfig.dpath+"/js/vendor/reveal_js/");
        $.getScript(vcVars.vConfig.dpath+"/views/overview.js", function() {
            overHTML(vcVars)
                .then(pgData => {
                    $('#pgData').val(pgData.pgjson);
                    $('#view').addClass('reveal');
                    $('#view').html(pgData.html);
                    Reveal.initialize({
                        hash: true,
                        transition: 'slide',
                        margin: .002,
                        // width: 1280,
                        // height: 720, 
                        //center: false,
                        // Learn about plugins: https://revealjs.com/plugins/
                        plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
                    });
                });
        });
    }else if(vcVars.vConfig.view == "create"){
        //$('head').append(vcVars.vConfig.dpath+"/js/vendor/reveal_js/");
        $.getScript(vcVars.vConfig.dpath+"/views/create.js", function() {
            createHTML(vcVars)
                .then(pgData => {
                    $('#pgData').val(pgData.pgjson);
                    $('#view').addClass('create');
                    $('#view').html(pgData.html);

                });
        });
    }
}

//Object Controller Functions

const crudObj = async (vars) =>{
    console.log('CRUD Obj Vars',vars);
    //set FormData to be sent to PHP
    var formData = new FormData();
    // formData.append('debug', true);
    formData.append('ver',2);
    formData.append('crud', vars.crud);
    formData.append('objType', vars.type);
    // Sort by crud
    var crud = vars.crud;
    if(crud == 'gtObjs'){
        formData.append('docId', vars.docId);
        formData.append('objs', vars.objs);
        // formData.append('debug', true);


    }else if(crud == 'qryObjs'){
        formData.append('query', JSON.stringify(vars.query));
        //formData.append('debug', true); 

    }else{
        if(!(vars.fields == undefined || vars.fields == null)){
            if(crud == 'crtObjs'){
                vars.fields.id = await nxtObjId(vars);
                vars.fields.docId = vars.fields.id+'_'+vars.fields.type;
                formData.append('docId', vars.fields.docId); 
                //formData.append('debug', true); 
            }
            vars.setObj = await setObj(vars);
            console.log('Set objs', JSON.stringify(vars.setObj));
            formData.append('setObj',JSON.stringify(vars.setObj));
        }else{
            var err = {
                error:"fields not set"
            };
            return err;
        }  
    }
    console.log(crud+ ' is making Call with', formData);
    const objs = await fetch(vars.urlRoot+'/controllers/ajax/crudObjs.php', {
        method: 'post',
        body: formData
    });
    const json = await objs.json();
    console.log('crudObj output: '+crud,json);
    return json; 
}

const setObj = async (vars) => {
    const objAtts = await fetch(vars.urlRoot+'/home/config/'+vars.type+'Obj.json');
    const json = await objAtts.json();
    vars.objAtts = json[vars.type];
    console.log('obj Atts '+vars.type, vars.objAtts);
    const fields = vars.fields;
    const outObj = {};
    for (const [objf, atts] of Object.entries(vars.objAtts)) {
        if(fields.hasOwnProperty(objf)){
            outObj[objf] = fields[objf];
        }else{
            if(atts.required==true){
                if(atts.type == "int"){
                    outObj[objf] = 0; 
                }else if(atts.type == "array"){
                    outObj[objf] = ["Error No Value"];
                }else if(atts.type == "object"){         
                    outObj[objf] = {
                        "error":"Error No Value"
                    };
                }else {
                    outObj[objf] = "Error No Value";
                }
            }else{
                outObj[objf] = null;
            } 
        }
    }
    console.log("Output Object",outObj);
    return outObj;
}

const nxtObjId = async (vars) =>{

    var nxtId = {
        crud:"qryObjs",
        type:vars.type,
        urlRoot:vars.urlRoot,
        query:{
            type:"nxtId",
            field:"id",
            order:"DESC",
            limit:1
        }
    }
    const idrep = await crudObj(nxtId);
    var nwId = 0;
    console.log("idep", idrep);
    for (const [key, val] of Object.entries(idrep)) {
        nwId = val['id']+1;
    }
    console.log("nxtObjId output", nwId);

    return nwId;
}




//Older Functions
async function crtObjPg (){
    const pgData = JSON.parse($('#pgData').val());
    console.log('crtObj pgData',pgData);
    const pgObj = pgData.json.object;
    pgData.json.object.lastMod = new Date();
    const upfors = pgObj;
    const vars = {
        crud:'crtObjs',
        type:pgData.type,
        fields:upfors,
        urlRoot:pgData.urlRoot
    };
    console.log('crtObj pgData',vars);
    const response = await crudObj(vars);
    console.log('Obj Update Response',response);
    const nwObj = response;
    var urlLoc = '';
    for (const [key, nwObj] of Object.entries(response)) {
        urlLoc = pgData.urlRoot+'/home/?view=adminEdit&type='+pgData.type+'&docId='+key;
    }
    window.window.open(urlLoc);
}


function delObj(id,type){
    //console.log('delObj');
    var doc = id.split('-')[0];
    confirm('Are you sure you want to delete this obj?');
    //console.log(id.split('-')[0]);
    $.ajax({
        url: '/oso_aos/_aos/controllers/ajax/crudObjs.php',
        type: "POST",
        data: {
            crud:"delObjs",
            objType: type,
            docId: doc
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            console.log('sucess');
            console.log(doc);
            $('#'+doc).remove();
        },
        error: function (error) {
            console.log(error.responseText);
            console.log('error');
            $('#error').html(error.responseText);
        }
    });
}


const upObj = async(vars) => {
    // console.log(scope);
    console.log('upObj Vars',vars);
    var formData = new FormData();
    formData.append('crud', 'upObjs');
    formData.append('objType', vars.type);
    formData.append('docId', vars.docId);
    formData.append('fields', JSON.stringify(vars.fields));
    // formData.append('debug', true);

    const objs = await fetch(vars.urlRoot+'/controllers/ajax/crudObjs.php', {
        method: 'post',
        body: formData
    });
    const json = await objs.json();
    console.log('upObj output',json);
    return json; 
};

function gtObjs(goVars){
    console.log('gtObjs Ran');
    var output = $.ajax({
        url: goVars.urlRoot+'/controllers/ajax/crudObjs.php',
        type: "POST",
        data: {
            crud:"gtObjs",
            objType: goVars.type,
            objs:goVars.scope
        },
        dataType: "json",
        success: function (objs) {
            console.log(objs);
            console.log('sucess');
        },
        error: function (error) {
            console.log(error.responseText);
            console.log('error');
            $('#errors').html(error.responseText);
        }
    });
    return output;
}






