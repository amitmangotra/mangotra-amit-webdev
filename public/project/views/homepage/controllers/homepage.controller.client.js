(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("homepageController", homepageController);

    function homepageController(HomePageService, $rootScope) {
        var model = this;

        model.searchEvent = searchEvent;

        function init() {
            if($rootScope.queryTerm || $rootScope.zipCode) {
                model.queryTerm = $rootScope.queryTerm;
                model.zipcode = $rootScope.zipCode;
                model.searchEvent(model.queryTerm, model.zipcode);
            }
        }
        init();

        function searchEvent(queryText, zipcode) {
            $rootScope.queryTerm = queryText;
            $rootScope.zipCode = zipcode;
            HomePageService
                .searchEvent(queryText, zipcode)
                .then(renderEvents);

            function renderEvents(response) {
                model.results = response.data;
            }
        }
    }
})();