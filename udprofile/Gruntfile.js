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
          {src: ['js/*.js'], dest: '<%= destFolder %>/js/main.min.js'},
          {src: ['views/js/main.js'], dest: '<%= destFolder %>/views/js/main.min.js'},
          {src: ['views/js/SliderWorker.js'], dest: '<%= destFolder %>/views/js/SliderWorker.min.js'}
        ]
      }
    },
    cssmin: {
      target: {
        files: [
          {expand: true, src: 'css/*.css', dest: '<%= destFolder %>', ext: '.min.css'},
          {expand: true, src: 'views/css/*.css', dest: '<%= destFolder %>', ext: '.min.css'}
        ]
      }
    },
    minifyHtml: {
      options: {
        cdata: true
      },
      dist: {
        files: [
          {expand: true, src: '*.html', dest: '<%= destFolder %>', ext: '.html'},
          {expand: true, src: 'views/*.html', dest: '<%= destFolder %>', ext: '.html'}
        ]
      }
    },
    responsive_images: {
      myTask: {
        options: {
          engine: 'im'
        },
        files: [
          {
            expand: true,
            src: 'img/*',
            dest: '<%= destFolder %>/imgbuild'
          },
          {
            expand: true,
            src: 'views/images/*',
            dest: '<%= destFolder %>/imgbuild'
          }
        ]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: 'img/profilepic.jpg', dest: '<%= destFolder %>'},
          {expand: true, src: 'views/images/pizza.png', dest: '<%= destFolder %>'},

          {src: 'imgbuild/img/2048-small.png', dest: 'dist/img/2048-small.png'}
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
    },
    jsonlint: {
      // define the JSON files to validat
      src: ['insights/*.json', 'json/*.json']
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
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webp');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-jsonlint');

  // Register our own custom task alias.
  grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'minifyHtml', 'responsive_images', 'copy']);
};