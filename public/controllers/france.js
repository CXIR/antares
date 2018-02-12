'use strict';

/**
* CONTROLLER FOR CATEGORY : FRANCE PAGE
*/
numisControllers.controller('franceCtrl', [ '$scope', '$http',

  function ( $scope, $http ) {

    var category = { };

    category.name = 'La France';
    category.description = 'Toutes les monnaies de France excepté l\'Argenterie';
    category.france = true;
    category.silver = false;

    $scope.category = category;

    $scope.addCoin = function ( add ) {

    }

    $scope.addClean = function () {
      $scope.add   = {};
      $scope.error = {};
    }

  }

]);
