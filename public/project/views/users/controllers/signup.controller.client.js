(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("signupController", signupController);

    function signupController($location, UserService) {
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
                            UserService.register(user);

                            UserService
                                .findUserByCredentials(user.username, user.password)
                                .then(function (response) {
                                    var _user = response.data;
                                    if(_user === null) {
                                        model.errorMessage = "Invalid username and password";
                                    } else {
                                        $location.url("/profile");
                                    }
                                });
                        } else {
                            model.errorMessage = "Password doesn't match or some field missing";
                        }
                    } else {
                        model.errorMessage = "User already exists";
                    }
                })

        }

        function back() {
            $rootScope.queryTerm = null;
            $rootScope.zipcode = null;
            $location.url('/');
        }
    }
})();