/*
    Injecting all files so we don't have to ref them
*/
module.exports = function (gulp, plugin, config) {

    function inject( source, paths ) {
        var sources = gulp.src( paths, { read: false } );

        return gulp.src( source )
            .pipe( plugin.inject( 
                sources, {
                    ignorePath: config.inject.ignorePath, 
                    addRootSlash: false
                } ) )
            .pipe( gulp.dest( config.dir.src ) )
        ;
    }

    return function() {

        // inject all scss files in to index.style.scss
        inject(
            config.path.styleScss,
            config.glob.sass
        );

        // inject all javascript files into index.html
        return inject(
            config.path.indexHtml,
            config.glob.injectJs
        );
    };
};