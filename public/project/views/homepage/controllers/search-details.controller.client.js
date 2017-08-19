(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("detailsController", detailsController);

    function detailsController(HomePageService, $routeParams) {
        var model = this;

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