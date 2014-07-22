module.exports = function(grunt) {

    grunt.initConfig({
        
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('develop', ['sass', 'watch:sass']);
};
