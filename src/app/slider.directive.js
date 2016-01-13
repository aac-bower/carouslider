/*
    Directive: aac.slider
*/

(function() {
    'use strict';

    angular
        .module('aac.slider')
        .directive('slider', slider);

    // @ngInject
    function slider() {
        return {
            restrict: 'E',
            templateUrl: 'app/slider.html',
            replace: true,
            scope: {
            	slides:'='
            },
            compile: function() {
                return {
                    pre: function( scope, element ) {

                    	scope.activeSlides = scope.slides.splice(0,4);
                    	console.log(scope.activeSlides);

                    	var sliderContainer = $( '#aac-slider' );

                    	/*for (var currentImage in scope.activeSlides) {
                    		sliderContainer.append( '<div class="asd">'+currentImage+'</div>' );
                    	}*/

                    },
                    post: function( scope, element ) {
                        
                        
                    }
                };
            }
        };
    }
})();
