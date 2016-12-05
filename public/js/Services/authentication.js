//160928-recipeApp_Services_authentication_js
(function () {
  angular.module('app')
    .service('authenticationService', function ($sessionStorage, $localStorage,  $q, $state, userService, $http) {

      this.createUserFromEmail = createUserFromEmail;
      this.login = login;
      this.logout = logout;
      this.oAuthLogin = oAuthLogin;

      /**
       * @loghen41 createUserFromEmail() creates a user in firebase based on the email and password given to it
       * @loghen41 it assumes you have already validated the password
       * @loghen41 it returns a promise that contines the user object generated by firebase, or a creation error from firebase
       * @param email
       * @param password
         * @returns {Promise}
         */
      function createUserFromEmail(email, password) {

        var promise = $q.defer();

        var record = {
          name_first: '',
          name_last: '',
          displayName: '',
          photoURL: '',
          email: email,
          password: password,
          gender: 'Other'
        };


        $http({
          method: 'POST',
          url: 'recipevil.westus2.cloudapp.azure.com:3000/user/create',
          data: record
              })
          .then(function(success) {
            userService.setUser(success.data);
            promise.resolve();
          }, function(error) {
              promise.reject(error.data.error);
          });

        return promise.promise;

      }

      /**
       * @loghen41 login() allows the user to login, it can either be achieved through a provider (facebook, google, etc...)
       * @loghen41 If a provider is not given, it can be done through an email and password, provided they are already established as credentials in the system
       * @loghen41 the return object is either a user object, or a loginError with a message
       * @param provider
       * @param email
       * @param password
         * @returns {Promise}
         */
      function login( email, password) {

        var promise = $q.defer();

        $http({
          method: 'POST',
          url: 'recipevil.westus2.cloudapp.azure.com:3000/user/login',
          data: {email: email, password: password}
        })
          .then(function(success) {
            userService.setUser(success.data);
            promise.resolve();
          }, function(error) {
            promise.reject(error.data.error);
          });

        return promise.promise;
      }

      /**
       * @loghen41 logout() basically logs the user out of firebase, and reroutes the individual to the tabs.login, and sets the user as undefined in this model
       * @returns {undefined|*}
         */
      function logout() {
        var user = undefined;
        userService.setUser(user);
        $state.go('tabs.login');

        return user;
      }

      function oAuthLogin(provider) {
        var promise = $q.defer();

        $http({
          method: 'GET',
          url: 'recipevil.westus2.cloudapp.azure.com:3000/user/auth/' + provider
        })
          .then(function(success) {
            console.log(success);
            userService.setUser(success.data);
            promise.resolve();
          }, function(error) {
            console.log(error);
            promise.reject(error.data.error);
          });

        return promise.promise;
      }


    });
})();
