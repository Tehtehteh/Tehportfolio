app = angular.module('folio', ['ngMaterial']);
var SnippetController = function ($scope, $http){
    $scope.snippets = [];
        $http.get('/api/snippets').then(function(result){
            angular.forEach(result.data, function(item){
                $scope.snippets.push(item);
            })
        })
}
var AuthController = function($scope, $mdDialog){
    $scope.showPrompt = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('Please enter your credentials: ')
      .htmlContent(`
                            <md-input-container>
								<label>Email</label>
								<input ng-model="user.email">
							</md-input-container>
      `)
      .targetEvent(ev)
      .ok('Login')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };
}
SnippetController.$inject = ['$scope', '$http'];
app
    .controller('SnippetController', SnippetController)
    .controller('AuthController', AuthController);