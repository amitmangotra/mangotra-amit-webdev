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
           "register": register,
           "interestedInEvent": interestedInEvent,
           "logout": logout,
           "findAllUsers": findAllUsers
        };

        return api;

        function checkLogin() {
            return $http.get("/api/project/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }

        function register(user) {
            var url = "/api/project/register";
            $http.post(url, user);
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/project/login";
            return $http.post(url, {username: username, password: password});
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }
        
        function getAllUsers() {
            var url = "/api/project/:uid/users";
            return $http.get(url);
        }

        function findAllUsers(userRole) {
            return $http.get("/api/project/all/users/" + userRole);
        }

        function getFollowersList(userId) {
            var url = "/api/project/followers/user/" + userId;
            return $http.get(url);
        }

        function getFollowingList(userId) {
            var url = "/api/project/following/user/"+userId;
            return $http.get(url);
        }

        function followOrganizer(organizer, userId) {
            var url = "/api/project/follow/user/"+userId;
            return $http.put(url, organizer);
        }

        function unfollowOrganizer(organizer, userId) {
            var url = "/api/project/unfollow/user/"+userId;
            return $http.put(url, organizer);
        }

        function removeFromFollowersList(userId, follower) {
            var url = "/api/project/delete/follower/user/" + userId;
            return $http.post(url, follower);
        }

        function removeFromFollowingList(userId, following) {
            var url = "/api/project/delete/following/user/" + userId;
            return $http.post(url, following);
        }

        function findEventsByUser(userId) {
            var url = "/api/project/user/"+userId+"/events";
            return $http.get(url);
        }

        function interestedInEvent(event, userId) {
            var url = "/api/project/"+userId+"/events/rsvpEvents";
            return $http.put(url, event);
        }

        // function findEventsForUser(userId, eventId) {
        //     var url = "/api/project/user/" + userId + "/events/" + eventId;
        //     return $http.get(url);
        // }

    }
})();