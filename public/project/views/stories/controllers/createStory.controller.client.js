(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("createStoryController", createStoryController);

    function createStoryController(StoryService, $location, $routeParams, UserService, user) {
        var model = this;

        model.uid = user._id;

        model.publishStory = publishStory;

        function init() {
            UserService
                .findEventsByUser(model.uid)
                .then(function (events) {
                    model.events = events.data;
                });
        }
        init();

        function publishStory(story) {
            if(!story || !story.title) {
                model.errorMessage = "Enter the required details";
                return;
            }
            StoryService
                .createStory(model.uid, story)
                .then(function (response) {
                    $location.url("/profile");
                });
        }
    }
})();