var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	
	next();
});


MovieSchema.statics = {
	fetch:function(cb){ console.log(2);
		return this
				.find({})
				.sort('meta.updateAt')
				.exec(cb)
	}
}

module.exports = MovieSchema;