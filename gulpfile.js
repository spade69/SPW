var gulp=require('gulp'),
	sass=require('gulp-ruby-sass');

//定义一个testLess任务
gulp.task('sass',function(){
	return sass('./style/scss/*.scss',{style:'expanded'})
		.pipe(gulp.dest('./style/css'))
});

//current prefix
gulp.task('watch',function(){
	gulp.watch('style/scss/*.scss',['sass']);
});

gulp.task('default',['sass','watch']);

