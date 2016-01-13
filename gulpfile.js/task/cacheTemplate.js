/*
    caching the templates
*/
module.exports = function (gulp, plugin, config) {


    return function () {
    	function getTemplateCache() {
	        return gulp.src( config.glob.template )
	            .pipe( plugin.cache( config.build.templatecacheTmpFile, {
			    	transformUrl: function( url ) {
					    return config.build.pathCorrection.templatecache.prefix + url;
					},
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
			    } ) );
    	}

    	setTimeout( cacheTemplate, 0 );

    	function cacheTemplate() {
            if ( config.build.production ) {
    	    	return gulp.src( config.dir.build.dist + '/' + config.name + '.min.js' )
    	    		// add the templatecache to the stream
    			    .pipe( plugin.stream.obj( getTemplateCache() ) )

                    // fix paths to images
                    // .pipe( plugin.replace(
                    //     config.build.pathCorrection.templatecache.search, 
                    //     config.build.pathCorrection.templatecache.replace
                    // ) )
                    .pipe( plugin.replace(
                        'src=\\"/asset/', 'src=\\"' + ( config.dir.build.root || '' ) + 'dist/asset/'
                    ) )
                    .pipe( plugin.replace(
                        'asset/image/', 'dist/asset/image/'
                    ) )

    			    // concatenate the whole thing
    			    .pipe( plugin.concat( config.name + '.min.js' ) )
    			    // write it to the build
    			    .pipe( gulp.dest( config.dir.build.dist ) );
            } else {
                return true;
            }
    	}
    };
};