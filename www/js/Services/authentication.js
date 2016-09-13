(function () {
  angular.module('app')
    .service('authenticationService', function ($sessionStorage, $localStorage, $firebaseObject, $firebaseAuth, $q) {

      var vm = this;
      vm.login = login;
      vm.logout = logout;
      vm.createUserFromEmail = createUserFromEmail;
      vm.initialCheck = initialCheck;
      var user;


      function createUserFromEmail(email, password) {
        var auth = $firebaseAuth();
        var promise = $q.defer();

        auth.$createUserWithEmailAndPassword(email, password)
          .then(function (firebaseUser) {
            var ref = firebase.database().ref("users");
            var profileRef = ref.child(firebaseUser.uid);
            var theUser = $firebaseObject(profileRef);
            var userStorage = window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]');
            user = JSON.parse(userStorage);

            theUser.$loaded().then(
              profileRef.set({
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL
              })
            );
            promise.resolve(user);
          })
          .catch(function (creationError) {
            promise.reject(creationError)
          });

        return promise.promise;

      }

      //This does the initial Check for the user
      function initialCheck() {
        if (user) {
          return user;
        }
        else {
          var userStorage = window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]');
          user = JSON.parse(userStorage);
          return user;
        }
      }

      //This is how the user credentials are authenticated
      function login(provider, email, password) {

        var auth = $firebaseAuth();

        var promise = $q.defer();

        if (email && password) {

          auth.$signInWithEmailAndPassword(email, password)
            .then(function (loginSuccess) {
              var userStorage = window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]');
              user = JSON.parse(userStorage);
              promise.resolve(user);
            })
            .catch(function (loginError) {
              promise.reject(loginError);
            })

        }

        else {

          auth.$signInWithPopup(provider)

            .then(function (firebaseUser) {
              var userStorage = window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]');
              user = JSON.parse(userStorage);
              var ref = firebase.database().ref("users");
              var profileRef = ref.child(firebaseUser.user.uid);
              var theUser = $firebaseObject(profileRef);

              theUser.$loaded().then(function () {
                  if (!theUser.displayName) {
                    profileRef.set({
                      displayName: firebaseUser.user.displayName,
                      email: firebaseUser.user.email,
                      photoURL: firebaseUser.user.photoURL
                    })
                  }
                }
              );
              promise.resolve(user)
            }).catch(function (error) {
            promise.reject(error);
          });

        }
        return promise.promise;
      }

      //This is how the user logs out of the database
      function logout() {
        var auth = $firebaseAuth();
        auth.$signOut();
        user = undefined;
        return user;
      }


    });
})();
