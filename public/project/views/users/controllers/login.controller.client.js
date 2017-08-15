/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("loginController", loginController);

    function loginController($location) {//, UserService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user)  {
            if(!user) {
                model.errorMessage = "Please enter login details";
                return;
            }
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === null) {
                        model.errorMessage = "Invalid username and password";
                    } else {
                        $location.url("profile/"+_user._id);
                    }
                });
        }
    }
})();