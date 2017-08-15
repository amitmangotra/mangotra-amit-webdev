(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("profileController", profileController);

    function profileController($location) {
        var model = this;

        model.uid = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            UserService.findUserById(model.uid)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        function unregister(user) {
            UserService
                .deleteUser(user._id)
                .then(function (response) {
                    $location.url("login/");
                })

        }
    }
})();