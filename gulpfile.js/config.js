

module.exports = function( gulp, plugin ) {
    var userConfig;
    try {
        userConfig = require('../gulp.config.json');
        console.log( 'Using settings from \'gulp.config.json\'.' );
    } catch (e) {
        userConfig = {};
        console.log( 'NO \'gulp.config.json\' found.\nCreate a config file if you need to overwrite the settings in gulpfile.js/config.defaults.json');
    }

    var _config = plugin.extend( 
        true, 
        require('./config.defaults.json'), 
        userConfig
    );

    // console.log( _config );

    function getTask( name ) {
        console.log(name,' is stupid!');
        return require('./task/' + name + '.js')( gulp, plugin, config );
    }

    var config = {
        name:                     _config.name,
        build: {
            production:           _config.build.production,
            pathCorrection: {
                templatecache: {
                    prefix:       _config.build.pathCorrection.templatecache.prefix
                },
                assetPath: {
                    glob:         _config.build.pathCorrection.assetPath.glob,
                    search:       _config.build.pathCorrection.assetPath.search,
                    replace:      _config.build.pathCorrection.assetPath.replace
                },
                assetPathProd: {
                    glob:         _config.build.pathCorrection.assetPathProd.glob,
                    search:       _config.build.pathCorrection.assetPathProd.search,
                    replace:      _config.build.pathCorrection.assetPathProd.replace
                },
                cssPath: {
                    glob:         _config.build.pathCorrection.cssPath.glob,
                    search:       _config.build.pathCorrection.cssPath.search,
                    replace:      _config.build.pathCorrection.cssPath.replace
                }
            },
            templatecacheTmpFile: _config.build.templatecacheTmpFile
        },
        dir: {
            src:                  _config.dir.src,
            app:                  _config.dir.app,
            tpm:                  _config.dir.tmp,
            css:                  _config.dir.css,
            data:                 _config.dir.data,
            fonts:                _config.dir.fonts,
            bower_components:     _config.dir.bower_components,
            build: {
                root:             _config.dir.build.root,
                dist:             _config.dir.build.dist,
                src:              _config.dir.build.src,
                fonts:            _config.dir.build.fonts,
                image:            _config.dir.build.image,
                app:              _config.dir.build.app,
                asset:            _config.dir.build.asset,
                css:              _config.dir.build.css
            }
        },
        path: {
            indexHtml:            _config.path.indexHtml,
            styleScss:            _config.path.styleScss,
            vendorScss:           _config.path.vendorScss,
            bower:                _config.path.bower
        },
        glob: {
            asset:                _config.glob.asset,
            image:                _config.glob.image,
            fonts:                _config.glob.fonts,
            sass:                 _config.glob.sass,
            template:             _config.glob.template,
            src:                  _config.glob.src,
            css:                  _config.glob.css,
            bowerFonts:           _config.glob.bowerFonts,
            injectJs:             _config.glob.injectJs
        },
        filter: {
            font:                 _config.filter.font
        },
        inject: {
            ignorePath:           _config.inject.ignorePath
        },
        error: {
            params: {
                title:    'Gulp',
                message:  '<%= error.message %>',
                sound: false
            },
            handler: function(err) {
                plugin.notify.onError( config.error.params )(err);

                if ( this.emit !== undefined ) this.emit('end');
            }
        }
    };

    config.task = {
        cacheTemplate: getTask('cacheTemplate'),
        clean: getTask('clean'),
        copy: getTask('copy'),
        font: getTask('font'),
        html: getTask('html'),
        image: getTask('image'),
        inject: getTask('inject'),
        replace: getTask('replace'),
        sass: getTask('sass'),
        serve: getTask('serve'),
        serveBuild: getTask('serveBuild'),
        watch: getTask('watch'),
        wiredep: getTask('wiredep')
    };

    return config;
};