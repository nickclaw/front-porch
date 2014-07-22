module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            options: {
                style: 'compressed',
                precision: 4,
            },
            dist: {
                files: {
                    'build/style/main.css': 'src/style/main.scss'
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    compress: true,
                    report: 'min',
                    sourceMap: true,
                    wrap: true
                },
                files: {
                    'build/script/script.js': ['src/script/**/*.js', 'src/script/**/*.json']
                }
            },
            dev: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    report: 'min',
                    wrap: true
                },
                files: {
                    'build/script/script.js': ['src/script/**/*.js', 'src/script/**/*.json']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/template',
                    src: '**/*.html',
                    dest: 'build/template/'
                }]
            }
        },

        imagemin: {
            // todo, not important
        },

        watch: {
            js: {
                files: ["src/script/**/*.js"],
                tasks: ['uglify:dev']
            },
            sass: {
                files: ["src/style/**/*.scss"],
                tasks: ["sass"]
            },
            html: {
                files: ["src/template/**/*.html"],
                tasks: ["htmlmin"]
            },
            imagemin: {
                files: [/* todo */],
                tasks: ["imagemin"]
            }
        },

        concurrent: {
            dev: ['watch:js', 'watch:sass', 'watch:html', 'watch:imagemin'],
            dist: ['sass', 'htmlmin', 'uglify:dist'],
            options: {
                logConcurrentOutput: true,
                limit: 5
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['sass', 'uglify:dev', 'htmlmin', 'concurrent:dev']);
    grunt.registerTask('build', ['concurrent:dist']);
};
