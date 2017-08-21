(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("searchDetailsController", searchDetailsController);

    function searchDetailsController(EventService, HomePageService, user, $routeParams) {
        var model = this;

        model.uid = user._id;
        model.eventId = $routeParams["eventId"];
        model.urlname = $routeParams["urlname"];

        function init() {
            HomePageService
                .findEventbyId(model.urlname, model.eventId)
                .then(function (response) {
                    model.event = response.data;
                });
        }
        init();

    }
})();