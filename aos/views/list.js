function listHTML(listEnts,type){
    var listVars = {
        wrkflo:{
            fields:["type","name","inInfrm","outInfrm","supWrkflos"],
            create:["name","type"]
        },
        infrm:{
            fields:["type","name","wrkflo","solution","status"],
            create:["name","type","context","problem","solution"]
        }
    };
    var objVars = listVars[type];
    console.log('list Vars',listVars);
    var col = 10/(objVars.fields.length);
    var listHTML = '<div class="container" id="sortList">';
        listHTML += '<div class="row lhead">';
            listHTML += '<h1>AOS '+type+' Object List</h1>';
            listHTML += '<div class="col-12 crtObj">';
            for (const [kee, va] of Object.entries(objVars.create)) {
                listHTML += '<input class="f'+va+'" placeholder= "'+va+'" type="text" id="f'+va+'"/>';
            }
                listHTML += '<button onclick="createObjs(\''+type+'\')">Submit</button>';
            listHTML += '</div>';
            listHTML += '<div class="col-12 lhead">';
                listHTML += '<input class="search" placeholder="Search" />';
            listHTML += '</div>'
            listHTML += '<div class="col-1"><div class="lcell sort" data-sort="id">Id</div></div>';
            for (const [ky, vale] of Object.entries(objVars.fields)) {
                listHTML += '<div class="col-'+col+'"><div class="lcell sort" data-sort="'+vale+'">'+vale+'</div></div>';
            }
            listHTML += '<div class="col-1"><div class="lcell"></div></div>';
        listHTML += '</div>';
        listHTML += '<div class="list" id="listb">';
        for (const [key, val] of Object.entries(listEnts)) {
            var editURL = '?view=adminEdit&type='+type+'&docId='+val["docId"];
            listHTML += '<div class="row" id="'+val["id"]+'_'+val["type"]+'">';
            listHTML += '<a href="'+editURL+'" target="_blank">';
            listHTML += '<div class="col-1"><div class="lcell id">'+val["id"]+'</div></div>';
            for (const [k, v] of Object.entries(objVars.fields)) {
                listHTML += '<div class="col-'+col+'"><div class="lcell '+v+'">'+val[v]+'</div></div>';
            }
            listHTML += '</a>';
            listHTML += '<div class="col-1"><div class="lcell"><button id="'+val["id"]+'_'+val["type"]+'-del" onclick="delObj(this.id,\''+type+'\')">-</button></div></div>';
            listHTML += '</div>';
        }  
        listHTML += '</div>';
    // Container End below
    listHTML += '</div>';

    var htmlObj = {
        html:listHTML,
        fields:objVars.fields
    }
    return htmlObj;
}

function createObjs(type){
    var listVars = {
        wrkflo:{
            fields:["type","name","inInfrm","outInfm","supWrkflos"],
            create:["name","type"]
        },
        infrm:{
            fields:["type","name","wrkflo","solution","status"],
            create:["name","type","context","problem","solution"]
        }
    };
    var flds = new Object();
    var objVars = listVars[type];
    for (const [key, va] of Object.entries(objVars.create)) {
        flds[va]=$('#f'+va).val();
    }
    flds['last_mod'] = new Date();
    console.log(flds);
    var objType = type;
    $.ajax({
        url: '/oso_aos/_aos/controllers/ajax/crudObjs.php',
        type: "POST",
        data: {
            crud:"crtObjs",
            objType: objType,
            fields:flds
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            console.log('sucess');
            var rowVars = 
                {
                    ntrs: data,
                    id:'listb',
                    type:objType
                };
            $('.crtObj input').val('');
            addRows(rowVars);
            
        },
        error: function (error) {
            console.log(error.responseText);
            console.log('error');
            $('#error').html(error.responseText);
        }
    });
}

function addRows(rowVars){
    console.log(rowVars);
    var entries = rowVars.ntrs;
    var html = '';
    var rowCont = rowVars.id;
    var output = [];
    for (const [ky, vale] of Object.entries(entries)) {
        var editURL = '?view=edit&type='+rowVars.type+'&docId='+vale.docId;
        html += '<div class="row lbody" id="'+vale.docId+'">';
            html += '<a href = "'+editURL+'" target="_blank" >';
            html += '<div class="col-1"><div class="lcell">'+vale.id+'</div></div>';
            html += '<div class="col-2"><div class="lcell">'+vale.type+'</div></div>';
            html += '<div class="col-2"><div class="lcell">'+vale.name+'</div></div>';
            html += '<div class="col-2"><div class="lcell">'+vale.inInfrmTypes+'</div></div>';
            html += '<div class="col-2"><div class="lcell">'+vale.outInfrmTypes+'</div></div>';
            html += '<div class="col-2"><div class="lcell">'+vale.supWrkflos+'</div></div>';
            html += '</a>';
            html += '<div class="col-1"><button id="'+vale.docId+'-del" onclick="delObj(this.id,\''+rowVars.type+'\')">-</button></div>';
        html += '</div>';
        $('#'+rowCont).append(html);
        output[ky]=html;
    }
    return output;
}



