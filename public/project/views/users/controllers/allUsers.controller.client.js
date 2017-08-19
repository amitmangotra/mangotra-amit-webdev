(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("allUsersController", allUsersController);

    function allUsersController(UserService, $routeParams, user, $route) {
        var model = this;

        model.uid = user._id;

        model.follow = follow;
        model.unfollow = unfollow;
        model.followingAlready = followingAlready;

        function init() {
            UserService
                .getAllUsers()
                .then(function (response) {
                    model.users = response.data;
                });
        }
        init();

        function followingAlready(user) {
            var res = false;
            user.followers.forEach(function (value) {
                if(value === model.uid) {
                    res = true;
                }
            });
            return res;
        }

        function follow(organizer) {
            UserService
                .followOrganizer(organizer, model.uid)
                .then(function (response) {
                    $route.reload();
                });
        }

        function unfollow(organizer) {
            UserService
                .unfollowOrganizer(organizer, model.uid)
                .then(function (response) {
                    $route.reload();
                });
        }

    }
})();