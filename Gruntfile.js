module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'build/'
                }],
                options: {
                    compress: true,
                    report: 'min',
                    sourceMap: true
                }
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'build/'
                }],
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    report: 'min'
                }
            }
        },

        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.html',
                    dest: 'build/'
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
    grunt.loadNpmTasks('grunt-atom-shell-app-builder');

    grunt.registerTask('default', ['concurrent:do']);
};
