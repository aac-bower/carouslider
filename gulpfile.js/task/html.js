/*
    combine and minify assets linked in html
*/
module.exports = function (gulp, plugin, config) {

    return function () {
        var stream = gulp.src( config.path.indexHtml )
            .pipe( plugin.useref( {
               noconcat: !config.build.production
            } ) )
            .pipe( plugin.if( '*.js', plugin.annotate() ) )
        ;

        if ( config.build.production ) {
            stream
                .pipe( plugin.if( '*.js', plugin.uglify() ) )
                .pipe( plugin.if( '*.css', plugin.cssnano() ) );
        }

        return stream
            .pipe( gulp.dest( config.dir.build.root ) );
    };
};