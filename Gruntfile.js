module.exports = function(grunt) {
  grunt.initConfig({
    jshint: ['Gruntfile.js'],

    clean: {
      js: 'build/js'
    },

    browserify: {
      js: {
        src: 'src/main/js/viewer/**/*.js',
        dest: 'build/js/app.js',
      },

  },

  copy: {
    all: {
      expand: true,
      cwd: 'src/main/html',
      src: ['**/*.html', '../css/*.css', '**/*.css'],
      dest: 'build/',
    },
    ngApp: {
      expand: true,
      cwd: 'src/main/js/ngApp/',
      src: ['**/*.js'],
      dest: 'build/js',
    }

    },

  watch: {
    rebuild: {
      tasks: ['browserify', 'copy'],
      files: ['src/main/js/**/*.js']
    },

    html: {
      tasks: ['copy'],
      files: ['src/main/html/**/*.html']
    },

    ngApp: {
      tasks: ['copy'],
      files: ['src/main/js/ngApp/**/*.js']
    }

  }

});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task definitions
  grunt.registerTask('default', ['browserify', 'copy']);

};
