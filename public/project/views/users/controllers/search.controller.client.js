(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("searchController", searchController);

    function searchController(HomePageService, user, $routeParams) {
        var model = this;

        model.uid = user._id;
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