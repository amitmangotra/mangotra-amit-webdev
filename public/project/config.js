(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/homepage/templates/homepage.view.client.html",
                controller: "homepageController",
                controllerAs: "model"
            })
            .when("/:urlname/events/:eventId", {
                templateUrl: "views/homepage/templates/search-details.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
                // resolve: {
                //     user: checkLogin
                // }
            })
            .when("/login", {
                templateUrl: "views/users/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/templates/signup.view.client.html",
                controller: "signupController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search", {
                templateUrl: "views/users/templates/searchInProfile.view.client.html",
                controller:"searchController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/users/following", {
                templateUrl: "views/users/templates/allUsers.view.client.html",
                controller: "allUsersController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/users/followers", {
                templateUrl: "views/users/templates/followers.view.client.html",
                controller: "followersController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/event/new", {
                templateUrl: "views/events/templates/create-event.view.client.html",
                controller: "createEventController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/event", {
                templateUrl: "views/events/templates/allEventsByUser.view.client.html",
                controller: "allEventsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/events", {
                templateUrl: "views/events/templates/allEvents.view.client.html",
                controller: "totalEventsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/story/new", {
                templateUrl: "views/stories/templates/createStory.view.client.html",
                controller: "createStoryController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/stories", {
                templateUrl: "views/stories/templates/stories.view.client.html",
                controller: "storiesController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search/:urlname/events/:eventId", {
                templateUrl: "views/users/templates/searchResult.view.client.html",
                controller: "searchDetailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/thirdpartyLogin", {
                templateUrl: "views/users/templates/thirdparty.view.client.html",
                controller: "thirdPartyLoginController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/admin", {
                templateUrl: "views/users/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
    }
    function checkLogin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url("/");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();