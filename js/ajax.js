/**
 * Created by Lynn on 2016/11/7 0007.
 */
(function (){
    function ajax(opts){
        var defaultObj={
            url:null,
            type:'get',
            async:true,
            //dataTye:'text',
            //data:null,
            success:null
        };
        for(var key in opts){
            if(opts.hasOwnProperty(key)){
                defaultObj[key]=opts[key];
            }
        }

        var xhr=new XMLHttpRequest();
        xhr.open(defaultObj['type'],defaultObj.url,defaultObj.async);
        xhr.onreadystatechange= function () {
            if(/200/.test(xhr.status)){
                if(xhr.readyState===4){
                    //console.log(xhr.responseText)
                    var text = xhr.responseText;
                    var result=text = 'JSON' in window ? JSON.parse(text) : eval('(' + text + ')');
                    defaultObj.success.call(xhr,result)
                }
            }
        };
        xhr.send();
    }
    this.ajax=ajax;
})();
