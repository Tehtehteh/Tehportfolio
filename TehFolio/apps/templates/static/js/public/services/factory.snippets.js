(function(){
    angular
        .module('folio')
        .factory('snippetsFactory', snippetsFactory);

    snippetsFactory.$inject = ['$http'];

    function snippetsFactory($http){

        var factory = {};

        var snippets = [];

        factory.getSnippets = function(){

            return $http.get('/api/snippets');
        }

        return factory;
    }

})()
