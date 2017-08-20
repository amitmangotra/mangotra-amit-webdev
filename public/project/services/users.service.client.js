/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("ExperienceNearbyHappeningsApp")
        .factory("UserService", UserService);

    function UserService($http) {
       var api = {
           "createUser": createUser,
           "findUserById": findUserById,
           "findUserByUsername": findUserByUsername,
           "findUserByCredentials": login,
           "updateUser": updateUser,
           "deleteUser": deleteUser,
           "getAllUsers": getAllUsers,
           "getFollowersList": getFollowersList,
           "getFollowingList": getFollowingList,
           "followOrganizer": followOrganizer,
           "unfollowOrganizer": unfollowOrganizer,
           "removeFromFollowersList": removeFromFollowersList,
           "removeFromFollowingList": removeFromFollowingList,
           "findEventsByUser": findEventsByUser,
           "checkLogin": checkLogin,
           "register": register
        };

        return api;

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }

        function register(user) {
            var url = "/api/register";
            $http.post(url, user);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/login";
            return $http.post(url, {username: username, password: password});
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
        
        function getAllUsers() {
            var url = "/api/:uid/users";
            return $http.get(url);
        }

        function getFollowersList(userId) {
            var url = "/api/followers/user/" + userId;
            return $http.get(url);
        }

        function getFollowingList(userId) {
            var url = "/api/following/user/"+userId;
            return $http.get(url);
        }

        function followOrganizer(organizer, userId) {
            var url = "/api/follow/user/"+userId;
            return $http.put(url, organizer);
        }

        function unfollowOrganizer(organizer, userId) {
            var url = "/api/unfollow/user/"+userId;
            return $http.put(url, organizer);
        }

        function removeFromFollowersList(userId, follower) {
            var url = "/api/delete/follower/user/" + userId;
            return $http.post(url, follower);
        }

        function removeFromFollowingList(userId, following) {
            var url = "/api/delete/following/user/" + userId;
            return $http.post(url, following);
        }

        function findEventsByUser(userId) {
            var url = "/api/user/"+userId+"/events";
            return $http.get(url);
        }

    }
})();