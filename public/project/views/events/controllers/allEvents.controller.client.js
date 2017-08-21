(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("allEventsController", allEventsController);

    function allEventsController(UserService, EventService, user, $route) {
        var model = this;

        model.uid = user._id;
        model.removeEvent = removeEvent;

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

        function removeEvent(event) {
            EventService
                .removeEvent(model.uid, event._id)
                .then(function (response) {
                    $route.reload();
                });
        }

    }
})();