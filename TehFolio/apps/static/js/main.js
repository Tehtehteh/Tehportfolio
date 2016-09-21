app = angular.module('folio',[])

var SnippetController = function ($scope, $http){
    $scope.snippets = [];
        $http.get('/api/snippets').then(function(result){
            angular.forEach(result.data, function(item){
                $scope.snippets.push(item);
            })
        })
}
SnippetController.$inject = ['$scope', '$http'];
app
    .controller('snippetController', SnippetController);