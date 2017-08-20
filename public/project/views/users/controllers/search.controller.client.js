(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("searchController", searchController);

    function searchController(HomePageService, $routeParams) {
        var model = this;

        model.search = search;

        function init() {

        }
        init();

        function search(term) {
            HomePageService
                .searchEvent(term)
                .then(renderEvents);

            function renderEvents(response) {
                model.searchresults = response.data;
            }
        }
    }
})();