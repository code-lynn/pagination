/**
 * Created by Lynn on 2016/11/7 0007.
 */
var str='人之初性本善性相近习相远';
function ran(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
var ary=[];
for(var i=0;i<66;i++){
    var obj={};
    obj={
        id:i,
        name:str[ran(0,11)]+str[ran(0,11)]+str[ran(0,11)],
        age:ran(11,33),
        phone:'1851316'+ran(1111,9999),
        address:121212
    };
    ary.push(obj);
}
var fs=require('fs');
fs.writeFileSync('./json.json',JSON.stringify(ary),'utf-8');