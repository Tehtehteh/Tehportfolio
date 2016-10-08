(function(){
angular
    .module('folio')
    .controller('AuthorizationController', AuthorizationController);

    AuthorizationController.$inject = ['$rootScope','$scope', '$log', 'AuthenticationService'];

    function AuthorizationController($rootScope, $scope, $log, AuthenticationService){
        $scope.login = function(){
            AuthenticationService.login($scope.user.name, $scope.user.password)
            .then(
            function(data, error){
                $scope.error = data;
            }
            )
        }
        $log.info(AuthenticationService.isAuthenticated());
    }
})()