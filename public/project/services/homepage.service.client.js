(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .service("HomePageService", HomePageService);

    function HomePageService($http) {
        var model = this;

        model.searchEvent = searchEvent;
        model.findEventbyId = findEventbyId;

        function searchEvent(text, zipcode) {
            var url = "/find/events?text="+text+'&zip='+zipcode;
            return $http.get(url);
        }

        function findEventbyId(urlname, eventId) {
            var url = "/"+urlname+"/events/"+eventId;
            return $http.get(url);
        }
    }
})();