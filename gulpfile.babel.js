import gulp         from 'gulp';
import webpack      from 'webpack';
import eslint       from 'eslint/lib/cli';
import run          from 'run-sequence';
import gutil        from 'gulp-util';
import { exec }     from 'child_process';
import del          from 'del';

import gulpConfig   from './build/gulp.config';


const prodBuildTask = 'build';
const startDevTask  = 'start:dev';
const startProdTask = 'start:prod';
const isDevBuild    = process.argv.indexOf(startDevTask) !== -1;
const startTask     = isDevBuild ? startDevTask : prodBuildTask;

const config        = gulpConfig(isDevBuild);


/* Run tasks */

gulp.task('default', [startTask]);

gulp.task(prodBuildTask, done => {
  run(['clean', 'lint'], ['bundle', 'copy'], done);
});

gulp.task(startDevTask, done => {
  run(['clean', 'lint'], ['bundle', 'copy'], ['server'], done);
});

gulp.task(startProdTask, done => {
  run(['clean', 'lint'], ['bundle', 'copy'], ['server'], done);
});



/* Node servers starter */

const startServer = (serverPath, done) => {

  const prodFlag = !isDevBuild ? 'NODE_ENV=production' : '';
  const server = exec(`NODE_PATH=. ${prodFlag} node ${serverPath}`);

  server.stdout.on('data', data => {
    if (done && data === 'Webpack: Done!') {
      done();
    } else {
      gutil.log(data.trim());
    }
  });

  server.stderr.on('data', data => {
    gutil.log(gutil.colors.red(data.trim()));
    gutil.beep();
  });

};



/* Build bundles */

gulp.task('bundle', done => {

  if (isDevBuild) {

    startServer('server.dev.js', done);

  } else {

    webpack(config.webpack).run(done);

  }

});



/* Start express servers */

gulp.task('server', done => {

  const servers = config.server.paths;
  let queue     = servers.length;

  servers.forEach(server => {
    startServer(server);
    if (--queue === 0) done();
  });

});



/* Copy files to `public` */

gulp.task('copy', done => {

  const files = config.copy.files;
  let   queue = files.length;

  files.forEach(file => {
    const from = config.copy.from + file[0];
    const to   = config.copy.to + (file[1] || file[0]);
    exec(`cp -R ${from} ${to}`, err => {
      if (err) {
        gutil.log(gutil.colors.red(err));
        gutil.beep();
      }
      if (--queue === 0) done();
    });
  });

});



/* Lint scripts */

gulp.task('lint', done => {

  eslint.execute('--ext .js,.jsx .');
  done();

});



/* Clean up before build */

gulp.task('clean', done => {

  del(['./public/**/*'], done);

});
