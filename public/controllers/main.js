'use strict';

/**
* APPLICATION DECLARE
*/
const numis = angular.module('numis',[
  'ngRoute',
  'numisControllers'
]);

/**
* ROUTER
*/
numis.config( [ '$routeProvider',
                '$locationProvider',

  function ( $routeProvider, $locationProvider ) {

    $locationProvider.hashPrefix('');

    $routeProvider
    .when('/login',{
      templateUrl : 'views/login.html',
      controller  : 'loginCtrl'
    })
    .when('/home',{
      templateUrl : 'views/home.html',
      controller  : 'homeCtrl'
    })
    .when('/france',{
      templateUrl : 'views/category.html',
      controller  : 'franceCtrl'
    })
    .when('/world',{
      templateUrl : 'views/category.html',
      controller  : 'worldCtrl'
    })
    .when('/silver',{
      templateUrl : 'views/category.html',
      controller  : 'silverCtrl'
    })
    .otherwise({
      redirectTo : '/login'
    });
  }
]);

/**
* NAVBAR DIRECTIVE
*/
numis.directive('nv', [ '$location',

  function ($location) {

    return {
      restrict    : 'E',
      replace     : true,
      transclude  : true,
      templateUrl : 'views/navbar.html',
      link : function ( scope, element, attrs ) {

        let url = $location.path().split('/');

             if( url[1] == 'home'   ) {
          angular.element( document.querySelector( '#home' ) ).addClass( 'active' );
        }
        else if( url[1] == 'france' ) {
          angular.element( document.querySelector( '#france' ) ).addClass( 'active' );
        }
        else if( url[1] == 'world'  ) {
          angular.element( document.querySelector( '#world' ) ).addClass( 'active' );
        }
        else if( url[1] == 'silver' ) {
          angular.element( document.querySelector( '#silver' ) ).addClass( 'active' );
        }
      }
    };

  }

]);

/**
* MODULE FOR CONTROLLERS
*/
const numisControllers = angular.module( 'numisControllers', [] );
