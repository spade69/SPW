
/*
My GeoLocation  module source
Author Jason
Date 2016/9/11
*/
//HTML5 Geolocation
define(['jquery'],function(jquery){

//Global object. saved postion data.
	function CreateLocation(){
		this.latitude=undefined;
		this.longitude=undefined;
	}

	CreateLocation.prototype={
		getLocation:function(){
			if(navigator.geolocation){

				//navigator.geolocation.getCurrentPosition(locationSuccess,showError,);
				var self=this;
				var wpid=navigator.geolocation.watchPosition(self.locationSuccess,self.showError,{
					//指示浏览器获取高精度的位置
					enableHighAcuracy:true,
					//指定获取地理位置的超时时间，ms
					timeout:50000,
					//最长有效期，重复获取地理位置时，此参数多久再次获取
					maximumAge:30000
				});
			}
			else{
				alert("Geolocation is not supported by this browser!");
			}
		},
		locationSuccess:function(position){
			var coords=position.coords;
			this.latitude=coords.latitude+0.00374531687912;//偏移量校正值 
			this.longitude=coords.longitude+0.008774687519;
			console.log(position);
		},
		showError:function(error){
			switch(error.code)
			{
				case error.PERMISSION_DENIED:
					console.log("User denied the request for Geolocation.");
					break;
				case error.POSITION_UNAVAILABLE:
					console.log("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					console.log("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					console.log("An unknown error occurred.");
					break;
			}
		},

	//AJAX longPolling,but it needs the corperation with server-side
		longPolling:function(){
			var api="http://api.openweathermap.org/data/2.5/weather?q=";
			var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
			var city="Shenzhen";
			// var lat="lat="+obj.latitude;
			// var lon="lon="+obj.longitude;
			//返回数据的单位。不设置默认不是摄氏度
			var units="&units=metric";
			var cb="&jsoncallback=JSON_CALLBACK";
			$.ajax({
				url:api+city+units+appid+cb,
				data:{"timed":new Date().getTime()},
				dataType:"jsonp",
				jsonpCallback:"JSON_CALLBACK",
				success:function(data){

				}
			});
		},
		myGetJSON:function(){
			var api="http://api.openweathermap.org/data/2.5/weather?";
			var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
			var city="q=Shenzhen";
			//返回数据的单位。不设置默认不是摄氏度
			var units="&units=metric";
			//&jsoncallback=?,设置为?是jq随机产生一个名字，但是此处必须指定一个名字，都可以除了?
			var lat="lat="+this.latitude;
			var lon="&lon="+this.longitude;
			
			var cb="&jsoncallback=JSON_CALLBACK";
			var html='<h4>MyWeather</h4>';

			$.getJSON(api+lat+lon+units+appid+cb,function(data){
				var weatherData='<ul>';
					//data已经被转为jq的对象
				var temp=Math.round(data.main.temp);
				var descript=data.weather[0].description;		
					/*$.each(data,function(k,v){
					 	console.log(k);
					 });*/
				html+='<span>'+data.name+','+data.sys.country+'</span>';
				$("#weather").html(html);
				weatherData+='<li>'+temp+'\u2103'+'</li>'+'<li>'+descript+'</li>';
				weatherData+='</ul>';
				$("#weather").append(weatherData);	
			});
		},
		handlePermission:function(){
			if(navigator.permissions){
				var self=this;
				navigator.permissions.query({name:'geolocation'}).then(function(result){
				if(result.state=='granted'){
					self.report(result.state);
					return false;//it doesn't need to ask if location is allowed to visited
				}else if(result.state=='prompt'){
					self.report(result.state);
					return true;
				}else if(result.state=='denied'){
					self.report(result.state);
					return false;
				}
					result.onchange=function(){
						self.report(result.state);
					}
				});
			}
			else
			{
				console.log("The browser doesn't support Permissions API!");
			}
		},
		report:function(state){
			console.log('Permission: '+state);
		}
	}
	return {
		CreateLocation:CreateLocation
	}

});