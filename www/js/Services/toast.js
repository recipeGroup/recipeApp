//160928-recipeApp_Services_toast_js
(function() {
  angular.module('app')
    .service('toastService', function($ionicPopup) {
      this.showToast = showToast;

      function showToast(message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Recipe App Alert',
          template: message
        });
        }


    })
})();
