/**
 * Created by cammy on 8/4/17.
 */
(function () {
    angular
        .module("HappeningsApp")
        .controller("searchController", searchController);

    function searchController(searchService) {
        var model = this;

        model.searchEvent = searchEvent;

        function init() {

        }
        init();

        function searchEvent(queryText) {
            searchService
                .searchEvent(queryText)
                .then(renderEvents);

            function renderEvents(response) {
                model.results = response.data;
            }
        }
    }
})();