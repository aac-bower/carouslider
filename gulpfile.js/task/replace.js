/*
    replacing old references
*/
module.exports = function (gulp, plugin, config) {


    return function () {

        if ( config.build.production ) {
            // fix asset file paths
            gulp.src( config.build.pathCorrection.assetPathProd.glob )
                .pipe( plugin.replace(
                    config.build.pathCorrection.assetPathProd.search, 
                    config.build.pathCorrection.assetPathProd.replace
                    // if we are not serving from root
                    // '/asset/', ( config.component.build.root || '' ) + 'dist/asset/'
                ) )
                .pipe( gulp.dest( config.dir.build.root ) )
            ;
        } else {

            gulp.src( config.build.pathCorrection.assetPath.glob )
                .pipe( plugin.replace(
                    config.build.pathCorrection.assetPath.search, 
                    config.build.pathCorrection.assetPath.replace
                ) )
                .pipe( gulp.dest( config.dir.build.root ) )
            ;
            
            gulp.src( config.build.pathCorrection.cssPath.glob )
                .pipe( plugin.replace(
                    config.build.pathCorrection.cssPath.search, 
                    config.build.pathCorrection.cssPath.replace
                ) )
                .pipe( gulp.dest( config.dir.build.root ) )
            ;

        }
    };
};