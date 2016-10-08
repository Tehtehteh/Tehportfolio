(function() {

var AuthenticationService = function($rootScope, $http, $cookies, $log){

    $rootScope.auth = isAuthenticated()? true : false ;

    function login(username, password){
        return $http.post(
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
        return data.data;
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
        $cookies.put('username', JSON.stringify(account['username']),
                    { expires: new Date(2017, 10, 15) }
                    )
    }

    function unAuthenticate(){
        if (isAuthenticated){
            $log.info('Trying to log out');
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
AuthenticationService.$inject = ['$rootScope', '$http', '$cookies', '$log'];
angular.module('folio')
       .service('AuthenticationService', AuthenticationService);
})();