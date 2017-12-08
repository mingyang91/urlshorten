angular.module('urlShorterApp',[])
	.controller('UrlShorterController', function($http, $httpParamSerializerJQLike){
		var urlShorter= this;
		urlShorter.done= false;
		urlShorter.request= function(){
			var url= 'http://?????/shorten/';

			var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

		    var data= {
				'data': urlShorter.urlText
			};

			$http.post(url, data, config)
				.then(
			    	function(response){
			    		if(response.data.status=='OK'|| response.data.status=='registered'){
			    			urlShorter.urlResult= 'http://localhost:8192/url/'+ response.data.short;
			    			urlShorter.done= true;
			    		}else{
			    			window.alert('request failed');
			    		}
			    	},
			    	function(response){
			    		window.alert('request failed');
			    	}
			    );
		};
	});
