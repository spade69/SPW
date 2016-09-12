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
//only use shim config for non-AMD scripts
//Here we config bootstrap.min.js, it depends jquery,so we should write deps:['jquery']
//exports: the name you use. We introduce the bootstrap using CDN, then config it using shim!
//
require.config({

    shim: {
        'bootstrap': {
            //These script dependencies should be loaded before loading
            //bootstrap.min.js
            deps: [ 'jquery'],
            //Once loaded, use the global 'bootstrap' as the
            //module value.
            exports: 'bootstrap'
        },
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);