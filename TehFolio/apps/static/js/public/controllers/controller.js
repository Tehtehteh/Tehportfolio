app = angular.module('folio', ['ngMaterial', 'ngCookies']);

var AuthenticationService = function($http, $cookies){

    function login(username, password){
        $http.post(
            '/api/auth',
            {
                username: username,
                password: password
            }
        ).then(loginSuccess, loginError);
    }
    function loginSuccess(data, status, header, config){
        AuthenticationService.setAuthenticatedAccount(data.data);
    }

    function loginError(data, status, header, config){
        console.error('Incorrect credentials.')
    }

    function getAuthenticatedAccount(){
        if(!$cookies.authenticatedAccount){
            return;
        }
        return JSON.parse($cookies.authenticatedAccount)
    }

    function isAuthenticated(){
        return ($cookies.authenticatedAccount) ? false : true;
    }

    function setAuthenticatedAccount(account){
        $cookies.authenticatedAccount = JSON.stringify(account);
    }

    function unAuthenticate(){
        delete $cookies.authenticatedAccount;
    }

    var AuthenticationService = {
        login: login,
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unAuthenticate: unAuthenticate
    };

    return AuthenticationService;
}

var SnippetController = function ($scope, $http){
    $scope.snippets = [];
    $http.get('/api/snippets').then(function(result){
        angular.forEach(result.data, function(item){
            $scope.snippets.push(item);
        })
    })
}
var AuthController = function($scope, $http, $log, $mdSidenav, AuthenticationService){
    var vm = this;

    vm.login = login;

    activate();

    vm.isAuthenticated = AuthenticationService.isAuthenticated();

    function login(){
        $log.log('Clicked!');
        AuthenticationService.login(vm.username, vm.password);
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
    }
}
AuthenticationService.$inject = ['$http', '$cookies'];
AuthController.$inject = ['$scope', '$http', '$log', '$mdSidenav', 'AuthenticationService'];
SnippetController.$inject = ['$scope', '$http' ];
app
    .controller('SnippetController', SnippetController)
    .controller('AuthController', AuthController);
app
    .service('AuthenticationService', AuthenticationService);
