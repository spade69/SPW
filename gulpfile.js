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
	cache=require('gulp-cache');	


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

//image
gulp.task('images',function(){
	return gulp.src('images/**/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({optimizationLevel:5,progressive:true,interlaced:true})))
		.pipe(gulp.dest('dist/assets/img'))
		.pipe(notify({message:'Images task complete'}));
});

//current prefix
gulp.task('watch',function(){
	gulp.watch('style/scss/*.scss',['sass']);
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

gulp.task('default',['testPreFx','watch']);

//运行方法 gulp taskname
//gulp sass 
//gulp watch
//or 直接 gulp default