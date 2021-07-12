const createHTML = async (chVars) => {
    const vars =  {
        infrmType:chVars.vConfig.scope,
        type:chVars.vConfig.type,
        urlRoot:chVars.vConfig.urlRoot,
        dpath:chVars.vConfig.dpath,
        temp:chVars.vConfig.temp
    }
    const vType = vars.type;
    const objStruct = await fetch(vars.dpath+'/config/'+vars.type+'Obj.json');
    const objS = await objStruct.json();
    vars.objStruct = objS[vars.type];
    console.log('obj Structure', vars.objStruct);
    var inForms = sortFields(vars);
    var tmpJSON = await tempJSON(vars);
    vars.type = vType;
    console.log('inForms', inForms);
    var objVars = vars;
    if(tmpJSON.tempObj == undefined || tmpJSON.tempObj == null){
        objVars.fields = {};
    }else {
        objVars.fields = tmpJSON.tempObj;
    }
    var tmpObj = setObj(objVars);
    var eHTML = '<div class="container">';
        eHTML += '<div class="row">';
            eHTML += '<button onclick="applyWrkflo()">Apply Workflow</button>'
        eHTML += '</div>';
        eHTML += '<div class="row">';
            eHTML += '<div class="col-12">';
                eHTML += '<h2>Edit '+vType+' Object</h2>';
                //eHTML +='<h6>Last Modified: '+lstMd+'</h6>';
            eHTML +='</div>';
            eHTML += '<div class="row ">';

        for (const [key, val] of Object.entries(inForms.non)) {
            //// console.log('json cats',key,val);
            var fObj = {
                opts:val.opts,
                name:key,
                clss:key,
                id:key,
                type:val.inType
            }
            vars.json = {
                option:{},
                object:tmpObj
            }
            if(val.editable){
                //console.log(val);
                eHTML += '<div class="col-4" id="'+key+'_cont">';
                    eHTML += inputTemp(fObj,vars.json);
                eHTML += '</div>';  
            }else{
                    // eHTML += key+'-'+tmpObj[key];
            }
                
            
            
        }
            eHTML += '</div>';
            eHTML += '<div class="row"><div class="col-12">';
                eHTML += '<button onclick="crtObjPg()">Create</button>';
            eHTML += '</div>';
        eHTML += '</div>';
    eHTML += '</div>';
    // // console.log('dsfa',eHTML);
    const output = {
        html:eHTML, 
        pgjson:JSON.stringify(vars)
    }
    return output;
}

const sortFields =  (vars) =>{
    var depndt = {};
    var fild = {};
    var cal = {};
    var no = {};
    for (const [key, val] of Object.entries(vars.objStruct)) {
        if(val.depndt=="field"){
            fild[key] = val;
        }else if(val.depndt=="calc"){
            cal[key] = val;
        }else{
            no[key] = val;
        }
    }
    depndt = {
        field:fild,
        calc:cal,
        non:no
    }
    return depndt;
}

const tempJSON = async (vars) =>{
    const vvrs = vars
    vvrs.crud = 'gtObjs';
    vvrs.type = 'template';
    vvrs.docId = vars.temp;
    vvrs.objs = vars.temp;
    var temp = await crudObj(vvrs);
    var tmpObj = temp[0];
    var tmpStr = tmpObj.tempObj;
    if(!(tmpStr == undefined || tmpStr == null)){
        var tmpJSON = JSON.parse(tmpStr);
        return tmpJSON;
    }else {
        return 'No temp';
    }
    
}

