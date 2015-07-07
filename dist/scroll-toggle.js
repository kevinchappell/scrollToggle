'use strict';

(function ($, window, document, undefined) {
	'use strict';

	var vendors = ['ms', 'moz', 'webkit', 'o'];
	var lastTime = 0;

	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		var vendor = vendors[x];
		window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 4 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				return callback(currTime + timeToCall);
			}, timeToCall);

			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			return clearTimeout(id);
		};
	}

	$.fn.scrollToggle = function (options) {
		var _this = this;

		var opts = $.extend({}, $.fn.scrollToggle.defaults, options),
		    elementArray = [];

		var Scroller = function Scroller() {
			_this.lastScrollY = 0;
		};

		Scroller.prototype = {
			init: function init() {
				window.addEventListener('scroll', this.onScroll.bind(this), false);
			},
			onScroll: function onScroll() {
				this.scrollY = window.scrollY;
				this.direction = this.scrollDirection();
				window.requestAnimationFrame(this.update.bind(this));
			},
			scrollDirection: function scrollDirection() {
				var dir = 'down';
				if (this.scrollY < this.lastScrollY) {
					dir = 'up';
				}
				return dir;
			},
			update: function update() {
				var scrollDiff = this.scrollY - this.lastScrollY;

				$.map(elementArray, function (elem) {
					if (scroller.direction === 'down') {
						if (-elem.translateY < elem.maxTranslateY) {
							elem.translateY -= scrollDiff;
						} else {
							elem.translateY = -elem.maxTranslateY;
						}
					} else {
						if (elem.translateY < 0) {
							elem.translateY -= scrollDiff;
						} else {
							elem.translateY = 0;
						}
					}
					elem.css({
						'transform': 'translateY(' + elem.translateY + 'px)',
						'-moz-transform': 'translateY(' + elem.translateY + 'px)',
						'-webkit-transform': 'translateY(' + elem.translateY + 'px)'
					});
				});
				this.lastScrollY = this.scrollY;
			}
		};

		var scroller = new Scroller();
		scroller.init();

		return $(this).each(function () {
			var element = $(this),
			    stickyClass = opts.stick === 'top' ? opts.topClass : opts.bottomClass;
			element.translateY = 0;
			element.maxTranslateY = element.outerHeight();
			element.addClass(stickyClass);
			element.css('position', 'fixed');
			if (opts.stick === 'bottom') {
				element.css('margin-bottom', '-' + element.maxTranslateY + 'px');
			}
			elementArray.push(element);
		});
	};

	$.fn.scrollToggle.defaults = {
		stick: 'top',
		topClass: 'stick-top',
		bottomClass: 'stick-bottom'
	};
})(jQuery, window, document);