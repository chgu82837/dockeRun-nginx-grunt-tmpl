

module.exports = function(grunt) {

  var src_path = "src/";
  var dist_path = "dist/";

  var jsx_files = ['*.js', '*.jsx', '**/*.js', '**/*.jsx'];
  var jade_files = ['*.jade,', '**/*.jade'];
  var jade_ignored_files = ['!_*.jade', '!**/_*.jade'];
  var sass_files = ['*.scss', '*.sass', '**/*.scss', '**/*.sass'];
  var sass_ignored_files = ['!_*.scss', '!_*.sass', '!**/_*.scss', '!**/_*.sass'];

  // -- Config ----------

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // -- Babel Config ----------

    babel: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: [{
          expand: true,
          cwd: src_path,
          src: jsx_files,
          dest: dist_path,
          ext: '.js',
        }],
      }
    },

    // -- Jade Config ----------

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [
          {
            expand: true,
            cwd: src_path,
            src: jade_files.concat(jade_ignored_files),
            dest: dist_path,
            ext: '.html',
          }
        ],
      }
    },

    // -- Sass Config ----------

    sass: {                              // Task
      dist: {                            // Target
        files: [{
          expand: true,
          cwd: src_path,
          src: sass_files.concat(sass_ignored_files),
          dest: dist_path,
          ext: '.css',
        }],
      }
    },

    // -- Watch Config ----------

    watch: {
      options: {
        livereload: true,
      },
      js: {
        options: {
          cwd: src_path,
        },
        files: jsx_files,
        tasks: ['babel'],
      },
      jade: {
        options: {
          cwd: src_path,
        },
        files: jade_files,
        tasks: ['jade'],
      },
      sass: {
        files: sass_files,
        options: {
          cwd: src_path,
        },
        tasks: ['sass'],
      }
    },
  });

  // -- Main Tasks -------------

  // Load Plugins.

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)

  grunt.registerTask('default', ['babel', 'jade', 'sass', 'watch']);

};
