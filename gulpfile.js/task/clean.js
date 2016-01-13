/*
    clean out old build
*/
module.exports = function (gulp, plugin, config) {

    return function () {
        return plugin.del( config.dir.build.root );
    };
};