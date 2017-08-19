(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("totalEventsController", totalEventsController);

    function totalEventsController(EventService) {
        var model = this;

        function init() {
            EventService
                .allEvents()
                .then(function (events) {
                    model.events = events;
                });
        }
        init();

    }
})();