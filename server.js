

// Set Up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// Configuration
mongoose.connect('mongodb://localhost/todo');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// Model
var Todo = mongoose.model('Todo', {
	text : String,
	done : Boolean
});

// Routes
app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if(err) res.send(err);
		res.json(todos);
	});
});

app.post('/api/todos', function(req, res){
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err) res.send(err)
		Todo.find(function(err, todos){
			if(err) res.send(err);
			res.json(todos);
		});
	});
});

app.put('/api/todos/:todo_id/toggle', function(req, res){
	Todo.findById(req.params.todo_id, function(err, todo){
		if(err) res.send(err)
		todo.done = !todo.done;
		todo.save(function(err){
			if(err) console.log('Error Toggling Post');
		})
	})
});

app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo){
		if(err) res.send(err);
		Todo.find(function(err, todos){
			if(err) res.send(err);
			res.json(todos);
		});
	});
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
})

app.listen(8080);
console.log("App listening on port 8080");

