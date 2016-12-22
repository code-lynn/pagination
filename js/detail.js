/**
 * Created by Lynn on 2016/11/7 0007.
 */
~function (pro) {
    //->queryURLParameter:get url parameter or hash
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

var detailModule=(function () {
    var customData=document.getElementById('customData'),
        customInput=customData.getElementsByTagName('input');
    var urlObj=window.location.href.queryURLParameter(),
        customId=urlObj['id'];
    function sendAjax(){
        ajax({
            url:'/getInfo?id='+customId,
            type:'get',
            async:'true',
            success: function (result) {
                if(result&&result.code===0){
                    var data=result['data'];
                    console.log(data);
                    customInput[0].value=data['name'];
                    customInput[1].value=data['age'];
                    customInput[2].value=data['phone'];
                    customInput[3].value=data['address'];
                }
            }
        });
    }
    function init(){
        sendAjax();
    }
    return {
        init:init
    }
})();
detailModule.init();