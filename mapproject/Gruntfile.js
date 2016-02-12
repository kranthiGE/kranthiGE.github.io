//Grunt is just JavaScript running in node, after all...
module.exports = function(grunt) {
// All upfront config goes in a massive nested object.
  grunt.initConfig({
    // You can set arbitrary key-value pairs.
    destFolder: 'dist',
    distFolder: 'js',
    // You can also set the value of a key as parsed JSON.
    // Allows us to reference properties we declared in package.json.
    pkg: grunt.file.readJSON('package.json'),
    // Grunt tasks are associated with specific properties.
    // these names generally match their npm package name.
    concat: {
      // Specify some options, usually specific to each plugin.
      options: {
        // Specifies string to be inserted between concatenated files.
        separator: ';'
      },
      // 'dist' is what is called a "target."
      // It's a way of specifying different sub-tasks or modes.
      dist: {
        // The files to concatenate:
        // Notice the wildcard, which is automatically expanded.
        src: ['js/*.js'],
        // The destination file:
        // Notice the angle-bracketed ERB-like templating,
        // which allows you to reference other properties.
        // This is equivalent to 'dist/main.js'.
        dest: '<%= distFolder %>/main.js'
        // You can reference any grunt config property you want.
        // Ex: '<%= concat.options.separator %>' instead of ';'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [
          {src: ['js/main.js'], dest: '<%= destFolder %>/js/main.min.js'},
          {src: ['js/foursquare.api.js'], dest: '<%= destFolder %>/js/foursquare.api.min.js'}
        ]
      }
    },
    cssmin: {
      target: {
        files: [
          {expand: true, src: 'css/style.css', dest: '<%= destFolder %>', ext: '.min.css'}
        ]
      }
    },
    minifyHtml: {
      options: {
        cdata: true
      },
      dist: {
        files: [
          {expand: true, src: '*.html', dest: '<%= destFolder %>', ext: '.html'}
        ]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: 'css/*', dest: '<%= destFolder %>'},
          {expand: true, src: 'fonts/*', dest: '<%= destFolder %>'},
          {expand: true, src: 'images/*', dest: '<%= destFolder %>'},
          {expand: true, src: 'js/lib/*', dest: '<%= destFolder %>'}
        ]
      }
    },
    clean: {
      build: {
        src: 'dist/*'
      }
    },
    jshint: {
      // define the files to lint
      files: ['js/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  }); // The end of grunt.initConfig

  // We've set up each task's configuration.
  // Now actually load the tasks.
  // This will do a lookup similar to node's require() function.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-minify-html');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-jsonlint');

  // Register our own custom task alias.
  grunt.registerTask('default', ['clean', 'uglify', 'jshint', 'cssmin', 'minifyHtml', 'copy']);
};