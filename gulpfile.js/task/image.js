/*
    minify images and move them to dist
*/
module.exports = function (gulp, plugin, config) {

    return function () {

        if ( config.build.production ) {
            return gulp.src( config.glob.image )
            	.pipe( plugin.imagemin( {
    		            progressive: true,
    		            svgoPlugins: [ {removeViewBox: false} ],
    		            use: [ plugin.pngquant() ]
    		        } ) )
                .pipe( gulp.dest( config.dir.build.image ) );
        } else {
            return true;
        }

    };
};