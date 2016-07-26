# node_blog_by_scott
慕课网scott 老师教学视频学习
## 引入的模块
```
var _ = require('underscore'); // 提供了各种方法 each,map这些，类似jquery类库
var app.locals.moment = require('moment');//时间格式化
```

## app.js文件详解
- app.set('views',path.join(__dirname,'views/pages'));//渲染的index地址
- app.set('view engine','jade');//模板引擎


## 连接mongogb数据库
1.先打开mongodb数据库
2.在app.js中进行链接 mongoose.connect('mongodb://localhost/test_db2');

##
