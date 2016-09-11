// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// Some lib from CDN!!!!!
// except 'app' ones, 
require.config({
	//直接改变基目录
	"baseUrl":"js/common",
	"paths":{
		"app":"../app",
		"jquery":"http://libs.baidu.com/jquery/2.0.0/jquery.min",
		"bootstrap":"http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min"
	}
});


// Load the main app module to start the app
requirejs(["app/main"]);