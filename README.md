###USAGE:
需要安装nodejs和mongodb。
服务器启动代码：
```
    npm install;
    node server.js;
```
#####NOTE:
js/app.js中硬编码了url，在部署时需要注意此处。
###Schema:
```
{
    url: String,
    short: String
}
```
- 'url'对应原网页地址。（没有加入输入合法性判断，任意字符串均会存入数据库）
- 'short'对应短网址的五位字符。短网址整体是：http://ip_address/url/#####, 其中#####为'short'对应的字符

###API:
- /shorten/
    + post: body中传入对象字面量{"data": origin_url}，支持'x-www-form-urlencoded'和'application/json', 其余方式未测试。
        比如：
        * jQuery:
        ```
                $.post(url, {"data": urlText}, function(response){
                    console.log('success');
                });
        ```
        * Angular:
        ```
                $http.post(url, {"data": urlText}, config)
                .then(
                    function(response){
                        console.log('success');
                    },
                    function(response){
                        console.log('failed');
                    }
                );
        ```
    以json形式返回，含有两个属性，status和short。
        * 如果成功创建一个条目，status为'OK'，short为短网址的五位字符。
        * 如果该条目已经存在，status返回'registered', short同样为短网址的五位字符。
        * 查询失败，返回status='failed'。
- /url/:urlId
    + get: url形式为http://ip_address/url/#####。若数据库中存在该条目，返回301重定位；若不存在该条目，返回404.

###设计思路：
#####总体思路：
    利用递增的数据库，即每存入一个条目，_id递增1，将这个十进制id转换为62进制（10+26+26）,生成5位短网址id。
#####实现细节：
    - 数据库使用mongodb，数据库操作使用nodejs中mongoose模块。
    - web服务器使用express进行构建。
    - 前端使用AngularJS框架。
#####工程迭代目标：
    时间较短，只搭出了简陋的一个网站。将从以下角度进行迭代：
    - 使用递增数据库不利于并行计算，会限制服务器性能。可以改为从未选取的id中随机选取一个
    - api功能不完善，应该加入对DELETE的支持
    - api部分错误处理函数不够详细