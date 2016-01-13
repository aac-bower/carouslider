/*
    Get fonts in the right place
*/
module.exports = function (gulp, plugin, config) {
    return function() {
        return gulp.src( config.glob.bowerFonts )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( gulp.dest( config.dir.fonts ) );
    };
};