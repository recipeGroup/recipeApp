//160928-recipeApp_Services_recipes_js
(function () {
  angular.module('app')
    .service('recipesService', function (  $q) {

      //Declaring Variables for use in the service
      var selectedRecipe;

      //Declaring functions for use in the Controller
      this.addIngredient = addIngredient;
      this.deleteIngredient = deleteIngredient;
      this.editRecipe = editRecipe;
      this.getAppRecipes = getAppRecipes;
      this.getRecipes = getRecipes;
      this.getSelectedRecipe = getSelectedRecipe;
      this.saveRecipe = saveRecipe;
      this.setSelectedRecipe = setSelectedRecipe;
      this.deleteRecipe = deleteRecipe;


      //Functions for use in the Service
      /**
       * @loghen41 addIngredient() recipes a recipe, and adds an ingredient to it in the database
       * @param recipeObject
       * @returns {Promise}
         */
      function addIngredient(recipeObject) {
        var promise = $q.defer();

        var newIngredient = {
          name: '',
          quantity: ''
        };
        
        return promise.promise;
      }

        /**
         * @loghen41 deleteIngredient() deletes an ingredient in the database
         * @param recipeObject
         * @param index
         * @returns {Promise}
         */
      function deleteIngredient(recipeObject, index) {
        var promise = $q.defer();

        return promise.promise;
      }

      function deleteRecipe(recipe) {
        var promise = $q.defer();
       
        return promise.promise;
      }

      /**
       * @loghen41 editRecipe() allows the user to edit a previously created recipe
       * @param recipe
       * @returns {Promise}
       */
      function editRecipe(recipe) {
        //$q makes a promise object that waits for a resolve, or a reject
        var promise = $q.defer();

        //var record is a local object that has been prepared to make an update to the database
        var record = {
          title: recipe.title,
          directions: recipe.directions,
          status: recipe.status
        };
        
        return promise.promise;

      }

      /**
       * getAppRecipes() gets all of the public recipes built by the App
       * @returns {Promise}
         */
      function getAppRecipes() {
        var promise = $q.defer();
        
        return promise.promise;
      }

      function getRecipes(userId) {
        var promise = $q.defer();
       
        return promise.promise;
      }


      /**
       * @loghen41 allows the controller to get the selectedRecipe variable in the service
       * @returns {*}
       */
      function getSelectedRecipe() {
        return selectedRecipe;
      }
      

      /**
       * @loghen41 saveRecipe() allows the user to save a brand new recipe
       * @param user
       * @param recipe
       */
      function saveRecipe(user, recipe) {
        var promise = $q.defer();

        //var record is a local object that we are preparing to send to firebase, this is only done to take out the ingredients, and add in the user, and public variables
        var record = {
          title: recipe.title,
          directions: recipe.directions,
          status: recipe.status,
          user: user.uid
        };
        
        return promise.promise;
      }

      /**
       * @loghen41 allows a controller to set the selectedRecipe variable in the service for other controllers to see
       * @param recipe
       */
      function setSelectedRecipe(recipe) {
        selectedRecipe = recipe;
      }
    })
})();
