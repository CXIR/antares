'use strict';

/**
* CONTROLLER FOR CATEGORY : SILVER PAGE
*/
numisControllers.controller('silverCtrl', [ '$scope', '$http',

  function ( $scope, $http ) {

    var category = { };

    category.name = 'L\'Argenterie';
    category.description = 'Toutes les monnaies de France et du Monde, exclusivement en Argent.';
    category.france = false;
    category.silver = true;

    $scope.category = category;

    $scope.addCoin = function ( add ) {

    }

    $scope.addClean = function () {
      $scope.add   = {};
      $scope.error = {};
    }

  }

]);
