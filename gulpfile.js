const config = require('./dev_config');
//加载任务
var gulp = require('gulp');
var babel = require("gulp-babel");
var plugins = require('gulp-load-plugins')();//自动加载插件，调用时用驼峰命名
var order = require('gulp-order'); //排序
var plumber = require('gulp-plumber');//忽略错误
var include = require('gulp-html-tag-include'); //incdule功能
var htmlbeautify = require('gulp-html-beautify'); //html格式化
var svgSymbols = require('gulp-svg-symbols');//合并svg图标
var zip = require('gulp-zip');
var html2js = require('gulp-tmpl2js');

var fs = require('fs');
var rollup = require('rollup').rollup;
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

//rollup编译vue
const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const uglify = require('uglify-js');
const CleanCSS = require('clean-css');
const stylus = require('stylus');

//API服务器
var path = require('path');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var server = path.resolve(__dirname, 'API');


var gutil = require('gulp-util');
//=====================================================
//构建输出的文件夹
var Url = {
    App: {//开发目录
        Root: 'app',     //开发目录
        Sass: 'app/sass',//开发中的sass所在的目录
        Js: 'app/js',    //开发目录中的js目录
        Css: 'app/style', //开发目录中的css目录
        Html: 'app/html' //开发目录中的html文件，include文件目录
    },
    View: {//视图目录，用于浏览测试
        Root: 'app',
        Js: 'app/scripts',
        Css: 'app/css'
    },
    Demo: {//最后输出的目录
        Root: 'demo',
        Js: 'demo/scripts',
        Css: 'demo/css'
    }
};
//设置依赖的框架处理完成后的名称及目录
var JsFrame = {
    InFile: [//构建处理的js文件
        Url.App.Js + '/jquery/*.js',
        //排除项
        '!' + Url.App.Js + '/jquery/*.min.js'
    ],
    OutFile: {//构建输出的文件名
        Concat: 'jquery.concat.js',//框架合并后的文件
        Min: 'jquery.min.js'//框架合并压缩后的文件
    }
};
//设置自定义JS处理完成后的名称及目录
var JsPlugins = {
    InFile: [//自定义JS
        Url.App.Js + '/' + '*.js',
        //排除项
        '!' + Url.App.Js + '/' + '*.*.js',
        '!' + Url.App.Js + '/' + 'jquery*.js',
        '!' + Url.App.Js + '/' + 'all*.js'
    ],
    OutFile: {//构建输出的文件名
        Concat: 'lib.concat.js',  //自定义JS合并后的文件
        Min: 'lib.min.js', //自定义JS合并、压缩后的文件
        All: 'all.concat.js',//自定义JS+JS框架合并后的文件
        AllMin: 'all.min.js'//自定义JS+JS框架、压缩合并后的文件
    }
};

//设置SASS文件预处理后的名称及目录
var SassFile = {
    InFile: [//sass文件
        Url.App.Sass + '/' + '*.scss',
        Url.App.Root + '/' + 'tag/comm/*.scss',
        Url.App.Root + '/' + 'tag/comm-tag/*.scss',
        Url.App.Root + '/' + 'tag/comm-module/*.scss',
        //Url.App.Root + '/' + 'html/**/*.scss',
        //排除项
        '!' + Url.App.Sass + '/' + '_*.scss',
        '!' + Url.App.Sass + '/' + 'scss.scss',
        '!' + Url.App.Sass + '/' + 'css.scss',
        '!' + Url.App.Sass + '/' + 'all.scss'
    ],
    OutFile: {//构建输出的文件名
        Concat: 'mycss.concat.css', //sass编译合并后输出的文件
        Min: 'mycss.min.css'//sass编译合并、压缩后输出的文件
    },
    Order: {
        FromFile: Url.App.Sass + '/' + 'all.scss',//编译带import的sass文件，可sass合并时的排序问题。
        OutFile: 'all.css',
        OutMinFile: 'all.min.css'
    }
};

//浏览器打开
let url = {
    host: '127.0.0.1',
    port: config.webServerPort,
    app: 'firefox'
};
//----------------------------------------------------
//help任务
//----------------------------------------------------
gulp.task('?', function () {
    console.log('gulp ?                         任务说明');
    console.log('gulp concat-jquery             合并jquery库');
    console.log('gulp min-jquery                压缩、合并jquery库');
    console.log('gulp concat-js                 检查、合并js');
    console.log('gulp min-js                    检查、合并、压缩js');
    console.log('gulp js                        检查、合并、压缩所有js');
    console.log('gulp sass                      编译、合并、压缩sass，先编译，会多个css');
    console.log('gulp css                       all.scss的引用顺序编译，生成一个文件');
    console.log('gulp min-html                  HTML文件压缩，这里用作COPY');
    console.log('gulp watch-sass                监控sass，哪个文件改变就编译那个');

    console.log('+-------------------------------------------------------------------+');
    console.log('+                                                                   +');
    console.log('+                                                                   +');
    console.log('+                初始化       :  gulp init或gulp                      +');
    console.log('+                合成SVG      :  gulp svg                            +');
    console.log('+                监控         :  gulp watch                          +');
    console.log('+                备份打包      :  gulp zip                            +');
    console.log('+                发布到开发目录 :  gulp pub                            +');
    console.log('+                生成demo     :  gulp up                             +');
    console.log('+                                                                   +');
    console.log('+                                                                   +');
    console.log('+-------------------------------------------------------------------+');
    console.log('+                                                                   +');
    console.log('+                 预览地址：http://' + url.host + ':' + url.port + '                       +');
    console.log('+                                                                   +');
    console.log('+-------------------------------------------------------------------+');

});


//默认任务
gulp.task('default', function () {
    return gulp.run('init');
});


//初始化
gulp.task('init', ['sass-init', 'concat-css-init', "includefile-init", "connect"], function () {
    return gulp.run('watch');//执行'watch'监听任务
});

//监控html和sass变化
gulp.task('watch', [
    'watch-sass',
    'watch-es6',
    'watch-vue',
    'watch-html',
    '?'
]);
//监控html和sass变化
gulp.task('go', [
    'connect',
    'watch'
]);
//------------------------------------------------------
//以下为任务列表
//------------------------------------------------------
//
// browser-sync 配置，配置里启动 nodemon 任务
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        //proxy: "http://localhost:57", // 这里的端口和 webpack 的端口一致
        port: 57
    });
});

// browser-sync 监听文件
gulp.task('api', ['browser-sync'], function () {
    gulp.watch(['./API/db.js', './API/**'], ['bs-delay']);
});

// 延时刷新
gulp.task('bs-delay', function () {
    setTimeout(function () {
        browserSync.reload();
    }, 1000);
});

// 服务器重启
gulp.task('nodemon', function (cb) {
    // 设个变量来防止重复重启
    var started = false;
    var stream = nodemon({
        script: './API/server.js',
        // 监听文件的后缀
        ext: "js",
        env: {
            'NODE_ENV': 'development'
        },
        // 监听的路径
        watch: [
            server
        ]
    });
    stream.on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('crash', function () {
        console.error('application has crashed!\n')
        stream.emit('restart', 10)
    })
});


//使用connect启动一个Web服务器
gulp.task('connect', function () {
    return plugins.connect.server({
        port: url.port,
        host: url.host,
        root: 'app',
        "startPath": "/view/",
        livereload: true
    })
});

//重启connect服务器
gulp.task('re-server', function () {
    plugins.connect.reload();//自动刷新
});

//+-----------------------------------+
//以下编译和监控sass
//+-----------------------------------+
//初始化sass-编译处理
gulp.task('sass-init', function () {
    return gulp.src(SassFile.InFile) // 匹配文件夹
        .pipe(plumber())//忽略错误
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plumber())//忽略错误
        .pipe(plugins.autoprefixer({//指定生成不同版本的css前缀
            //cascade: true,//是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            browsers: ['last 3 versions', 'Android >= 4.0', 'Firefox >= 20', 'last 3 Explorer versions', 'opera 15'],
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(Url.App.Css))  // 输出
        .pipe(plugins.concat(SassFile.OutFile.Concat))//合并后的文件名
        .pipe(gulp.dest(Url.View.Css))  // 输出
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(SassFile.OutFile.Min))
        .pipe(gulp.dest(Url.View.Css)) // 输出
        .pipe(plugins.base64({
                options: {
                    baseDir: Url.View.Css,
                    extensions: ['png?v64'],
                    maxImageSize: 10 * 1024, // bytes
                    debug: true
                }
            }
        ))
        .pipe(plugins.rename("base64-" + SassFile.OutFile.Min))
        .pipe(gulp.dest(Url.View.Css));  // 输出
});


//压缩html，压缩功暂时关闭，可做文件复制功能
gulp.task('min-html', function () {
    gulp.src(Url.App.Root + '*.html') // 要压缩的html文件
    //.pipe(plugins.minifyHtml()) //压缩
        .pipe(gulp.dest(Url.Demo.Root + '/'));
});


//css样式表md5
gulp.task('rev-css', function () {
    gulp.src([Url.View.Root + '/rev/*/*.json', Url.App.Root + '/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(plugins.revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest(Url.Demo.Root));                     //- 替换后的文件输出的目录
});

// 处理include文件
gulp.task('includefile-init', function () {
    var options = {
        indentSize: 2
    };
    gulp.src(Url.App.Html + '/*.html')
        .pipe(plumber())//忽略错误
        .pipe(include())
        .pipe(plumber())//忽略错误
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest(Url.App.Root))
    ;
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  监视任务
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//监测html文件
gulp.task('watch-html', ['watch-inc']);
gulp.task('watch-inc', function () {
    return gulp.watch([
        Url.App.Html + '/*.html',
        Url.App.Html + '/**/*.html',
        Url.App.Html + '/**/**/*.html',
        '!' + Url.App.Html + '/comm/*.html',
        '!' + Url.App.Html + '/modules/*.html'
    ], function () {
        var options = {
            indentSize: 2
        };
        gulp.src([
            Url.App.Html + '/*.html',
            Url.App.Html + '/**/*.html',
            '!' + Url.App.Html + '/comm/*.html',
            '!' + Url.App.Html + '/modules/*.html'
        ])
            .pipe(plumber())//忽略错误
            .pipe(include())
            .pipe(plumber())//忽略错误
            .pipe(htmlbeautify(options))//整理格式
            .pipe(gulp.dest(Url.App.Root + '/view'))
    });
});

//监控es6文件，
gulp.task('watch-es6', function () {
    return gulp.watch([
        Url.App.Root + '/**/' + '*.es6.js',
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);
        str2 = event.path.substring(0, event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);
        return rollup({
            entry: Url.App.Root + '/vue/' + str2 + '/' + str,
            plugins: [
                nodeResolve({jsnext: true}),
                commonjs()
            ]
        }).then(function (bundle) {
            let result = bundle.generate({
                format: 'umd'
            });
            bundle.write({
                format: 'umd',
                dest: Url.App.Root + '/vue/' + str2 + '/' + str.replace('.es6', '')
            });
        });
    });
});

//编译vue
gulp.task('watch-vue', function () {
    return gulp.watch([
        Url.App.Root + '/**/' + '*.vue',
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);//文件名
        str2 = event.path.substring(0, event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);//所在目录
        return rollup({
            entry: Url.App.Root + '/vue/' + str2 + '/' + str,
            plugins: [
                vue({
                    compileTemplate: true,
                    css (styles, stylesNodes) {
                        write('./app/vue/'+str2+'/css/'+str.replace('.vue','')+'.styl', styles);
                        stylus.render(styles, function (err, css) {
                            if (err) throw err;
                            write('./app/vue/'+str2+'/css/'+str.replace('.vue','')+'.css', css);
                            write('./app/vue/'+str2+'/css/'+str.replace('.vue','')+'.min.css', new CleanCSS().styles)
                        })
                    }
                }),
                buble(),
            ],
        })
            //处理js文件
            .then(function (bundle) {
                let code = bundle.generate({
                    format: 'umd',
                    moduleName: 'helloRollupVue',
                    useStrict: false
                }).code;
                return write('./app/vue/'+str2+'/temp/'+str.replace('.vue','')+'.js', code).then(function () {
                    return code
                })
            }) .catch(logError)
            //压缩js文件
            .then(function (code) {
                let minified = uglify.minify(code, {
                    fromString: true,
                    output: {
                        ascii_only: true
                    }
                }).code;
                return write('./app/vue/'+str2+'/'+str.replace('.vue','')+'.js', minified)
            })
            //刷新入口
            .then(function () {
                return rollup({
                    entry: Url.App.Root + '/vue/' + str2 + '/' + 'main.es6.js',
                    plugins: [
                        nodeResolve({jsnext: true}),
                        commonjs()
                    ]
                }).then(function (bundle) {
                    let result = bundle.generate({format: 'cjs'});
                    bundle.write({
                        format: 'cjs',
                        dest: Url.App.Root + '/vue/' + str2 + '/' + 'main.js'
                    });
                });
            })
    });
});
function write (dest, code) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            //console.log(blue(dest) + ' ' + getSize(code))
            resolve()
        })
    })
}
function logError (e) {
    console.log(e)
}

//sass处理-sasssasssasssasssasssasssasssasssasssasssasssasssasssasssasssasssass
//清理MD5生成的css
//监控sass变化
gulp.task('watch-sass', ['watch-chang-sass', 'watch-tag-sass', 'watch-concat-css']);
gulp.task('clean-css', function () {
    return gulp.src(Url.View.Css + '/mycss-*.min.css', {read: false})
        .pipe(plugins.clean());
});

//只编译修改的sass文件
gulp.task('watch-chang-sass', function () {
    return gulp.watch(SassFile.InFile, function (event) {
        var str = event.path;
        str = str.substring(str.lastIndexOf('\\') + 1);
        gulp.src([Url.App.Sass + '/' + str, Url.App.Root + '/tag/**/' + str, Url.App.Root + '/html/**/' + str]) // 匹配文件
            .pipe(plumber())//忽略错误
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer({//指定生成不同版本的css前缀
                browsers: ['last 3 versions', 'Android >= 4.0', 'last 3 Explorer versions', 'opera 15'],
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest(Url.App.Css)); // 输出
    });
});


//只编译修改的sass文件---tag目录下的 tag
gulp.task('watch-tag-sass', function () {
    return gulp.watch([
        './app/vue/**/*.scss',
        '!./app/vue/comm/*.scss',
        './app/tag/**/*.scss',
        '!./app/tag/comm/*.scss',
        '!./app/tag/comm-tag/*.scss',
        '!./app/tag/comm-module/*.scss'], function (event) {
        var str = event.path;
        str = str.substring(str.lastIndexOf('\\') + 1);
        gulp.src([
            Url.App.Root + '/*/**/' + str,
            Url.App.Root + '/*/**/' + str,
            '!./app/sass/*.scss',
            '!./app/tag/comm/*.scss',
            '!./app/tag/comm-tag/*.scss',
            '!./app/tag/comm-module/*.scss'
        ]) // 匹配文件
            .pipe(plumber())//忽略错误
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer({//指定生成不同版本的css前缀
                browsers: ['last 3 versions', 'Android >= 4.0', 'last 3 Explorer versions', 'opera 15'],
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest('./app/')); // 输出
    });
});

// 监控单个sass文件编译后的css文件
gulp.task('watch-concat-css', function () {
    return gulp.watch([
        Url.App.Css + '/' + '*.css',
        Url.App.Css + '/**/' + '*.css',
        '!' + Url.App.Css + '/' + '*.*.css',
        '!' + Url.App.Css + '/' + 'all.css',
        '!' + Url.App.Css + '/' + 'scss.css',
        '!' + Url.App.Css + '/' + 'css.css'], ['concat-css']);
});
//监视sass变化后，立即解析变化的sass文件，之后再合并、压缩
gulp.task('concat-css', ['clean-css'], function () {
    return gulp.src([
        Url.App.Css + '/' + '*.css',
        Url.App.Css + '/**/' + '*.css',
        '!' + Url.App.Css + '/' + '*.*.css',
        '!' + Url.App.Css + '/' + 'all.css',
        '!' + Url.App.Css + '/' + 'scss.css',
        '!' + Url.App.Css + '/' + 'css.css'])
        .pipe(plugins.concat(SassFile.OutFile.Concat))//合并后的文件名
        .pipe(gulp.dest(Url.View.Css))  // 输出
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(SassFile.OutFile.Min))
        .pipe(gulp.dest(Url.View.Css))
        .pipe(gulp.dest('../public/new_site/css'))
        .pipe(plugins.rev())
        .pipe(gulp.dest(Url.View.Css))                               //- 输出文件本地
        .pipe(plugins.rev.manifest())                               //- 生成一个rev-manifest.json
        .pipe(gulp.dest(Url.View.Root + '/rev/css')) //- 将 rev-manifest.json 保存到 rev 目录内
        .pipe(plugins.connect.reload());
});
// 初始化时的合并，不带刷新功能
gulp.task('concat-css-init', ['clean-css'], function () {
    return gulp.src([
        Url.App.Css + '/' + '*.css',
        '!' + Url.App.Css + '/' + '*.*.css',
        '!' + Url.App.Css + '/' + 'all.css',
        '!' + Url.App.Css + '/' + 'scss.css',
        '!' + Url.App.Css + '/' + 'css.css'])
        .pipe(plugins.concat(SassFile.OutFile.Concat))//合并后的文件名
        .pipe(gulp.dest(Url.View.Css))  // 输出
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(SassFile.OutFile.Min))
        .pipe(gulp.dest(Url.View.Css))
        .pipe(plugins.rev())
        .pipe(gulp.dest(Url.View.Css))                               //- 输出文件本地
        .pipe(plugins.rev.manifest())                               //- 生成一个rev-manifest.json
        .pipe(gulp.dest(Url.View.Root + '/rev/css')) //- 将 rev-manifest.json 保存到 rev 目录内
        ;
});
//sass处理-end--sasssasssasssasssasssasssasssasssasssasssasssasssasssasssasssasssass


// 扩展功能
//合并svg图标
gulp.task('svg', function () {
    return gulp.src(Url.App.Root + '/svg/svg-icon/*.svg')
        .pipe(svgSymbols())
        .pipe(gulp.dest(Url.App.Root + '/svg'));
});
//项目打包--压缩成zip文件
gulp.task('zip', function () {
    return gulp.src(['./app/**', './gulpfile.js', './package.json', './.gitignore'])
        .pipe(zip('app-bak.zip'))
        .pipe(gulp.dest('backup'));
});


//合并统一css
gulp.task('newtoolcss', function () {
    return gulp.src([
        './app/css/tool/*.css',
        '!./app/css/tool/*.c.css',
        '!./app/css/tool/*.m.css'
    ])
        .pipe(plugins.concat('tool.c.css'))//合并后的文件名
        .pipe(gulp.dest('./app/css/tool'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename('tool.m.css'))
        .pipe(gulp.dest('./app/css/tool'))
});

//vlib
gulp.task('vlib', function () {
    return gulp.src([
        './app/scripts/vlib/*.js',
        '!./app/scripts/vlib/*.c.js',
        '!./app/scripts/vlib/*.m.js'
    ])
        .pipe(plugins.concat('vlib.c.js', {newLine: '\n//注释：文件分割\n'}))
        .pipe(gulp.dest('./app/scripts/vlib'))
        .pipe(plugins.uglify())//压缩JS
        .pipe(plugins.rename('vlib.m.js'))
        .pipe(gulp.dest('./app/scripts/vlib'))
});

