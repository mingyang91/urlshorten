var mongoose=require('mongoose'),
	autoIncrement= require('mongoose-auto-increment');

var conn= mongoose.createConnection('mongodb://localhost:27017/urlStorage');
autoIncrement.initialize(conn);
var urlSchema= new mongoose.Schema({
	url: String,
	short: String
});

urlSchema.plugin(autoIncrement.plugin, 'Url');
var urlModel= conn.model('Url', urlSchema);

exports.myModel= urlModel;