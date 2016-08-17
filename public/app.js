angular.module('s3Demo', [])
.directive('fileRead', function() {
  return {
    restrict: 'A',
    controller: function($scope, dataService) {
      $scope.storeImage = dataService.storeImage;
    },
    link: function(scope, elem, attrs) {
      elem.bind('change', function(changeEvent) {
        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          var fileread = loadEvent.target.result;
          scope.storeImage(fileread, 'test');
        }

        // Convert image into base64
        // Result will be avaiable in target.Result
        // Triggers onload event when finished
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
    }
  }
})
.service('dataService', function($http) {
  this.storeImage = function(imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/')
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: 'brett.caudill.is@gmail.com'
    }

    return $http.post('/api/newimage', newImage);
  }
})
