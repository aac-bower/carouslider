

module.exports = function( gulp, plugin, config ) {

    return function() {
        var watchGlob = plugin.extend( false, [], config.glob.src );
        watchGlob.push( config.path.bower );

        return plugin.watch( 
            watchGlob, 
            function( e ) {
                var reloadDelay = 0;

                // console.log( e.event, e.extname );
                if ( e.event == 'add' || e.event == 'unlink' ) {
                    config.task.inject();
                    reloadDelay = 200;
                }

                switch( e.extname ) {
                    case '.scss': config.task.sass(); break;
                    case '.json': config.task.wiredep(); break;
                    case '.html': case '.js': 
                        // to give time to to the inject task to complete. Task takes an AVG of 41ms on my machine. So 4x as slow is still ok.
                        setTimeout( function() {
                            plugin.browserSync.reload(); 
                        }, reloadDelay );
                    break;
                }
            } 
        );
    };
};