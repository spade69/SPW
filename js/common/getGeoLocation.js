
/*
My GeoLocation  module source
Author Jason
Date 2016/9/11
*/
//HTML5 Geolocation
define(['jquery','hmac-sha1'],function(jquery,CryptoJS){
    
//Global object. saved postion data.
    function CreateLocation(){
        this.latitude=undefined;
        this.longitude=undefined;
        this.setLatitude=function(latitude){
            this.latitude=latitude;
        }
        this.getLatitude=function(){
            return this.latitude;
        }
        this.setLongitude=function(longitude){
            this.longitude=longitude;
        }
        this.getLongitude=function(){
            return this.longitude;
        }
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
            navigator.geolocation.latitude=coords.latitude+0.00374531687912;//偏移量校正值 
            navigator.geolocation.longitude=coords.longitude+0.008774687519;
            console.log("Success ",this.latitude,this.longitude);
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
            var api="http://api.openweathermap.org/data/2.5/weather?q="; //http:
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
            //var api="//api.thinkpage.cn/v3/weather/now.json";
            var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
            var userId="U8375BA840"; //no need 
            var key="?key=prvl5fqcz7mcguh3";
            var city="q=Shenzhen";
            //返回数据的单位。不设置默认不是摄氏度
            var units="&units=metric"; //metric";c
            //&jsoncallback=?,设置为?是jq随机产生一个名字，但是此处必须指定一个名字，都可以除了?
            var lat="lat="+navigator.geolocation.latitude;//22.53675831687912);
            var lon="&lon="+navigator.geolocation.longitude;//113.93925068751899);
            //var location="?location="+navigator.geolocation.latitude+":"+navigator.geolocation.longitude;
            var cb="&jsoncallback=JSON_CALLBACK";
           // var cb="&callback=showWeather";
            var html='<h4>MyWeather</h4>';
                 //获取时间戳
            // var ts=Math.floor((new Date()).getTime()/1000);
            // //构造验证参数字符串
            // var str="&ts="+ts+"&uid="+userId;
            //     //使用HMAC-SHA1方式，以API秘钥为key对上一步生成的参数字符串进行加密
            //     //将加密结果用base64存储
            // var sig=CryptoJS.HmacSHA1(str,key).toString(CryptoJS.enc.Base64);
            // sig=encodeURIComponent(sig);
            // str=str+"&sig="+sig;
            var proxy='https://bird.ioliu.cn/v1/?url=';
            $.getJSON(proxy+api+lat+lon+units+appid+cb,function(data){
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