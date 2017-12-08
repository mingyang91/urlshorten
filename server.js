var express= require('express'),
	app= express(),
	port= 80,
	mongoose= require('mongoose'),
	bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes= require('./api/route');
routes(app);

app.use(express.static('assets'));

app.listen(port);

console.log('server starts on port:'+ port);
