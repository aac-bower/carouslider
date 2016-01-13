/*
    Bower
*/
module.exports = function ( gulp, plugin, config ) {
    return function () {
        // SASS
        gulp.src( config.path.vendorScss )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( plugin.wiredep() )
            .pipe( gulp.dest( config.dir.src ) );


        // CSS & JS
        return gulp.src( config.path.indexHtml )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( plugin.wiredep() )
            .pipe( gulp.dest( config.dir.src ) );

    };
};