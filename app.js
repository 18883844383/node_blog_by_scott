var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/test_db2');//链接数据库

app.set('views',path.join(__dirname,'views/pages'));//渲染的index地址
app.set('view engine','jade');//模板引擎
app.listen(port);

console.log('imooc started on port port 3000');

app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		
		res.render('index',{
			title:'imooc首页',
			movies:movies
		});
	});
});

app.get('/movie/:id',function(req,res){
	var id = req.params.id;
	
	Movie.findById(id,function(err,movie){
		res.render('detail',{
			title:'imooc' + movie.title
		});
	})
});


app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'imooc admin',
	})
});

app.post('/admin/movie/new',function(res,req){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	
	if(id !== undeifined){
		
	}
})


app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'imooc list',
		
	})
});