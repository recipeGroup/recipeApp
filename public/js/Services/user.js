//160928-recipeApp_Services_user_js
(function () {
  angular.module('app')
    .service('userService', function ($state, $rootScope, $q, $localStorage, $http) {

      var user;
      var registeredFunctions = [];

      if($localStorage.user) {
        user = $localStorage.user;
      }

      this.getUser = getUser;
      this.getProfile = getProfile;
      this.onUpdate = onUpdate;
      this.setUser = setUser;
      this.saveProfile = saveProfile;
      /**
       * @tyeren gets the firebase user id so we can use specfic user ids thru out the app
       * @returns {Promise}
         */
      function getProfile() {
        var promise = $q.defer();

        if(user) {
          $http({
            method: 'GET',
            url: '/user/read/' + user._id
          })
            .then(function (success) {
              promise.resolve(success.data);
            }, function (error) {
              promise.reject(error.data.error);
            });
        }
        return promise.promise;
      }

      /**
       * @tyeren returns the defined user object
       * @returns {*}
         */
      function getUser() {
        return user;
      }

      /**
       * @tyeren saves the defined user id so we can save updated information to firebase
       * @param data
         */
      function saveProfile(data) {
        var promise = $q.defer();
        $http({
          method: 'POST',
          url: '/user/update',
          data: data
        })
          .then(function(success) {
            setUser(success.data);
            promise.resolve();
          }, function(error) {
            promise.reject(error.data.error);
          });
        return promise.promise;
      }

      /**
       * @tyeren allows controller to set local user to current user
       * @param theUser
         */
      function setUser(theUser) {
        user = theUser;
        $localStorage.user = user;
        update(user);
      }

      /**
       * @tyeren allows a controller to register itself to be updated by the service
       * @param param
         */
      function onUpdate(param) {
        if (typeof param === 'function') {
          registeredFunctions.push(param);
        }
        update(user);
      }

      /**
       * @tyeren updates all of the registered controllers with the data they neeed
       * @param user
         */
      function update(user) {
        registeredFunctions.forEach(function (element) {
          element(user);
        });
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
