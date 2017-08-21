(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .controller("adminController", adminController);

    function adminController(UserService, user, $route, $location) {
        var model = this;

        model.uid = user._id;
        model.roles = user.roles;

        model.editUser = editUser;
        model.changeUser = changeUser;
        model.removeUser = removeUser;
        model.logout = logout;



        function init() {
            UserService
                .findAllUsers(model.roles)
                .then(function (response) {
                    model.users = response.data;
                });
        }
        init();

        function editUser(user) {
            model.newUser = user;
        }

        function changeUser(user) {
            if(!user._id) {
                if(user.roles === 'End User' || user.roles === 'Event Organizer' || user.roles === 'Admin') {
                    user.password = user.username;
                    UserService
                        .register(user);
                } else {
                    model.errorMessage = "User Role is incorrect";
                    return;
                }
            } else {
                UserService
                    .updateUser(user._id, user);
            }
            $route.reload();
        }

        function removeUser(user) {
            UserService.deleteUser(user._id)
                .then(function (response) {
                    $route.reload();
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/");
                    });
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