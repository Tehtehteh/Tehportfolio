app = angular.module('folio',[])

app.controller('snippetController', ['$scope', '$http', function ($scope, $http){
    $scope.snippets = [];
    $http.get('/api/snippets').then(function(result){
        angular.forEach(result.data, function(item){
            $scope.snippets.push(item);
        })
    })
}])