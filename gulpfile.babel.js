const gulp = require('gulp');
const argv = require('yargs').argv;
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const yarn = require('gulp-yarn');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const git = require('gulp-git');
import fs from 'fs';

gulp.task('archive', ['webpack', 'install-server-npm-dependencies'], function () {
  return gulp.src(['scminfo.txt', 'public/**', 'server/**', 'server/.babelrc'], {base: '.'})
    .pipe(zip('pfcom-frontend.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('archive-without-yarn', ['webpack', 'scm-info'], function () {
  return gulp.src(['scminfo.txt', 'public/**', 'server/**', 'server/.babelrc'], {base: '.'})
    .pipe(zip('greatron-frontend.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('install-root-npm-dependencies', ['clean'], function () {
  gulp.src(['./package.json', './yarn.lock']).pipe(yarn());
});

gulp.task('install-server-npm-dependencies', ['install-root-npm-dependencies'], function () {
  gulp.src(['./server/package.json', './server/yarn.lock']).pipe(yarn());
});

gulp.task('webpack', ['scm-info'], shell.task('webpack'));

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**', '!server/node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('environment', function () {
  var env = argv.profile || 'production';
  gutil.log(argv);
  gutil.log('Set process.env.NODE_ENV = ' + env);
  return process.env.NODE_ENV = env;
});

gulp.task('clean', ['environment'], function () {
  gulp.src(['dist', 'public']).pipe(clean());
});

gulp.task('make-dll', shell.task('webpack --config webpack.config.dll.babel.js'));

gulp.task('default', ['archive']);

gulp.task('scm-info', ['install-server-npm-dependencies'], function () {
  git.exec({args: 'log -n 1'}, function(err, stdout) {
    fs.writeFile('./scminfo.txt', stdout);
  });
});
