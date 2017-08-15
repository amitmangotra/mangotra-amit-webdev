(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, WidgetService, $location, FlickrService) {
          var model = this;

        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {

        }
        init();
        
        function searchPhotos(queryTerm) {
            FlickrService
                .searchPhotos(queryTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(model.wgid)
                .then(function (response) {
                    var _widget = response;
                    _widget.url = url;
                    _widget._id = model.wgid;
                    return WidgetService.updateWidget(_widget._id, _widget);
                })
                .then(function (response) {
                    $location.url("/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+'/widget/');
                });
        }

    }
})();