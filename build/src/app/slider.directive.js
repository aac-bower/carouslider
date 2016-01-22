/*
	Directive: aac.slider
*/

(function () {
	'use strict';

	angular
		.module('aac.slider')
		.directive('slider', slider);

	// @ngInject
	function slider($interval, $timeout) {
		return {
			restrict: 'E',
			templateUrl: 'app/slider.html',
			replace: true,
			scope: {
				slides:'='
			},
			compile: function () {
				var changeIndexActive = 0;
				var changeIndexInactive = 0;
				var changeInterval = 6500;

				function getSlideState(slideIndex, activeSlideIndex) {
					if (slideIndex === activeSlideIndex) {
						return 'active';
					} else if (slideIndex < activeSlideIndex) {
						return 'inactive-left';
					} else {
						return 'inactive-right';
					}
				}

				function changeIndexCount(activeSlidesLength, inactiveSlidesLength) {
					if (changeIndexActive <= activeSlidesLength-1) {
						if (changeIndexInactive > inactiveSlidesLength-1) { 
							var changeIndexInactive2 = 0;
							changeIndexInactive = 0;
						} else {
							var changeIndexInactive2 = changeIndexInactive;
						}
						var changeIndexActive2 = changeIndexActive;

						changeIndexActive += 1;
						changeIndexInactive += 1;

						return {
							'changeIndexActive2': changeIndexActive2, 
							'changeIndexInactive2': changeIndexInactive2
						}; 
					} else {
						var changeIndexActive2 = 0;
						if (changeIndexInactive > inactiveSlidesLength-1) {
							var changeIndexInactive2 = 0;
							changeIndexInactive = 0;
						} else {
							var changeIndexInactive2 = changeIndexInactive;
						}
						changeIndexInactive += 1;
						changeIndexActive = 1;
						return {
							'changeIndexActive2': changeIndexActive2, 
							'changeIndexInactive2': changeIndexInactive2
						};
					}
				}

				return {
					pre: function (scope, element) {
						scope.slidesLength = scope.slides.length;
						scope.activeSlides = scope.slides.splice(0,4);
						scope.inactiveSlides = scope.slides.splice(0,scope.slidesLength-4);
					},
					post: function (scope, element) {
						var timeItOut;
						var timeItOut2;

						scope.changeSlide = function () {
							var currentIndexes = changeIndexCount(scope.activeSlides.length, scope.inactiveSlides.length);
							var currentIndexActive = currentIndexes.changeIndexActive2;
							var currentIndexInactive = currentIndexes.changeIndexInactive2;

							scope.activeSlides[currentIndexActive].animationState = 'turning';
							scope.inactiveSlides[currentIndexInactive].animationState = 'turning';

							timeItOut = $timeout(function () {
								var helper = scope.activeSlides[currentIndexActive];
								scope.activeSlides[currentIndexActive] = scope.inactiveSlides[currentIndexInactive];
								scope.inactiveSlides[currentIndexInactive] = helper;
								scope.activeSlides[currentIndexActive].title = 'slide' + (currentIndexActive+1);

								timeItOut2 = $timeout(function () {
									scope.activeSlides[currentIndexActive].animationState = 'turned';
									for (var checkIfActiveIndex = scope.activeSlides.length-1; checkIfActiveIndex >= 0; checkIfActiveIndex-=1) {
										if (checkIfActiveIndex < currentIndexActive && scope.activeSlides[checkIfActiveIndex].state === 'active') {
											scope.activeSlides[currentIndexActive].state = 'inactive-right';
										}
									}
								}, 200);
							},400);
						};

						var changing = $interval(scope.changeSlide, changeInterval);

						scope.activate = function (activeSlideIndex) {
							$interval.cancel(changing);

							for (var slideIndex = scope.activeSlides.length-1; slideIndex >= 0; slideIndex-=1) {
								scope.activeSlides[slideIndex].state = getSlideState(slideIndex, activeSlideIndex);
							}
						};

						scope.deactivate = function() {
							changing = $interval(scope.changeSlide, changeInterval);

							for (var slideIndex = scope.activeSlides.length-1; slideIndex >= 0; slideIndex--) {
								scope.activeSlides[slideIndex].state = '';
							}
						};
					}
				};
			}
		};
	}
})();
