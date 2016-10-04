(function(){
angular
    .module('folio')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider']

    function routeConfig($routeProvider){
        $routeProvider
            .when('/',
            {
                templateUrl: 'http://localhost:8000/static/js/public/views/homepage.html'
            })
            .when('/contact',
            {
                templateUrl: 'http://localhost:8000/static/js/public/views/contact.html'
            })
            .when('/snippets',
                {
                    controller: 'snippetsController',
                    templateUrl: 'http://localhost:8000/static/js/public/views/snippets.html'
                }
            )
            .when('/login',
                {
                    controller: 'AuthorizationController',
                    templateUrl: 'http://localhost:8000/static/js/public/views/login.html'
                }
            )
            .otherwise({
                redirectTo: '/'
            })
    }

})();