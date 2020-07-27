var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){

 var arr = []
 var obj = {}

 if (Object.keys(req.query).length === 0) {
 return res.render('norequest')

 }
 //Portion references to the lecture,
 //the req.query object is being looped and
 //all the keys and values are being added onto an array as a series of objects
 for (var i in req.query) {
   arr.unshift({'name': i, 'value': req.query[i] })
 }
 //The datalist property is being added into the object and the arr is the key of datalist
  obj.datalist = arr
 //The get handlebar page is being displayed and the obj datalist properties are populating the
 //references in the handlebars page
  res.render('get', obj)

});

app.post('/',function(req,res){

  var arr = []
  var arr2 = []
  var obj = {}
 //Portion references to the lecture,
 //the req.query object is being looped and
 //all the keys and values are being added onto an array as a series of objects
  for (var i in req.query) {
    arr.push({'name': i, 'value': req.query[i] })
  }

  //Here the req.body object is being accessed which is the contents of the post request
  //The keys and values are being added to an array as a series of objects with keys and values
  for (var x in req.body) {
    arr2.push({'property': x, 'key': req.body[x] })
  }

  //The obj adds two properties with the array of queries as the datalist property
  //and the array of body content as the jsonlist property
  obj.datalist = arr
  obj.jsonlist = arr2

  res.render('post', obj)
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});