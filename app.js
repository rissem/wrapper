console.log("running wrapper server on port 3000");

// 3rd party
var express = require('express');
var hbs = require('hbs');

var app = express();

app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context());
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

app.get('/', function(req, res){
    res.render('index');
});

app.listen(3000);
