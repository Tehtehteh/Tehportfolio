(function() {

var AuthenticationService = function($http, $cookies, $log){

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
AuthenticationService.$inject = ['$http', '$cookies', '$log'];
angular.module('folio')
       .service('AuthenticationService', AuthenticationService);
})();