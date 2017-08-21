(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("storiesController", storiesController);

    function storiesController(StoryService, $route, user) {
        var model = this;

        model.uid = user._id;

        model.removeStory = removeStory;

        function init() {
            StoryService
                .findStoriesByUser(model.uid)
                .then(function (stories) {
                    model.stories = stories.data;
                });
        }
        init();

        function removeStory(story) {
            StoryService
                .removeStory(story._id)
                .then(function (response) {
                    $route.reload();
                });
        }
    }
})();