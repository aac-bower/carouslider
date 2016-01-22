/*
    Sass
*/
module.exports = function (gulp, plugin, config) {
    return function () {

        // handle index.vendor.scss compilation to .tmp/css/vendor.scss
        gulp.src( config.path.vendorScss )
            .pipe( plugin.sourcemaps.init() )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( plugin.sass() )
            .pipe( plugin.rename( { basename: 'vendor' } ) )
            .pipe( plugin.sourcemaps.write() )
            .pipe( gulp.dest( config.dir.css ) )
            .pipe( plugin.browserSync.stream() );

        // grab this file (as it holds the imports to all other .scss files - except vendor -
        // we don't have to link to any other files)
        return gulp.src( config.path.styleScss )
            // initialize sourcemaps plugin
            .pipe( plugin.sourcemaps.init() )
            // make sure that if we get error (invalid sass) that we don't break out of the server
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            // compile it to css and set some settings for error handling
            .pipe( plugin.sass({includePaths: ['./src']}) )
            // rename the file to 'style'
            .pipe( plugin.rename( { basename: 'style' } ) )
            // write the sourcemap into the stream
            .pipe( plugin.sourcemaps.write() )
            // write what you have in the following directory
            .pipe( gulp.dest( config.dir.css ) )
            // let browserSync stream this file content to all connected browsers
            .pipe( plugin.browserSync.stream() );
    };
};