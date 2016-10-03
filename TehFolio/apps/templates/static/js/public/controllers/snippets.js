(function(){
angular
    .module('folio')
    .controller('snippetsController', snippetsController);

    snippetsController.$inject = ['$scope', 'snippetsFactory', '$route', '$log'];

    function snippetsController($scope, snippetsFactory, $route, $log){

        $scope.snippets = [];

        init();

        function init(){
            snippetsFactory.getSnippets().then(function(result){
                $scope.snippets = result.data;
            });
        }
    }

}) ()