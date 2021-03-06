(function () {
  angular.module('app')
         .component(
           'login', {
             bindings: {},
             templateUrl: 'js/Components/login/login.html',
             controller: loginController,
             controllerAs: 'vm'
           }
         );
  function loginController(authenticationService, toastService, $state, userService) {
//Local variables
    var vm = this;
    //Public variables
    vm.$onInit = onInit;
    vm.createEmailLogin = createEmailLogin;
    vm.login = login;
    vm.logout = logout;
    vm.showCreateEmailForm = showCreateEmailForm;
    vm.showEmailForm = showEmailForm;

    /**
     * @loghen41 createEmailLogin() allows the user to establish a new login with an email and two passwords
     * @loghen41 the actual creation of the login is handled through authentication.js which speaks to firebase
     * @param email
     * @param password1
     * @param password2
     */
    function createEmailLogin(email, password1, password2) {
      vm.showTheCreateEmailForm = false;
      if (password1 !== password2) {
        toastService.showToast('Passwords do not Match!');
      }
      else {
        authenticationService.createUserFromEmail(email, password1)
                             .then(
                               function () {
                                 vm.user = userService.getUser();
                                 if (vm.user.displayName) {
                                   toastService.showToast(vm.user.displayName + " Logged In!");
                                 }
                                 else {
                                   toastService.showToast(vm.user.email + " logged in!");
                                 }
                                 $state.go('tabs.home');
                               }, function (error) {
                                 toastService.showToast(error);

                               }
                             )
      }
    }

    /**
     * @loghen41 login() can allow the user to login via a provider (facebook, google, etc..) or via email and password
     * @loghen41 the actual login process is handled by authentication.js
     * @param provider
     * @param email
     * @param password
     */
    function login(email, password) {

      if(vm.showTheEmailForm && !email ) {
        toastService.showToast('Please Provide a Valid Email');
      }

      if(vm.showTheEmailForm && !password ) {
        toastService.showToast('Please Provide a Valid Password');
      }

      if (vm.showTheEmailForm && email && password) {
        vm.showTheEmailForm = false;
      }

      authenticationService.login(email, password)
                           .then(
                             function () {
                               vm.user = userService.getUser();
                               if (vm.user.displayName) {
                                 toastService.showToast(vm.user.displayName + " Logged In!");
                               }
                               else {
                                 toastService.showToast(vm.user.email + " Logged in!");
                               }
                               $state.go('tabs.home');
                             },
                             function (error) {
                               toastService.showToast(error)
                             }
                           )
    }

    /**
     * @loghen41 logout() does not require params, it is merely called and it will log the user out of the system
     */
    function logout() {
      if (vm.user.displayName) {
        toastService.showToast(vm.user.displayName + " logged out!");
      }
      else {
        toastService.showToast(vm.user.email + " logged out!");
      }

      authenticationService.logout();
      delete vm.user;
    }

    /**
     * @loghen41 onInit() is called once the controller is loaded, and calls authenticationService.initialCheck() to see if the user exists and route the page accordingly
     */
    function onInit() {
      vm.user = userService.getUser();

    }

    /**
     * @loghen41 showCreateEmailForm() shows the createEmailForm when called
     */
    function showCreateEmailForm() {
      vm.showTheEmailForm = false;
      vm.showTheCreateEmailForm = true;
    }

    /**
     * @loghen41 showEmailForm() shows the emailForm when called
     */
    function showEmailForm() {
      vm.showTheEmailForm = true;
      vm.showTheCreateEmailForm = false;
    }

  }
})();
