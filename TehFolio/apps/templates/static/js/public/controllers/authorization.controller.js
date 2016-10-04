(function(){
angular
    .module('folio')
    .controller('AuthorizationController', AuthorizationController);

    AuthorizationController.$inject = ['$log', 'AuthenticationService'];

    function AuthorizationController($log, AuthenticationService){
        //$scope.info = 'Qeq';
    }
})()