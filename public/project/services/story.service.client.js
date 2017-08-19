(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .service("StoryService", StoryService);

    function StoryService($http) {
        var model = this;

        // model.findEventsByUser = findEventsByUser;
        model.createStory = createStory;
        // model.allEvents = allEvents;


        // function findEventsByUser(userId) {
        //     var url = "/api/user/"+userId+"/events";
        //     return $http.get(url);
        // }

        function createStory(userId, story) {
            var url = '/api/user/'+userId+'/story/new';
            return $http.post(url, story);
        }

        // function allEvents() {
        //     var url = '/api/user/events';
        //     return $http.get(url);
        // }
    }
})();