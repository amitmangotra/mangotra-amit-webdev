(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
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
                templateUrl: "view/users/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
    }
})();