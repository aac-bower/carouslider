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
				slides:'=?',
				interval:'=?',
				breakpoint: '=?'
			},
			compile: function () {

				var changeIndexActive = 0;
				var changeIndexInactive = 0;
				var carousliding = false;
				var breakCarousliding = false;

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

						// if (!scope.breakpoint) { scope.breakpoint = 768; }
						scope.breakpoint = scope.breakpoint ? scope.breakpoint:768;

						scope.slidesLength = scope.slides.length;

						if (scope.slidesLength == 1) {
							breakCarousliding = true;
						}

						if (window.innerWidth > scope.breakpoint && scope.slidesLength > 4) {
						scope.activeSlides = scope.slides.splice(0,4);
						scope.inactiveSlides = scope.slides.splice(0,scope.slidesLength-4);
						carousliding = true;
						} else {
							scope.activeSlides = scope.slides.splice(0,1);
							scope.inactiveSlides = scope.slides.splice(0,scope.slidesLength-1);
						}

					},
					post: function (scope, element) {

						if (breakCarousliding == true) {
							return;
						}

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

						var changing = $interval(scope.changeSlide, scope.interval);

						scope.activate = function (activeSlideIndex) {
							$interval.cancel(changing);
							if (carousliding) {
								for (var slideIndex = scope.activeSlides.length-1; slideIndex >= 0; slideIndex-=1) {
									scope.activeSlides[slideIndex].state = getSlideState(slideIndex, activeSlideIndex);
								}
							}
						};

						scope.deactivate = function() {
							changing = $interval(scope.changeSlide, scope.interval);

							if (carousliding) {
								for (var slideIndex = scope.activeSlides.length-1; slideIndex >= 0; slideIndex--) {
									scope.activeSlides[slideIndex].state = '';
								}
							}
						};
					}
				};
			}
		};
	}
})();
