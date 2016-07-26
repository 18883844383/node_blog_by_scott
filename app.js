var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/test_db2');//链接数据库

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views/pages'));//渲染的index地址
app.set('view engine','jade');//模板引擎
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.locals.moment = require('moment');


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
	});
});


app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'后台录入页',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			summary:'',
			language:'',
		}
	})
});

app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页',
			})
		})
	}
})

app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id; 
	var movieObj = req.body.movie;
	var _movie;
console.log(id);	
	if(id !== 'undefined'){//该电影已经存储过,这里加分号
		console.log(123);
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			
			_movie = _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				
				res.redirect('/movie/' + movie._id);
			});
		});
	}else{
		_movie= new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.summary,
		});
		
		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}
			res.redirect('/');
		});
	}
})


app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'imooc list',
		
	})
});


app.delete('/admin/list',function(req,res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1})
			}
		})
	}
})
