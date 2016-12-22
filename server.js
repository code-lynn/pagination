/**
 * Created by Lynn on 2016/11/7 0007.
 */
var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj['pathname'],
        query = urlObj['query'];
//    处理静态资源文件请求--实现在浏览器输入地址加载首页
//    index css script 请求三次
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var suffixMIME = null;
        //    要重写响应头告诉浏览器返回数据的MIME类型，浏览器才能正确渲染（css文件）
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        try {
            res.writeHead(200, {'content-type': suffixMIME + '; charset=utf-8;'});
            res.end(fs.readFileSync('.' + pathname, 'utf-8'));//读取静态文件
        } catch (e) {
            res.writeHead(404);
            res.end('获取失败');
        }
    }



//    获取指定页面信息 根据客户端传进来的n值
//    script标签中遇到ajax异步请求
    var customerData = JSON.parse(fs.readFileSync('./json/json.json', 'utf-8'));
    if (pathname == '/getIndex') {
        var n = query['n'], ary = [];
        for (var i = (n - 1) * 10; i < 10 * n - 1; i++) {
            if (i > customerData.length - 1)break;
            ary.push(customerData[i]);
        }
        var result = {
            code: 0,
            msg: 'success',
            total: Math.ceil(customerData.length / 10),
            data: ary
        };
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        //console.log(typeof JSON.stringify(result))
        res.end(JSON.stringify(result));
        return;
    }

    if(pathname=='/getInfo'){
        var customId=query['id'],
            obj=null,
            result={
                code:1,
                mag:'error',
                data:null
            };

        customerData.forEach(function (item, index) {
            //console.log(typeof item['id'])
            if(item['id']==customId){//item['id']为数字，customId为字符串
                obj=customerData[index];
                if(obj){
                    result={
                        code:0,
                        mag:'success',
                        data:obj
                    };
                }
                return false;
            }
        });

        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }
});
server.listen(99, function () {
    console.log('99 ok!')
});