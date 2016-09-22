(function () {
  angular.module('app')
    .service('userService', function ($state, $rootScope, $q) {

      var user;
      var registeredFunctions = [];

      if (window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]')) {
        var userStorage = window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]');
        user = JSON.parse(userStorage);
        update(user);
      }

      this.getUser = getUser;
      this.getProfile = getProfile;
      this.onUpdate = onUpdate;
      this.setUser = setUser;
      this.saveProfile = saveProfile;

      function getUser() {
        return user;
      }

      function setUser(theUser) {
        user = theUser;
        update(user);
      }

      function update(user) {
        registeredFunctions.forEach(function (element) {
          element(user);
        });
      }

      function onUpdate(param) {
        if (typeof param === 'function') {
          registeredFunctions.push(param);
        }
      }

      function getProfile() {
        var promise = $q.defer();
        firebase.database().ref('users/' + user.uid)
          .once('value').then(
            function (snapshot) {
              promise.resolve(snapshot.val());
            },
        function (errorResponse) {
          promise.reject(errorResponse);
        });
        return promise.promise;
      }

      function saveProfile(data) {
        var ref = firebase.database().ref('users/' + user.uid).update(data);
      }

      $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
          if (!user && toState !== 'tabs.login') {
            event.preventDefault();
            $state.go('tabs.login');
          }
        });

    })
})();
