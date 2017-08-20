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
                    if(_user === null) {
                        if (user.password === user.verify_password && user.password && user.verify_password && user.roles) {
                            UserService
                                .register(user);
                                // .then(
                                //     function (response) {
                                //     $rootScope.currentUser = response.data;
                                //     $location.url("/profile");
                                // });
                            UserService.findUserByUsername(user.username)
                                .then(function (response) {
                                    var user = response.data;
                                    UserService
                                        .findUserByCredentials(user.username, user.password)
                                        .then(function (response) {
                                            var _user = response.data;
                                            $location.url("/profile");
                                        });
                                });
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