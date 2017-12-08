'use strict';
var urlService= require('../api/controller');
module.exports= function(app){

	app.route('/shorten/')
		.post(urlService.create_a_shortened_url);
	app.route('/url/:urlId')
		.get(urlService.get_origin_url);
}