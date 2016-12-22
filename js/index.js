/**
 * Created by Lynn on 2016/11/7 0007.
 */
var pagemodule=(function () {
    var customer=document.getElementById('customer'),
        page=document.getElementById('page'),
        pageNum=document.getElementById('pageNum'),
        inputNum=page.getElementsByTagName('input')[0];
    var n=1,total=0;

    function bindHtml(data){
        var str='';
        for(var i=0;i<data.length;i++){
            var cur=data[i];
            str+='<li comId="'+cur['id']+'">\
                <span>'+cur['id']+'</span>\
                <span>'+cur['name']+'</span>\
                <span>'+cur['age']+'</span>\
                <span>'+cur['phone']+'</span>\
                <span>'+cur['address']+'</span>\
                <span>\
                    <a href="detail.html">修改</a>\
                    <a href="javascript:;">删除</a>\
                </span>\
                </li>'
        }
        customer.innerHTML=str;
        str='';
        for(i=1;i<total;i++){
            if(n===i){
                str+='<li class="bg">'+i+'</li>';
                continue;
            }
            str+='<li>'+i+'</li>';
        }
        pageNum.innerHTML=str;
        inputNum.value=n;
    }
    function bindEvent(){
        page.onclick= function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement,
                tarTag=tar.tagName.toUpperCase(),
                tarHtml=tar.innerHTML;
            if(tarTag==='SPAN'){
                if(tarHtml==='第一页'){
                    if(n==1)return;
                    n=1;
                }
                if(tarHtml==='尾页'){
                    if(n==total)return;
                    n=total;
                }
                if(tarHtml==='上一页'){
                    if(n==1)return;
                    n--;
                }
                if(tarHtml==='下一页'){
                    if(n==total)return;
                    n++;
                }
            }
            if(tarTag==='LI'){
                n=tarHtml;
            }
            if(tarTag==='INPUT')return;
            sendAjax()
        };
        inputNum.onkeyup= function (e) {
            e=e||window.event;
            if(e.keyCode===13){
                var val=this.value.replace(/(^ +)|( +$)/,'');
                val=parseFloat(val);
                if(isNaN(val)){
                    this.value=n;
                    return;
                }
                val=Math.round(val);
                if(val<1){
                    n=1;
                }else if(val>total){
                    n=total;
                }else{
                    n=val;
                }
                sendAjax();
            }
        }
    }
    function bindLink(){
        var oLi=customer.getElementsByTagName('li');
        for(var i=0;i<oLi.length;i++){
            oLi[i].onclick= function () {
                window.open('detail.html?id='+this.getAttribute('comId'))
            }
        }
    }
    function sendAjax(){
        ajax({
            url:'/getIndex?n='+n,
            type:'get',
            async:'true',
            success: function (result) {
                if(result&&result.code===0){
                    var data=result['data'];
                    total=result['total'];
                    bindHtml(data);
                    bindLink();
                    //console.log(total)
                }
            }
        });
    }
    function init(){
        sendAjax();
        bindEvent();
    }
    return {
        init:init
    }
})();
pagemodule.init();
