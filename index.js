var cool = require('cool-ascii-faces');
var express = require('express');
var mysql = require('mysql');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var result = ''
  var times = process.env.TIMES || 5
  for (i=0; i < times; i++)
  	result += cool();
  response.send(result);
});

app.get('/db', function(request, response){

	var connection = mysql.createConnection(process.env.DATABASE_URL);

	connection.query('SELECT * FROM mark_test', function(err, result){
	  console.log(result);
	  
	  response.render('pages/db', {results: result});
	});
});

app.get('/cool', function(request, response){
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


