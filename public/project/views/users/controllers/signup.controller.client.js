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
                    if(!_user) {
                        if (user.password === user.verify_password && user.password && user.verify_password) {
                            UserService.createUser(user)
                                .then(function (response) {
                                    _user = response.data;
                                    $location.url("/profile/" + _user._id);
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