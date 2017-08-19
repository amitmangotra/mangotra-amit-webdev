(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("createEventController", createEventController);

    function createEventController(EventService, $location, $routeParams, user) {
        var model = this;

        model.uid = user._id;

        model.publishEvent = publishEvent;

        function init() {
            // EventService
            //     .findEventsByUser(model.uid)
            //     .then(function (events) {
            //         model.events = events;
            //     });
        }
        init();

        function publishEvent(event) {
            if(!event || !event.title) {
                model.errorMessage = "Enter the required details";
                return;
            }
            EventService
                .createEvent(model.uid, event)
                .then(function (response) {
                    $location.url("/profile");
                });
        }
    }
})();