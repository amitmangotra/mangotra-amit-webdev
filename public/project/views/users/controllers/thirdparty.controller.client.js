(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("thirdPartyLoginController", thirdPartyLoginController);

    function thirdPartyLoginController($location, UserService, user) {
        var model = this;

        model.uid = user._id;
        model.roles = user.roles;

        model.updateUser = updateUser;


        function init() {
            UserService
                .findUserById(model.uid)
                .then(function (response) {
                    model.user = response.data;
                    if(model.roles) {
                        $location.url("/profile");
                    }
                });
        }
        init();

        function updateUser(user) {
            if(!user.roles) {
                model.errorMessage = "Enter User Role!!!"
            } else {
                UserService.updateUser(user._id, user)
                    .then(function (response) {
                        model.user = response.data;
                        $location.url("/profile")
                    });
            }
        }

        // function login(user)  {
        //     if(!user.username || !user.password) {
        //         model.errorMessage = "Enter complete login details";
        //         return;
        //     }
        //     UserService
        //         .findUserByCredentials(user.username, user.password)
        //         .then(function (response) {
        //             var _user = response.data;
        //             if(_user === null) {
        //                 model.errorMessage = "Invalid username and password";
        //             } else {
        //                 $location.url("/profile");
        //             }
        //         });
        // }
    }
})();