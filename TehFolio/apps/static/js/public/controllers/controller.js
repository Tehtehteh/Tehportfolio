(function(){


var SnippetController = function ($scope, $http){
    $scope.snippets = [];
    $http.get('/api/snippets').then(function(result){
        angular.forEach(result.data, function(item){
            $scope.snippets.push(item);
        })
    })
};


var AuthController = function($scope, $http, $log, $mdSidenav, AuthenticationService){

    $scope.login = login;

    activate();

    $scope.test = function(){
        $log.log(this.x);
        $log.log(AuthenticationService.isAuthenticated());
    }


    $scope.logout = logout;

    function logout(){
        AuthenticationService.unAuthenticate();
        $log.log('logout successful.');
        AuthenticationService.getAuthenticatedAccount();
    }

    $scope.username = AuthenticationService.getAuthenticatedAccount();

    $scope.isAuthenticated = AuthenticationService.isAuthenticated();

    function login(){
        $log.log('Clicked!');
        AuthenticationService.login($scope.username, $scope.password).then(function(){
            $scope.isAuthenticated = AuthenticationService.isAuthenticated();
        });
    }

    function activate(){
        if (AuthenticationService.isAuthenticated()) {
            $log.log('Cool stuff!');
        }
        else{
            $log.log('Authentication is: ', AuthenticationService.isAuthenticated());
        }
    }

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    $scope.toggleRight = toggler('right');
    function toggler(navId){
        return function(){
            $mdSidenav(navId).toggle();
        }
    }
    $scope.close = function(){
        $mdSidenav('right').close();
    };
    var x = 10;
    angular.extend(this,
        {someVar: x})
};

AuthController.$inject = ['$scope', '$http', '$log', '$mdSidenav', 'AuthenticationService'];
SnippetController.$inject = ['$scope', '$http' ];

angular.module('folio')
       .controller('SnippetController', SnippetController)
       .controller('AuthController', AuthController);
})()