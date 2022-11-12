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
  gulp.watch("./css/style.css", gulp.series("prefix"));
});

gulp.task("prefix", () => {
  return gulp
    .src("./css/style.css")
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./css/build/"))
    .pipe(browserSync.stream());
});

gulp.task("default", () => {
  gulp.watch("./css/style.css", gulp.series("browser-sync", "prefix"));
});
