(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("followersController", followersController);

    function followersController(UserService, $routeParams, user) {
        var model = this;

        model.uid = user._id;

        function init() {
            UserService
                .getFollowersList(model.uid)
                .then(function (response) {
                    model.followers = response.data;
                });
        }
        init();

    }
})();