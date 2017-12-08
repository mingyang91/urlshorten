'use strict';
var mongoose= require('mongoose'),
	urlModel= require('../api/model').myModel,
	trans= require('../api/trans');
exports.create_a_shortened_url= function(request, response){
	if(request.body.data!= null){
		urlModel.findOne({
			'url': request.body.data
		}, function(err, result){
			if(err)
				console.log(err);
			else{
				if(result== null){
					urlModel.create({
						'url': request.body.data,
						'short': '00000'			//temporary
					},function(err, result){
						if(err)
							console.log(err);
						else{
							var shortString= trans.trans(result._id);
							if(shortString.length< 5){
								var temp=[];
								for(var i=0; i<5- shortString.length; i++){
									temp.unshift('0');
								}
								shortString= temp.join('')+ shortString;
							}

							urlModel.update({'_id': result._id}, {$set: {'short': shortString}}).exec();
							response.json({
								'status': 'OK',
								'short': shortString
							});

						}
					});
				}
				else{
					//already have one
					response.json({
						'status': 'registered',
						'short': result.short
					});
				}
			}
		});
	}else{
		response.json({
						'status': 'failed'
					});
	}
};
exports.get_origin_url= function(request, response){
	urlModel.findOne({'short': request.params.urlId}, function(err, result){
		if(err){
			console.log(err);
		}else{
			if(result==null){
				response.status(404).send('Sorry, we cannot find that page!');
			}else{
				response.redirect(301, result.url);
			}
		}
	});
};