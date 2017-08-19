(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("allEventsController", allEventsController);

    function allEventsController(UserService, $routeParams, user) {
        var model = this;

        model.uid = user._id;

        function init() {
            UserService
                .findUserById(model.uid)
                .then(function (response) {
                    var user = response.data;
                    if(user.roles === "Event Organizer") {
                        model.events = user.events;
                    } else if(user.roles === "End User") {
                        model.events = user.rsvp_events;
                    }
                });
        }
        init();
    }
})();