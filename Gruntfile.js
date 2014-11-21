module.exports = function(grunt) {

	grunt.initConfig({
		jekyll: {
			build : {
				dest: '_site'
			}
		},
		
//		sass: {
//			dist: {
//				files: {
//					'css/main.css': '_assets/scss/main.scss'
//				},
//				options: {
//					outputStyle: 'compressed'
//				}
//			}
//		},
		
		uglify: {
			options: {
				preserveComments: false
			},
			target: {
				files: {
					'scripts/jquery.filter.main.js': ['_assets/scripts/jquery.filter.main.js']
				}
			}
		},

		cssmin: {
			minify: {
				files: {
					'css/highlight.css': ['_assets/css/highlight.css'],
				}
			}
		},

		run: {
			tool: {
				cmd: './_scripts/cv.sh'
			}
		},

		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			images: {
				src: '_site/**/*.{jpg,jpeg,gif,png}'
			},
		//	styles: {
		//		src: '_site/styles/*.css'
		//	}
		},

		usemin: {
			html: ['_site/*.html', '_site/blog/*.html', '_site/cv/*.html'],
			options: {
			    assetsDirs: ['_site/']
			}
		},
		
		watch: {
		//	sass: {
		//		files: '_assets/scss/**/*.scss',
		//		tasks: ['sass']
		//	},
			css: {
				files: '_assets/css/**/*.css',
				tasks: ['cssmin']
			},
			js: {
				files: ['_assets/scripts/**/*.js'],
				tasks: ['uglify']
			},
			jekyll: {
				files: ['**/*.html', 'stylesheets/**/*.css', 'scripts/**/*.js'],
				tasks: ['jekyll']
			}
		},
			
		browserSync: {
				files: {
				src : ['_site/**/*.html']
			},
			options: {
				watchTask: true,
		//					ghostMode: {
		//						clicks: true,
		//						scroll: true,
		//						links: true,
		//						forms: true
		//					},
				server: {
					baseDir: '_site'
				},
			}
		}
	});
 
	// Load the plugins
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-usemin');

	// Custom tasks
	grunt.registerTask('cv', ['run']);
	grunt.registerTask('build', ['cv', 'cssmin', 'jekyll', 'filerev', 'usemin']);
	grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};

