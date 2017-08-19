(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, UserService, user) {
        console.log(user);
        var model = this;

        model.uid = user._id;

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            UserService
                .findUserById(model.uid)
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
                    $location.url("/");
                })

        }
    }
})();