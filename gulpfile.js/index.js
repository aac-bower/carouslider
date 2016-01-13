
/*
    gulp index
*/ 'use strict';



/*
    Requires
*/
var gulp = require('gulp');

var plugin = {
    cache:             require('gulp-angular-templatecache'),
    browserSync:       require('browser-sync').create(),
    exec:              require('child_process').exec,
    pngquant:          require('imagemin-pngquant'),
    mainBowerFiles:    require('main-bower-files'),
    annotate:          require('gulp-ng-annotate'),
    sourcemaps:        require('gulp-sourcemaps'),
    sync:              require('gulp-sync')(gulp),
    wiredep:           require('wiredep').stream,
    imagemin:          require('gulp-imagemin'),
    plumber:           require('gulp-plumber'),
    cssnano:           require('gulp-cssnano'),
    replace:           require('gulp-replace'),
    useref:            require('gulp-useref'),
    uglify:            require('gulp-uglify'),
    notify:            require('gulp-notify'),
    rename:            require('gulp-rename'),
    inject:            require('gulp-inject'),
    concat:            require('gulp-concat'),
    stream:            require('add-stream'),
    watch:             require('gulp-watch'),
    sass:              require('gulp-sass'),
    if:                require('gulp-if'),
    extend:            require('extend'),
    path:              require('path'),
    del:               require('del')
};

var gulpsync = require('gulp-sync')(gulp);
var config   = require('./config.js')( gulp, plugin );



/* 
    Development
*/
gulp.task( 'inject',  config.task.inject  );
gulp.task( 'wiredep', config.task.wiredep );
gulp.task( 'sass',    config.task.sass    );
gulp.task( 'font',    config.task.font    );

gulp.task( 'serve', ['inject', 'sass'], config.task.serve );
gulp.task( 
    'default', 
    gulpsync.sync( ['wiredep', 'font',  'serve'] ), 
    config.task.watch 
);



/*
    Build
*/
gulp.task( 'clean',          config.task.clean );
gulp.task( 'prepareBuild',   ['clean','inject', 'sass'] );

gulp.task( 'image',          config.task.image );
gulp.task( 'html',           config.task.html );
gulp.task( 'copy',           config.task.copy );
gulp.task( 'setupBuild',     ['image', 'html', 'copy'] );

gulp.task( 'replace',        config.task.replace );
gulp.task( 'cacheTemplate',  config.task.cacheTemplate );
gulp.task( 'serveBuild',     config.task.serveBuild );

gulp.task( 
    'build', 
    gulpsync.sync( [
        'wiredep', 
        'font', 
        'prepareBuild', 
        'setupBuild', 
        'replace', 
        'cacheTemplate', 
        'serveBuild'
    ] ) 
);
