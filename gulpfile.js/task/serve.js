

module.exports = function( gulp, plugin, config ) {

    return function() {

        plugin.browserSync.init( {
            notify: false,
            online: false,
            server: {
                baseDir: config.dir.src,
                routes: {
                    "/bower_components" : config.dir.bower_components,      // when we ask for bower components look in this folder
                    "/css"              : config.dir.css,        // serve css files from this dir
                    "/data"             : config.dir.data        // data folder incase we want to mock an API. Here we can save our json files
                },
            }
        } );
    };
};