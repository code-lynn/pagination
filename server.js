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
//    ����̬��Դ�ļ�����--ʵ��������������ַ������ҳ
//    index css script ��������
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var suffixMIME = null;
        //    Ҫ��д��Ӧͷ����������������ݵ�MIME���ͣ������������ȷ��Ⱦ��css�ļ���
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
            res.end(fs.readFileSync('.' + pathname, 'utf-8'));//��ȡ��̬�ļ�
        } catch (e) {
            res.writeHead(404);
            res.end('��ȡʧ��');
        }
    }



//    ��ȡָ��ҳ����Ϣ ���ݿͻ��˴�������nֵ
//    script��ǩ������ajax�첽����
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
            if(item['id']==customId){//item['id']Ϊ���֣�customIdΪ�ַ���
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