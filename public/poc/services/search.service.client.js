/**
 * Created by cammy on 8/4/17.
 */
(function () {
    angular
        .module("HappeningsApp")
        .service("searchService", searchService);

    function searchService($http) {
        var model = this;

        model.searchEvent = searchEvent;

        function searchEvent(text) {
            var url = "/find/events?text="+text;
            return $http.get(url);
        }
    }
})();
    // function searchService($http) {
    //     var model = this;
    //
    //     model.searchEvent = searchEvent;
    //
    //     function searchEvent(text) {
    //         // var meetup_key = "162d592f5c53704651484b4c2c104f23";
    //         var key = "IJX2AX72RMSXZK4VKD77";
    //         // var token = "IJX2AX72RMSXZK4VKD77";
    //         // var clientKey = "4K6ZH2TUDJED4E6IWZ";
    //         var url = "https://www.eventbrite.com/v3/events/search?token="+key+"&q="+text;
    //         // url += clientKey + "/";
    //         // var url = "/find/events?sign=true&format=json&key="+meetup_key+"&text="+text;
    //         // var url = "https://api.meetup.com/find/events?sign=true&sig_id=219882901&key="+key+"&text=" + text;
    //         //https://api.meetup.com/find/events?&sign=true&photo-host=public&text=beer
    //         //https://api.meetup.com/find/events?photo-host=public&text=beer&sig_id=219882901&sig=aa19c7d65fe5a765dc78fc85e9751c6611d32e1c
    //         // console.log(gotIt);
    //         return $http.get(url);
    //         // alert(text);
    //
    //     }
    // }
