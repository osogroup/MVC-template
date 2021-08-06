const overHTML = async (ehVars) =>{
    // const fields = await fetch(ehVars.vConfig.dpath+'/config/overFields.json');
    // vars.fields = await fields.json();
    const vars =  {
        scope:ehVars.vConfig.scope,
        type:ehVars.vConfig.type,
        view:ehVars.vConfig.view,
        urlRoot:ehVars.vConfig.urlRoot,
        dpath:ehVars.vConfig.dpath,
    }
    const overForm = new FormData();
    overForm.append('docId', vars.scope);
    overForm.append('view', vars.view);
    overForm.append('debug',true);
    const viewResp = await fetch(vars.urlRoot+'/controllers/ajax/viewJSON.php', {
        method: 'post',
        body: overForm
    });
    overJSON = await viewResp.json();
    vars.json = overJSON;
    console.log('Vars + JSON',vars);
    var output = '<div class="slides">';
        output += probValSlides(vars);
        output += wrkfloSlides(vars);
        output += supInfrm(vars);
        // output += roadmap(vars);
    output += '</div>';
    //console.log('overHTML Slides',output);
    var pgData = {
        json:overJSON,
        html:output
    }
    return pgData;    
}

function probValSlides(vars) {
    var json = vars.json;
    //Title Section
    var lstMd = new Date(json.title.lastMod);
    var y = lstMd.getFullYear();
    var m = lstMd.getMonth();
    var d = lstMd.getDay();
    var lstMod = m+'/'+d+'/'+y;
    var html = '<section class="ss_title container">';
        html += '<div class="row">';
            html += '<div class="col-12">';
                html += '<h1><span id="title_name">'+json.title.name+' Overview</span></h1>';
                html += '<h5 class="tit_year">'+y+'</h5>';
            html += '</div>';
        html += '</div>';
        html += '<div class="row">';
            html += '<div class="col-12">';
                html += '<h6>Last Updated: <span class="title_lastMod" id="title_lastMod">'+lstMod+'</span></h6>';
            html += '</div>';
        html += '</div>';
    html += '</section>';
    //Context Section
    html += '<section class="ss_context container">';
        html += '<div class="row">';
            html +='<h2><span class="context_text" id="context_text">'+json.context.text+'</span></h2>';
        html += '</div>';
    html += '</section>';
    //Problem Section
    html += '<section class="ss_problem container">';
        html += '<div class="row">';
            html +='<h2><span class="problem_text" id="problem_text">'+json.problem.text+'</span></h2>';
        html += '</div>';
    html += '</section>';
    //Solution Section
    html += '<section class="ss_solution container">';
        html += '<div class="row">';
            html +='<h2><span class="solution_text" id="solution_text">'+json.solution.text+'</span></h2>';
        html += '</div>';
    html += '</section>';
    //Infrm img Section
    html += '<section class="ss_infrmImg container">';
        html += '<div class="row">';
            html +='<h2 class="slideH">'+json.title.designName+'</h2>';
            html +='<a href="'+vars.dpath+'/img/infrm/'+json.title.design+'"><img class="infrmDesign" src="'+vars.dpath+'/img/infrm/'+json.title.design+'"/></a>';
        html += '</div>';
    html += '</section>';
    //console.log('probVal Slides', html);
    return html;
}

function wrkfloSlides(vars){
    const json = vars.json;
    var html = '';
    //console.log('wrkflo slides');
    for (const [key, oneWrkflo] of Object.entries(json.wrkflos)) {
        if(!(oneWrkflo.docId == json.wrkflo.docId)){
            break;
        }
        html += '<section class="wrkflo" id="workflo_'+key+'">';
            html += '<section class="ss_oneWrkflo container" id="'+oneWrkflo.docId+'" >';
                html +='<div class="row">';
                    html += '<div class="col-12">';
                        html += '<h2 class="slideH">'+oneWrkflo.name+'</h2>';
                    html += '</div>';
                    html += '<div class="col-12">';
                        html += '<img class="wrkfloDesign" src="'+vars.dpath+'/img/wrkflo/'+oneWrkflo.design+'" alt="'+oneWrkflo.name+'"/>';
                    html += '</div>';
                    var wrkfloCats = {};
                    for (const [k, supInfrm] of Object.entries(json.supDeets)) {
                        for (const [arr,supWrkflos] of Object.entries(oneWrkflo.supWrkflos)){
                            //console.log(supInfrm.wrkflo,supWrkflos)
                            if(supInfrm.wrkflo.docId == supWrkflos){
                                var dd = supInfrm.id+'_'+supInfrm.type;
                                console.log("Sup Infrm",supInfrm, dd);
                                var gtit = {};
                                gtit[dd] = supInfrm;
                                wrkfloCats[supWrkflos] = gtit;
                            }else{
                                if(!(supWrkflos in wrkfloCats)){
                                    wrkfloCats[supWrkflos] = {};
                                }
                            }
                        }
                    }
                    //console.log("wrk Cats", wrkfloCats);
                    // html += '<div class="col-4">';
                    // var catsLeg = Object.size(wrkfloCats);
                    // var col = 12/catsLeg;
                    //     html += '<h4>'+json.title.supType+'s</h4>';
                    // for (const [k, categ] of Object.entries(wrkfloCats)) {
                    //     var wee = json.wrkflos;
                    //     var nwrk = wee[k];
                    //     html += '<div class="col-12 wrkCat">';
                    //         html += '<h6>'+nwrk.name+'</h6>';
                    //         html += '<ul class="infrmUL">';
                    //         for (const [dci, dinfm] of Object.entries(categ)) {
                    //             html += '<li><a href="'+vars.dpath+'?view=overview&type=infrm&docId='+dci+'">'+dinfm.name+'</a></li>';
                    //         }
                    //         html += '</ul>';
                    //     html +='</div>';
                    // }
                    // html += '</div>';
                html += '</div>';
            html += '</section>';
        for (const [k, sub] of Object.entries(oneWrkflo.supWrkflos)) {
            var twoWrkflo  = oneWrkflo[sub];
            html +='<section class="ss_subWrkflo container subSection" id="'+twoWrkflo.docId+'">';
                html += '<div class="row">';
                    html += '<div class="col-12">';
                        html += '<h3 class="slideH">'+twoWrkflo.name+'</h3>';
                    html += '</div>';
                html += '</div>';
                html += '<div class="row">';
                    html += '<div class="col-8 mid_lines">';
                        html +='<h5>Model</h5>';
                        html +='<a href="'+vars.dpath+'/img/wrkflo/'+twoWrkflo.model+'"><img src="'+vars.dpath+'/img/wrkflo/'+twoWrkflo.model+'" class="'+twoWrkflo.type+'_'+twoWrkflo.id+'" alt="'+twoWrkflo.name+'"/></a>';
                    html += '</div>';
                    html +='<div class="col-4">';
                        html += '<h5 class="obtit">'+twoWrkflo.outInfrm+'s</h5>';
                        if(twoWrkflo.objects== null){
                            twoWrkflo.objects = ["none"]
                        }else if (typeof twoWrkflo.objects == "string"){
                            twoWrkflo.objects = JSON.parse(twoWrkflo.objects);
                        }
                        for (const [n, obj] of Object.entries(twoWrkflo.objects)){
                            html +='<div class="objs row" id="obj_'+n+'">';
                                html += '<div class="col-12 objTXT">';
                                    html += '<a href="'+obj.link+'"><b>'+twoWrkflo.inInfrm+': '+obj.name+'</b></a>';
                                    //html += '<p>'+obj.descript+'</p>';
                                html += '</div>';
                            html += '</div>';
                        }
                    html += '</div>';
                html += '</div>';
                html += '<div class="row">';
                    html += '<div class="col-12 ">';
                        html += '<h5>Actors:</h5>';
                        if(twoWrkflo.actors== null){
                            twoWrkflo.actors = ["none"]
                        }else if (typeof twoWrkflo.actors == "string"){
                            twoWrkflo.actors = JSON.parse(twoWrkflo.actors);
                        }
                        var count = Object.size(twoWrkflo.actors);
                        var cu = 12/count;
                        html += '<div class="row">';
                        for (const [num, actor] of Object.entries(twoWrkflo.actors)){
                            html += '<div class="col-'+cu+' actor" >';
                                html +='<div class="col-12 actorName " id="act_'+num+'">'+actor.name+'</div>'
                                html += '<div class="col-10">';
                                    //html += '<p>'+actor.descript+'</p>';
                                    html += '<p><b><u>Examples</u></b><br/>'+actor.example+'</p>';
                                html += '</div>';
                            html+= '</div>';
                        }
                        html +='</div>';
                    html += '</div>';
                html += '</div>';
                // html += '<div class="row design_key">';
                //     html += '<div class="col-12"><b>Key:</b></div>';
                //     html += '<div class="col-2">';
                //         html += '<img href="'+vars.urlRoot+'/home/imgs/assets/stick_guy.png"/><b>Actor</b>';
                //     html +='</div>';
                //     html += '<div class="col-2">';
                //         html += '<img href="'+vars.urlRoot+'/home/imgs/assets/interacts.png"/>';
                //     html +='</div>';
                //     html += '<div class="col-2">';
                //         html += '<img href="'+vars.urlRoot+'/home/imgs/assets/boundary.png"/>';
                //     html +='</div>';
                //     html += '<div class="col-2">';
                //         html += '<img href="'+vars.urlRoot+'/home/imgs/assets/component.png"/>';
                //     html +='</div>';
                //     html += '<div class="col-2">';
                //         html += '<img href="'+vars.urlRoot+'/home/imgs/assets/prov_info.png"/>';
                //     html +='</div>';
                //     html += '<div class="col-2">';
                //         html += '<img href="'+vars.urlRoot+'/home/imgs/assets/req_info.png"/>';
                //     html +='</div>';
                // html += '</div>';
            html +='</section>';
        }
        html += '</section>';  
    }   
    //console.log("wrkfloSlides HTML",html )
    return html;
}

function supInfrm(vars){
    const json = vars.json;
    var html = '';
    for (const [key, supInf] of Object.entries(json.supDeets)) {
        console.log('One Infrm',supInf);
        if(supInf.docId == undefined){
            break;
        }
        // var wrkfloCats = {};
        // if(!(supInf.supInfrm == undefined)){
        //    for (const [kes, sup] of Object.entries(supInf.supInfrm)) {
        //     console.log('2 Infrm',sup);
        //         //console.log('supInf',supInf.wrkflo);
        //         if(supInf.wrkflo == "Invalid ID - Object not found"){
        //             break;
        //         }
        //         // for (const [arr,supWrkflos] of Object.entries(supInf.wrkflo.supWrkflos)){
        //         //     console.log(sup.wrkflo.docId,supWrkflos);
        //         //     if(sup.wrkflo.docId == supWrkflos){
        //         //         var dd = sup.id+'_'+sup.type;
        //         //         console.log("Sup Infrm",sup, dd);
        //         //         var gtit = {};
        //         //         gtit[dd] = sup;
        //         //         wrkfloCats[supWrkflos] = gtit;
        //         //     }else{
        //         //         if (!(supWrkflos in wrkfloCats)){
        //         //             wrkfloCats[supWrkflos] = {};
        //         //         }
        //         //     }
        //         // } 
        //     }
        //     //console.log("wrk Cats", wrkfloCats);
        // } 
        html += '<section class="infrm" id="supInfrm'+key+'">';
            html += '<section class="supInfrm container" id="'+supInf.docId+'" >';
                html +='<div class="row">';
                    html += '<div class="col-12">';
                        html += '<a href="'+vars.dpath+'?view=overview&type=infrm&docId='+supInf.docId+'">'+supInf.name+'</a>';
                    html += '</div>';
                    html += '<div class="col-8">';
                        html += '<a target="_blank" href="'+vars.dpath+'/img/wrkflo/'+supInf.wrkflo.model+'"><img class="subInfrm_wrkfloDesign" src="'+vars.dpath+'/img/wrkflo/'+supInf.wrkflo.model+'" alt="'+supInf.wrkflo.name+'"/></a>';
                    html += '</div>';
                    html += '<div class="col-4">';
                    html += '<h6>'+supInf.subType+'s</h6>';
                    if(!(supInf.supInfrm==undefined)){
                        for (const [dci, dinfm] of Object.entries(supInf.supInfrm)) {
                            if(dinfm.type == supInf.subType){
                                html += '<div class="col-12">';
                                    html += '<h6><a href="'+vars.dpath+'?view=overview&type=infrm&docId='+dinfm.docId+'">'+dinfm.name+'</a></h6>';
                                html +='</div>';
                            }
                        }
                    }
                    html += '</div>';
                html += '</div>';
            html += '</section>';
            if(!(supInf.supInfrm==undefined)){
                if(!(Object.keys(supInf.supInfrm).length === 0)){
                    for (const [kee, sub] of Object.entries(supInf.supInfrm)) {
                        if(sub.type == supInf.subType){
                            console.log(sub.type,sub);
                            html += '<section class="supInfrm container" id="'+sub.docId+'" >';
                                html +='<div class="row">';
                                    html += '<div class="col-12">';
                                        html += '<h2 class="slideH"><a href="'+vars.dpath+'?view=overview&type=infrm&docId='+sub.docId+'">'+sub.name+'</a></h2>';
                                    html += '</div>';
                                    html += '<div class="col-12">';
                                        html += '<p class="infrmSol">'+sub.solution+'</p>';
                                    html += '</div>';
                                    html += '<div class="col-12">';
                                        html += '<a href="'+vars.dpath+'/img/infrm/'+sub.design+'"><img src="'+vars.dpath+'/img/infrm/'+sub.design+'"/></a>';
                                    html += '</div>';
                                html += '</div>';
                                // if(sub.wrkflo.actors== null){
                                //     sub.wrkflo.actors = ["none"];
                                // }else if (typeof sub.wrkflo.actors == "string"){
                                //     sub.wrkflo.actors = JSON.parse(sub.wrkflo.actors);
                                // }
                                // if(!(sub.wrkflo.actors == null)){
                                //     html += '<div class="row">';
                                //         html += '<h5>Actors:</h5>';
                                        
                                //         var count = Object.size(sub.wrkflo.actors);
                                //         var cu = 12/count;
                                //         html += '<div class="row">';
                                //         for (const [num, actor] of Object.entries(sub.wrkflo.actors)){
                                //             html += '<div class="col-'+cu+' actor" >';
                                //                 html +='<div class="col-12 actorName " id="act_'+num+'">'+actor.name+'</div>'
                                //                 html += '<div class="col-10">';
                                //                     //html += '<p>'+actor.descript+'</p>';
                                //                     html += '<p><b><u>Examples</u></b><br/>'+actor.example+'</p>';
                                //                 html += '</div>';
                                //             html+= '</div>';
                                //         }
                                //     html += '</div>';
                                // }
                            html += '</section>';
                        }
                    }
                }  
            }
        html += '</section>';  
    }
    return html;

}

