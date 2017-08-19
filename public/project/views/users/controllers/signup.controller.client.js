(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("signupController", signupController);

    function signupController($location, UserService, $rootScope) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(!_user) {
                        if (user.password === user.verify_password && user.password && user.verify_password && user.roles) {
                            UserService.createUser(user)
                                .then(function (response) {
                                    _user = response.data;
                                    $rootScope.currentUser = _user;
                                    $location.url("/profile");
                                })

                        } else {
                            model.errorMessage = "Password doesn't match or some field missing";
                        }
                    } else {
                        model.errorMessage = "User already exists";
                    }
                })

        }
    }
})();