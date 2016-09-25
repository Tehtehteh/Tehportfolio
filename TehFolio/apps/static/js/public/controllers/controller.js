app = angular.module('folio', ['ngMaterial', 'ngCookies']);

var AuthenticationService = function($http, $cookies, $log){

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
        if(!JSON.stringify($cookies.get('username'))){
            return;
        }
        return JSON.parse($cookies.get('username'))
    }

    function isAuthenticated(){
        return (getAuthenticatedAccount()!=undefined);
    }

    function setAuthenticatedAccount(account){
        $log.log('Set auth account to:', account);
        $cookies.put('username', JSON.stringify(account['username']),
                    { expires: new Date(2016, 10, 10) }
                    )
        $log.log('Set account. ', $cookies.get('username'));
    }

    function unAuthenticate(){
        if (isAuthenticated){
            $http.post(
            '/api/logout'
            ).then(loginSuccess, loginError);
            $cookies.delete('username');
        }
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

    $scope.login = login;

    activate();

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
        AuthenticationService.login($scope.username, $scope.password);
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
AuthenticationService.$inject = ['$http', '$cookies', '$log'];
AuthController.$inject = ['$scope', '$http', '$log', '$mdSidenav', 'AuthenticationService'];
SnippetController.$inject = ['$scope', '$http' ];
app
    .controller('SnippetController', SnippetController)
    .controller('AuthController', AuthController);
app
    .service('AuthenticationService', AuthenticationService);
