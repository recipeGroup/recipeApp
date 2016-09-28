(function () {
  angular.module('app')
    .component(
      'feedback', {
        bindings: {},
        templateUrl: 'js/Components/feedback/feedback.html',
        controller: feedbackController,
        controllerAs: 'vm'
      });
  function feedbackController($firebaseArray, toastService, $state, userService) {
    var vm = this;
    vm.$onInit = onInit;
    vm.saveFeedback = saveFeedback;

    function onInit() {
      userService.getProfile()
        .then(
          function (successResponse) {
            vm.user = successResponse;
            var str = vm.user.email;
            if (vm.user.displayName == null) {
              var aNum;
              aNum = str.indexOf("@");
              vm.displayName = str.substr(0, aNum);
            }
            else {
              vm.displayName = vm.user.displayName;
            }

          },
          function (errorResponse) {

          }
        );
    }

    function saveFeedback(feedback) {
      if (!feedback.rating) {
        toastService.showToast('Please Select A rating for our App!');
      }
      else {
        var ref = firebase.database().ref("feedback");
        var feedbackRef = $firebaseArray(ref);
        feedbackRef.$add(feedback)
          .then(
            function (successResponse) {
              toastService.showToast('Thank You for your Feedback!');
              vm.feedback = {};
              $state.go("tabs.login")

            },
            function (errorResponse) {
              console.log(errorResponse)
            }
          )
      }
    }
  }

})();
