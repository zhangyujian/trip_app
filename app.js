
/**
 * Module dependencies.
 */

var express     = require('express')
  , routes = require('./routes')
  , path        = require('path')
  , flash       = require('connect-flash')
  , config      = require('./config').config;

var app = express();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');//设置模板地址
  app.set('view engine', 'jade');//引用jade模板引擎
  app.use(flash());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.session_secret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  }));
  app.use(express.favicon(__dirname + config.favicon));//设置favicon.ico
  app.use(express.bodyParser({keepExtensions: true, uploadDir: __dirname+'/public/data/img'}));//设置上传缓存路径
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/detail', routes.detail);

//config 渲染到模板
app.locals({
  config:config
});

app.listen(config.port, function(){
  console.log("Express server listening on port 3004");
});
