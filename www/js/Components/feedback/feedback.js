(function () {
  angular.module('app')
    .component(
      'feedback', {
        bindings: {},
        templateUrl: 'js/Components/feedback/feedback.html',
        controller: feedbackController,
        controllerAs: 'vm'
      });
  function feedbackController($firebaseArray, toastService, $state) {
    var vm = this;
    vm.saveFeedback = saveFeedback;

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
