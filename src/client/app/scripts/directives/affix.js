// This directive is currenty unsed in beLocal, but it contains a SUPER hacky workaround to cause certain elements on the page to scroll
// in a way that continues to work with bootstrap's grid system. It's worth noting that Bootstrap itself has something like this called
// affix.js, but that the position:fixed; style that it places on all affixed elements causes any grid layouts to break (genius, I know).
// We pulled this out because it was breaking our footer, but I think it's close to working. My math is slightly off somewhere...
// When we want to put fixed maps back into beLocal, I'll give this another shot.

'use strict';

angular.module('clientApp')
  .directive('affix', function ($window) {
    return {
      restrict: 'A',
      scope: {
        offsetTop: '=',
        containerClass: '@',
        scrollElementClass: '@',
      },
      link: function postLink(scope, element, attrs) {
        scope.scrollElementHeight = angular.element('.' + scope.scrollElementClass).height();

        scope.doScroll = function() {
            var rowHeight = angular.element(element).closest('.' + scope.containerClass).height();
            var scroll = angular.element($window).scrollTop();
            if(scroll > scope.offsetTop && angular.element($window).width() > 768 && scroll + scope.scrollElementHeight - scope.offsetTop < rowHeight) {
                angular.element(element).css({top: scroll - scope.offsetTop})
            } else if(!(scroll + scope.scrollElementHeight - scope.offsetTop >= rowHeight)) {
                angular.element(element).css({top: 0});
            } 
        }

        angular.element($window).resize(function() {
          if(angular.element($window).width() <= 768) {
            angular.element(element).css({top: 0});
          } else {
            scope.doScroll();
          }
        });        

        angular.element($window).scroll(function() {
          scope.doScroll();
        });      
      }
    };
  });
