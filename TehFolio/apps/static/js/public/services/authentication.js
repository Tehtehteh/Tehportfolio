var AuthenticationService = function($scope, $http, $cookies){

    var Authentication = {
        login: login,
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unAuthenticate: unAuthenticate
    }

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
        Authentication.setAuthenticatedAccount(data.data);
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
        return !!$cookies.authenticatedAccount;
    }

    function setAuthenticatedAccount(account){
        $cookies.authenticatedAccount = JSON.stringify(account);
    }

    function unAuthenticate(){
        delete $cookies.authenticatedAccount;
    }
}