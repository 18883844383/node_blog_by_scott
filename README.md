# node_blog_by_scott
慕课网scott 老师教学视频学习

## 其他
npm 安装服务器的各种某块
npm init bower init 安装包目录
bower 安装浏览器的各种插件类库  配置  .bowerrc文件，可以设置安装的路径


## 引入的模块
```
1. var _ = require('underscore'); // 提供了各种方法 each,map这些，类似jquery类库
2. app.locals.moment = require('moment');//时间格式化
3. var bodyParser = require('body-parser');//用来解析post请求
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
```

## app.js文件详解
- app.set('views',path.join(__dirname,'views/pages'));//渲染的index地址
- app.set('view engine','jade');//模板引擎

## 获取路径的方式
1.req.query 处理get
2.req.params 处理/:xxx的get或post请求
3.req.body 处理post请求体 json
优先级  req.pramse->req.body->req.query

## mongodb分析
### 连接mongodb数据库
1. 先打开mongodb数据库
2. 在app.js中进行连接 mongoose.connect('mongodb://localhost/test_db2');
3. 样例 
```
//连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_db2');

//创建集合，类似于mysql的建表
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var BlogPostConn = new Schema({
	author : String,
	title : String,
	body: String,
	date:Date
});

//创建模型
var BlogPost = mongoose.model('BlogPost',BlogPostConn);

//建立文章
var post = new BlogPost({
	author: 'calmound',
	title: 'First Post',
	body : 'This is a post',
	date: new Date()
});

//保存
post.save(function(err,post){
	if(err) console.log(err);
})

```

### 常用命名
1.  ./mongo 连接到mongodb服务器
2.  use dbName 选择用哪个数据库
3.  show dbs 展示所有数据库
4.  show collections 展示所有集合
5.  more... http://blog.csdn.net/majianfei1023/article/details/45166827



##
