angular.module('twitterFeed', ['ionic', 'twitterFeed.controllers', 'twitterFeed.services', 'twitterFeed.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

      $compileProvider.directive('compile', function ($compile) {
        // directive factory creates a link function
        return function (scope, element, attrs) {
          scope.$watch(
              function (scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
              },
              function (value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
              }
          );
        };
      });

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.twitterFeed', {
    url: "/twitterFeed",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/twitterFeed.html",
        controller: 'TwitterFeedCtrl'
      }
    }
  })

  .state('app.emptyPage', {
    url: "/emptyPage",
    views: {
      'menuContent': {
        templateUrl: "templates/emptyPage.html",
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/twitterFeed');
});
