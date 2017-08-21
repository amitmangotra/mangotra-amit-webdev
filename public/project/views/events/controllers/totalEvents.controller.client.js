(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("totalEventsController", totalEventsController);

    function totalEventsController(EventService, user, $location, UserService) {
        var model = this;

        model.uid = user._id;

        model.rsvpEvent = rsvpEvent;
        model.eventsAlreadyRsvp = eventsAlreadyRsvp;

        function init() {
            EventService
                .allEvents()
                .then(function (events) {
                    model.events = events.data;
                });
        }
        init();


        function rsvpEvent(event) {
            UserService
                .interestedInEvent(event, model.uid)
                .then(function (response) {
                    $location.url("/profile");
                });
        }

        function eventsAlreadyRsvp(eventId) {
            var res = false;
            user.rsvp_events.forEach(function (value) {
                if(value._id === eventId) {
                    res = true;
                }
            });
            return res;
        }

    }
})();