var gulp = require('gulp')

gulp.task('default',['task1','task2'],function(){
	console.log('task default')
})

gulp.task('task1', function(){
	console.log('task1')
})

gulp.task('task2', ['task3'],function(){
	console.log('task2')
})

gulp.task('task3', function(){
	console.log('task3')
})

gulp.task('copy', function(){
	gulp.src('./src/**/*').pipe(gulp.dest('./dist/'))
})

gulp.task('watchfile',function(){
	gulp.watch('./src/App.vue', function(){
		console.log('saved')
	})
})