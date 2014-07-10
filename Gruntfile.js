module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            files: {
                'build/script/script.js': ['src/script/**/*.js', 'src/script/**/*.json']
            },

            dist: {
                options: {
                    compress: true,
                    report: 'min',
                    sourceMap: true,
                    wrap: true
                }
            },
            dev: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    report: 'min',
                    wrap: true
                }
            }
        },

        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/template/',
                    src: '**/*.html',
                    dest: 'build/template/'
                }],
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: "compressed"
                },
                files: {
                    "build/style/main.css": "src/style/main.scss"
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/src/image',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif'],
                    dest: 'build/image/'
                }]
            }
        },

        nodewebkit: {
            options: {
                build_dir: 'builds',
                mac: true,
                win: false,

                version: "0.10.0-rc1",
                zip: false
            },
            src: ['./**/*']
        },

        watch: {
            js: {
                files: ["public/src/script/**/*.js"],
                tasks: ['uglify:dev']
            },
            html: {
                files: ["public/src/template/**/*.html"],
                tasks: ["htmlmin"]
            },
            sass: {
                files: ["public/src/style/**/*.scss"],
                tasks: ["sass"]
            },
            imagemin: {
                files: ["public/src/image/**/*"],
                tasks: ["imagemin"]
            }
        },

        concurrent: {
            do: ['uglify:dev', 'htmlmin', 'sass', 'imagemin'],
            watch: ['watch:js', 'watch:html', 'watch:sass', 'watch:imagemin'],
            options: {
                logConcurrentOutput: true,
                limit: 4
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-node-webkit-builder');

    grunt.registerTask('default', ['concurrent:do', 'nodewebkit']);
};
