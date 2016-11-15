//feature Detection 
define(function(){
	var isSupported=function(eventType,version){
		return document.implementation.hasFeature(eventType,version);
	};

	return{
		isSupported:isSupported
	};
})