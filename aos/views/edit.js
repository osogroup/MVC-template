

const editHTML = async (ehVars) => {

    const vars =  {
        scope:ehVars.vConfig.scope,
        type:ehVars.vConfig.type,
        urlRoot:ehVars.vConfig.urlRoot,
        dpath:ehVars.vConfig.dpath,
    }
    //// console.log('Vars',vars);
    const fields = await fetch(vars.dpath+'/config/'+vars.type+'Obj.json');
    const filds = await fields.json();
    vars.fields = filds[vars.type];
     console.log('Vars + Fields',vars);
    const view = await editJSON(vars);
    vars.json = view;
    var tmpObj = vars.json.object;
    console.log('Vars + JSON',vars);
    var lstDate = new Date(vars.json.object.last_mod);
    var lstMd = lstDate.getMonth()+'/'+lstDate.getDate()+'/'+lstDate.getYear();
    var eHTML = '<div class="container">';
        eHTML += '<div class="row">';
            eHTML += '<div class="col-12">';
                eHTML += '<h2>Edit '+vars.json.object.name+' '+vars.type+' Object</h2>';
                eHTML +='<h6>Last Modified: '+lstMd+'</h6>';
            eHTML +='</div>';

        for (const [key, val] of Object.entries(vars.json)) {
            //// console.log('json cats',key,val);
            if(key == 'object'){
                eHTML += '<div class="row '+docId+'">';
                    for (const [ks, vas] of Object.entries(vars.fields)) {

                        var fObj = {
                            opts:vas.opts,
                            name:ks,
                            clss:ks,
                            id:ks,
                            type:vas.inType
                        }
                        eHTML += '<div class="col-4" id="'+ks+'_cont">';
                        if(vas.editable){
                            eHTML += inputTemp(fObj,vars.json);
                        }else{
                            eHTML += '<h3 class="fTitle">'+ks+'</h3>'+tmpObj[key];
                        }
                        eHTML += '</div>';
                    }
                eHTML += '</div>';
                
            }
        }
        eHTML += '<div class="row"><div class="col-12">';
            eHTML += '<button onclick="upEditObj()">Update</button>';
        eHTML += '</div></div>';
    eHTML += '</div>';
    // // console.log('dsfa',eHTML);
    const output = {
        html:eHTML, 
        pgjson:JSON.stringify(vars)
    }
    return output;

};

const editJSON = async (vars) => {
    var opt ={};
    var inputs = vars.fields;
    //console.log('inputs',inputs);
    const scope = [vars.scope];
    console.log(scope);
    var formData = new FormData();
    formData.append('crud', 'gtObjs');
    formData.append('objType', vars.type);
    formData.append('docId', vars.scope);
    formData.append('objs', JSON.stringify(scope));
    // formData.append('debug', true);

    const objs = await fetch(vars.urlRoot+'/controllers/ajax/crudObjs.php', {
        method: 'post',
        body: formData
    });
    const json = await objs.json();
    console.log('Objs',json);
    // console.log('These are put in eJSON',opt);

    // for (const [key, val] of Object.entries(inputs)) {
    //     console.log(key,vars.type);
    //     console.log('fields',val);
    //     if(key == vars.type){
    //         for (const [ky, va] of Object.entries(val)) {
    //             if(va.opts){
    //                 var relObj = va.opts;
    //                 console.log(relObj);
    //                 opt[relObj] ={};
    //                 var apst = new FormData();
    //                 if(relObj=='wrkflo'){
    //                     apst.append('crud', 'gtObjs');
    //                     apst.append('objType', relObj);
    //                     apst.append('objs', 'all');
    //                     //apst.append('debug',true);
                        
    //                 }else {
    //                     apst.append('crud', 'qryObjs');
    //                     apst.append('objType', relObj);
    //                     apst.append('query', '{"type":"single","fields":"type","logic":"=","param":"'+json[0].supType+'"}');
    //                     //apst.append('debug',true);
    //                 }
    //                 // console.log('relationGet',apst);
    //                 const opts = await fetch(vars.urlRoot+'/controllers/ajax/crudObjs.php', {
    //                     method: 'post',
    //                     body: apst
    //                 });
    //                 // console.log('Options',opts);
    //                 jsret = await opts.json();
    //                 for (const [num, ent] of Object.entries(jsret)) {
    //                     opt[relObj][num] = ent;
    //                 }
    //                 console.log('Options',opt);
    //                 //console.log('Options',JSON.stringify(opt));
    //             }
    //         } 
    //     }
    // }
    //console.log('Options are',JSON.stringify(opt));

    var eJSON = {
        option:opt,
        object:json[0]
    }
    return eJSON;   
};


// const editHTML = async (ehVars) => {

//     const vars =  {
//         scope:ehVars.vConfig.scope,
//         type:ehVars.vConfig.type,
//         urlRoot:ehVars.vConfig.urlRoot,
//         dpath:ehVars.vConfig.dpath,
//     }
//     //// console.log('Vars',vars);
//     const fields = await fetch(ehVars.vConfig.dpath+'/config/editFields.json');
//     vars.fields = await fields.json();
//      console.log('Vars + Fields',vars);
//     const view = await editJSON(vars);
//     vars.json = view;
//     console.log('Vars + JSON',vars);
//     var lstDate = new Date(vars.json.object.last_mod);
//     var lstMd = lstDate.getMonth()+'/'+lstDate.getDate()+'/'+lstDate.getYear();
//     var eHTML = '<div class="container">';
//         eHTML += '<div class="row">';
//             eHTML += '<div class="col-12">';
//                 eHTML += '<h2>Edit '+vars.json.object.name+' '+vars.type+' Object</h2>';
//                 eHTML +='<h6>Last Modified: '+lstMd+'</h6>';
//             eHTML +='</div>';

//         for (const [key, val] of Object.entries(vars.json)) {
//             //// console.log('json cats',key,val);
//             if(key == 'object'){
//                 eHTML += '<div class="row '+docId+'">';
//                     //console.log(val);
//                     for (const [ke, vale] of Object.entries(val)) {
//                         //console.log('Objs cats',ke,vale);
//                         for (const [ks, vas] of Object.entries(vars.fields)) {
//                             //console.log('inpyts',ks,vas, vars.type);
//                             var type = vars.type;
//                             if(ks == type){
//                                 for (const [k, va] of Object.entries(vas)) {
//                                     //console.log('field',k,va.id);
//                                     if(va.id == ke){
//                                         //console.log('Matching Input',k,ke);
//                                         eHTML += '<div class="col-4" id="'+ke+'_cont">';
//                                             eHTML += inputTemp(va,vars.json,k);
//                                         eHTML += '</div>';
//                                     }
//                                 }
//                             }
                            
//                         }
//                     }
//                 eHTML += '</div>';
//                 eHTML += '<div class="row"><div class="col-12">';
//                     eHTML += '<button onclick="upEditObj()">Update</button>';
//             }
//         }
//         eHTML += '</div></div>';
//     eHTML += '</div>';
//     // // console.log('dsfa',eHTML);
//     const output = {
//         html:eHTML, 
//         pgjson:JSON.stringify(vars)
//     }
//     return output;

// };



