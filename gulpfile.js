var gulp=require('gulp'),
	sass=require('gulp-ruby-sass'),
	autoprefixer=require('gulp-autoprefixer'),
	cssnano=require('gulp-cssnano'),
	rename=require('gulp-rename'),
	notify=require('gulp-notify'),
	jshint=require('gulp-jshint'),
	uglify=require('gulp-uglify'),
	concat=require('gulp-concat'),
	imagemin=require('gulp-imagemin'),
	cache=require('gulp-cache'),
	del=require('del'),
	requirejsOptimize=require('gulp-requirejs-optimize'),
	amdOptimize=require('amd-optimize'),
	livereload=require('gulp-livereload');


//定义一个styles任务 Compile Sass,Autoprefix and minify
gulp.task('styles',function(){
	return sass('./style/scss/*.scss',{style:'expanded'})
		.pipe(autoprefixer({
			browsers:['Firefox>=4','Opera>=10','Android>=4.0'],
			cascade:true, //是否美化属性值 默认：true
			remove:true //去掉不必要的前缀
		}))
		.pipe(gulp.dest('./style/css'))
		.pipe(rename({suffix:'.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(notify({message:'Styles task complete'}));
});


//image
gulp.task('images',function(){
	return gulp.src('images/**/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({optimizationLevel:5,progressive:true,interlaced:true})))
		.pipe(gulp.dest('dist/assets/images'))
		
});

//scripts task
gulp.task('scripts',function(){
	return gulp.src('js/**/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('default'))
	.pipe(concat('index.js'))
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(notify({message:'Scripts task complete'}));
});
//clean
gulp.task('clean',function(){
	return del(['dist/assets/css','dist/assets/js','dist/assets/img']);
});
	



gulp.task('rjsAMD',function(){
	gulp.src('./js/**/*.js')
		.pipe(amdOptimize("../app/main",{
			//require config
			"paths":{
		        "app":"../app",
		        "jquery":"../lib/jquery.min",
		        "bootstrap":"../lib/bootstrap.min"
    		},
			configFile:"./js/amd.json",
			baseUrl:"./js/common",

		}))
//		.pipe(jshint('.jshintrc'))
//		.pipe(jshint.reporter('default'))
		.pipe(concat("index.js")) //合并
		.pipe(gulp.dest('dist/assets/js')) //输出保存
		.pipe(rename("index.min.js"))	//重命名
		.pipe(uglify())//压缩
		.pipe(gulp.dest("dist/assets/js"))//输出保存 
		.pipe(notify({message:'Scripts task complete'}));
});
//default
gulp.task('default',['clean'],function(){
	gulp.start('rjsAMD','scripts','images');
});

//运行方法 gulp taskname

gulp.task('watch',function(){

	//watch .scss file
	gulp.watch('./style/scss/*.scss',['styles']);

	//watch js
	gulp.watch('./js/**/*.js',['rjsAMD']);
	//watch image
	gulp.watch('images/**/*',['images']);
	//create livereload server

	livereload.listen();	//
	gulp.watch(['dist/**']).on('change',livereload.changed);
});


/*

gulp.task('rjs',function(){
	return gulp.src('js/common/*.js')
	.pipe(requirejsOptimize({
		mainConfigFile:'js/app.js',
		exclude:['jquery']
	}))
	.pipe(gulp.dest('dist/js/mod'));
});



gulp.task('testPreFx',function(){
	gulp.src('style/css/*.css')
	.pipe(autoprefixer({
		browsers:['Firefox>=4','Opera>=10','Android>=4.0'],
		cascade:true, //是否美化属性值 默认：true
		remove:true //去掉不必要的前缀
	}))
	.pipe(gulp.dest('style/test'));
});

*/