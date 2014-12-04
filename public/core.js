var zakTodo = angular.module('zakTodo', []);

function mainController($scope, $http){
	$scope.todos = [];
	$scope.tabs = ["Home","Work","Other"];
	$scope.activeTab = $scope.tabs[0];
	$scope.formData = "";
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		})
	$scope.changeTab = function(tab){
		$scope.activeTab = tab;	
	}
	$scope.getUrgent = function(){
		return $scope.todos.filter(function(todo){
			return todo.urgent;
		}).length;
	}
	$scope.getRemaining = function(){
		return $scope.todos.filter(function(todo){
			return !todo.done;
		}).length;
	}
	$scope.getFinished = function(){
		return $scope.todos.filter(function(todo){
			return todo.done;
		}).length;
	}
	$scope.createTodo = function(){
		$http.post('/api/todos', {text: $scope.formData, tab: $scope.activeTab, done: false})
			.success(function(data){
				$scope.formData = "";
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	};
	$scope.toggleUrgent = function(todo){
		todo.urgent = !todo.urgent;
		$http.put('/api/todos/' + todo._id, todo)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}
	$scope.checkTodo = function(todo, id){
		todo.done = !todo.done;
		$http.put('/api/todos/' + id, todo)
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