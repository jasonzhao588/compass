var gulp = require('gulp'),
	compass = require('gulp-compass'),
	mincss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect');


gulp.task('connect',function(){
    connect.server({
        root:'./app',  
        ip:'localhost',
        port: '8888',
        livereload:true
    })
})

gulp.task('html', function(){
  gulp.src('./app/*.html')
      .pipe(connect.reload());
});

gulp.task('style',function(){
	gulp.src('./sass/*.scss')
	.pipe(compass({
		config_file:'./config.rb',
		css: './app/css',
		sass: 'sass'
	}))
	.pipe(mincss({
		keepSpecialComments: 0
	}))
	.pipe(rename({
		extname: '.min.css'
	}))
  	.pipe(gulp.dest("./app/css"))
  	.pipe(connect.reload());
});




gulp.task('watch',function(){
	gulp.watch('./sass/*.scss',['style']);
	gulp.watch('./app/*.html',['html']);
})
gulp.task('default',['style','connect','watch'],function(){
	console.log('my tasks')
});


