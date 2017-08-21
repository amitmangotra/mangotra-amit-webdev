(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .service("StoryService", StoryService);

    function StoryService($http) {
        var model = this;

        // model.findEventsByUser = findEventsByUser;
        model.createStory = createStory;
        model.findStoriesByUser = findStoriesByUser;
        model.removeStory = removeStory;
        // model.allEvents = allEvents;


        // function findEventsByUser(userId) {
        //     var url = "/api/user/"+userId+"/events";
        //     return $http.get(url);
        // }

        function createStory(userId, story) {
            var url = '/api/project/user/'+userId+'/story/new';
            return $http.post(url, story);
        }

        function findStoriesByUser(userId) {
            var url = '/api/project/user/'+userId+'/story';
            return $http.get(url);
        }

        function removeStory(storyId) {
            var url = '/api/project/story/'+storyId;
            return $http.delete(url);
        }
        //
        // function deleteUser(userId) {
        //     var url = "/api/project/user/" + userId;
        //     return $http.delete(url);
        // }

        // function allEvents() {
        //     var url = '/api/user/events';
        //     return $http.get(url);
        // }
    }
})();