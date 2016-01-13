/*
    copy all other files to dist and src files over
*/
module.exports = function (gulp, plugin, config) {


    return function () {

        if ( config.build.production ) {

            // copy font files
            gulp.src( plugin.mainBowerFiles( {
                filter: config.filter.font
            } ).concat( config.glob.fonts ) )
                .pipe( plugin.plumber({ errorHandler: config.error.handler }) )
                .pipe( gulp.dest( config.dir.build.fonts ) );
            
        } else {
            // copy css files
            gulp.src( config.glob.css )
              .pipe( gulp.dest( config.dir.build.css ) );
            
            // all assets
            gulp.src( config.glob.asset )
              .pipe( gulp.dest( config.dir.build.asset ) );

            // templates
            gulp.src( config.glob.template )
              .pipe( gulp.dest( config.dir.build.app ) );

        }

        // copy bower file
        gulp.src( config.path.bower )
            .pipe( gulp.dest( config.dir.build.root ) );

        // copy src files
        gulp.src( config.glob.src )
            .pipe( gulp.dest( config.dir.build.src ) );
       
    };
};