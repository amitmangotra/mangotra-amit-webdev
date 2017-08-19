(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("homepageController", homepageController);

    function homepageController(HomePageService) {
        var model = this;

        model.searchEvent = searchEvent;

        function init() {

        }
        init();

        function searchEvent(queryText, zipcode) {
            HomePageService
                .searchEvent(queryText, zipcode)
                .then(renderEvents);

            function renderEvents(response) {
                model.results = response.data;
            }
        }
    }
})();