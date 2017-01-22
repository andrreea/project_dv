module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: './karma.conf.js'
            }
        },
        copy: {
            img: {
                src: 'img/*',
                dest: 'dist/'
            },
            html: {
                src:'index.html',
                dest: 'dist/'
            },
            assets: {
                src: 'themes/stylesheets/screen.css',
                dest: 'dist/'
            },
            fonts: {
                cwd: 'node_modules/font-awesome',
                expand: true,
                src: ['**'],
                dest: 'dist/fonts'
            },
            fontslocal: {
                cwd: 'themes/fonts',
                expand: true,
                src: ['**'],
                dest: 'dist/themes/fonts'
            },
            css : {
                src: '.tmp/concat/app.css',
                dest: 'dist/app.css'
            },
            js: {
                src: '.tmp/concat/app.js',
                dest:'dist/app.js'
            },
            server: {
                src: 'server.js',
                dest: 'dist/server.js'
            },
            serverProxy: {
                src: 'server/**/*',
                dest: 'dist/'
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            source: {
                files: [
                    {
                        src: [
                            'dist/app.js',
                            'dist/app.css'
                        ]
                    }
                ]
            }
        },
        usemin: {
            html: 'dist/index.html',
            options: {
                flow: {
                    steps: {
                        js: ['concat'],
                        css: ['concat']
                    }
                }
            }
        },
        run: {
            tool: {
                cmd: 'npm run build'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('build', [
        'copy:img',
        'copy:html',
        'copy:assets',
        'useminPrepare',
        // 'concat',
        // 'concat:generated'
        'copy:js',
        'copy:fonts',
        'copy:fontslocal',
        'copy:css',
        'copy:server',
        'copy:serverProxy',
        'filerev',
        'usemin'
    ]);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('default', ['build', 'test']);

};