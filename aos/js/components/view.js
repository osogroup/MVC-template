function inputTemp(fObj,json,fnum){
    // console.log('Input Temp Vars',fObj,json);
    var output = '';
    var opts = json.option;
    if(json.object == undefined || json.object == null){
        var obj = {};
    }else {
        var obj = json.object;
    }
    var relObj = fObj.opts;
    // console.log('input Obj vars',obj[fObj.id]);
    if(!(obj.hasOwnProperty(fObj.id))){
        obj[fObj.id]='Not Set';
    }
    output = '<h3 class="fTitle">'+fObj.name+'</h3>';
    if(fObj.type == 'array'){
        // console.log(opts[relObj]);
        output += '<div class="'+fObj.clss+'" id="'+fObj.id+'">';
            output += '<div class="col-12 arr">';
            console.log('input Objects',obj);
            var fId =  fObj.id;
                for (const [num, arr] of Object.entries(obj[fId])) {
                    output += '<div id="'+fId+'-'+arr+'"class="col-12">';
                        output += '<div class="col-10">'+arr+'</div>';
                        output += '<div class="col-2"><button id="'+fId+'-'+arr+'-del" onclick="delArr(this.id,'+fnum+')">-</button></div>';
                    output +='</div>';
                }
            output += '</div>';
            output += '<div class="col-12">';
                output += '<select class="'+fObj.clss+'" id="'+fObj.id+'" name="'+fObj.id+'">';
                for (const [key, val] of Object.entries(opts[relObj])) {
                    //// console.log(val);
                    output += '<option value="'+val.docId+'">'+val.name+'</option>';  
                }
                output += '</select>';
            // output += '</div>';
            // output += '<div class="col-2">';
                output += '<button id="'+fObj.id+'_add" onclick="addArr(this.id,'+fnum+')" >+</button>';
            output += '</div>';
        output += '</div>';
    }else if(fObj.type == 'select'){
        output += '<select class="'+fObj.clss+'" id="'+fObj.id+'" name="'+fObj.id+'" onchange="upPgData(this.id)"';
                for (const [key, val] of Object.entries(opts[relObj])) {
                    //console.log(val.docId,obj[fObj.id]);
                    output += '<option ';
                    if(val.docId==obj[fObj.id]){
                        output += 'selected ';
                    }
                    output += 'value="'+val.docId+'">'+val.name+'</option>';  
                }
                output += '</select>';
    }else if(fObj.type == 'textarea'){
        var val = obj[fObj.id];
        if(typeof val === 'object' && val !== null){
            val = JSON.stringify(val);
        }
        output += '<textarea class="'+fObj.clss+'" type="'+fObj.type+'" id="'+fObj.id+'" name="'+fObj.id+'" onchange="upPgData(this.id)" >'+val+'</textarea>';
    }else{
        output += '<input class="'+fObj.clss+'" type="'+fObj.type+'" id="'+fObj.id+'" name="'+fObj.id+'" onchange="upPgData(this.id)" value="'+obj[fObj.id]+'"/>';
    }
    // console.log('Input Temp Vars',output);
    return output; 
};
function addArr(id, fnum){
    //console.log('add Array',id,fnum);
    const vid = id.split('_')[0];
    //console.log('Select input',$('#'+vid+' :selected').val());
    const add = $('#'+vid+' :selected').val();
    //console.log('Add Array value',add);
    const pgData = JSON.parse($('#pgData').val());
    const fval = pgData.json.object[vid];
    fval.push(add);
    pgData.json.object[vid] = fval;
    $('#pgData').val(JSON.stringify(pgData));
    const type = pgData.type;
    // console.log(type);
    const fields = pgData.fields;
    // console.log(fields);
    const fObj = fields[type]; 
    const json = pgData.json;
    const html = inputTemp(fObj[fnum],json,fnum);
    //console.log('add HTML',html);
    $('#'+vid+'_cont').html(html);
};

function delArr(id,fnum){
    const vid = id.split('-');
    //console.log('Select input',$('#'+vid+' :selected').val());
    const rdiv = $('#'+vid[0]+'-'+vid[1]);
    //console.log('remove div',rdiv);
    const pgData = JSON.parse($('#pgData').val());
    const fval = pgData.json.object[vid[0]];
    //console.log('pData value',fval);
    //console.log('vale to remove',vid[1]);
    fval.remove(vid[1]);
    pgData.json.object[vid] = fval;
    $('#pgData').val(JSON.stringify(pgData));
    const type = pgData.type;
    // console.log(type);
    const fields = pgData.fields;
    // console.log(fields);
    const fObj = fields[type]; 
    const json = pgData.json;
    const html = inputTemp(fObj[fnum],json,fnum);
    $('#'+vid[0]+'_cont').html(html);
    const docId = pgData.json.object.docId;

};
async function upEditObj() {
    const pgData = JSON.parse($('#pgData').val());
    console.log('upEditObj pgData',pgData);
    const pgObj = pgData.json.object;
    const docId = pgData.json.object.docId;
    pgData.json.object.last_mod = new Date();
    const upfors = pgObj;
    const vars = {
        type:pgData.type,
        docId:pgData.scope,
        fields:upfors,
        urlRoot:pgData.urlRoot
    };
    console.log('upEditObj pgData',vars);
    const response = await upObj(vars);
    console.log('Obj Update Response',response);
    location.reload();
};
const upPgData = (id) => {
    if($('#'+id).is('select')){
        var inVal = $("#"+id+' :selected').val();
    }else{
        var inVal = $("#"+id).val();
    }
    const pgData = JSON.parse($('#pgData').val());
    //console.log("change Value", in)
    pgData.json.object[id] = inVal;
    $('#pgData').val(JSON.stringify(pgData));
    console.log('pgData updated',JSON.parse($('#pgData').val()))

};


const applyWrkflo= async() =>{
    const pgData = JSON.parse($('#pgData').val());
    wrkVars = {
        crud:'gtObjs',
        type:'wrkflo',
        urlRoot:pgData.urlRoot,
        objs:pgData.json.object.wrkflo
    }
    var wrkflo = await crudObj(wrkVars);
    console.log('wrkflo',wrkflo);
    for (const [key, wrkflo] of Object.entries(wrkflo)) {

    }
};





