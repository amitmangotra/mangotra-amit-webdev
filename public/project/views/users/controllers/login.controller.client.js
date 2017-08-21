/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("loginController", loginController);

    function loginController($location, UserService, $rootScope) {
        var model = this;

        model.login = login;
        model.back = back;

        function init() {

        }
        init();

        function login(user)  {
            if(!user.username || !user.password) {
                model.errorMessage = "Enter complete login details";
                return;
            }
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === null) {
                        model.errorMessage = "Invalid username and password";
                    } else if(_user.roles === 'Admin') {
                        $location.url("/admin");
                    } else {
                        $location.url("/profile");
                    }
                });
        }

        function back() {
            $rootScope.queryTerm = null;
            $rootScope.zipcode = null;
            $location.url('/');
        }
    }
})();