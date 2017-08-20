(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("followersController", followersController);

    function followersController(UserService, $routeParams, user) {
        var model = this;

        model.uid = user._id;

        model.followerDetails = followerDetails;

        function init() {
            UserService
                .getFollowersList(model.uid)
                .then(function (response) {
                    model.followers = response.data;
                });
        }
        init();

        function followerDetails(userId) {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    model.follower = response.data;
                });
        }

    }
})();