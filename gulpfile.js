const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./*.html").on("change", reload);
  gulp.watch("./style.css", gulp.series("prefix"));
});

gulp.task("prefix", () => {
  return gulp
    .src("./style.css")
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./build/style.css"))
    .pipe(browserSync.stream());
});

gulp.task("default", () => {
  gulp.watch("./style.css", gulp.series("prefix"));
});

gulp.task("build", gulp.parallel("prefix"));
