var mongoose = require('mongoose');
var MovieSchema = require('../schema/movie');
var Movie = mongoose.model('Movie',MovieSchema);

console.log(3);

module.exports = Movie; 

