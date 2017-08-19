(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .service("EventService", EventService);

    function EventService($http) {
        var model = this;

        model.findEventsByUser = findEventsByUser;
        model.createEvent = createEvent;
        model.allEvents = allEvents;


        function findEventsByUser(userId) {
            var url = "/api/user/"+userId+"/events";
            return $http.get(url);
        }

        function createEvent(userId, event) {
            var url = '/api/user/'+userId+'/event/new';
            return $http.post(url, event);
        }

        function allEvents() {
            var url = '/api/user/events';
            return $http.get(url);
        }
    }
})();