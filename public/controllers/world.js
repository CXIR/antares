'use strict';

/**
* CONTROLLER FOR CATEGORY : WORLD PAGE
*/
numisControllers.controller('worldCtrl', [ '$scope', '$http',

  function ( $scope, $http ) {

    var category = { };

    category.name = 'Le Monde';
    category.description = 'Toutes les monnaies du Monde excepté l\'Argenterie et la France';
    category.france = false;
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
