var zakTodo = angular.module('zakTodo', []);

function mainController($scope, $http){
	$scope.formData = {done:false};
	$scope.todos = [];
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		})
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {done:false};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	};
	$scope.checkTodo = function(todo, id){
		console.log(todo);
		console.log(id);
		todo.done = !todo.done;
		$http.put('/api/todos/' + id + '/toggle')
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}
	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}
}