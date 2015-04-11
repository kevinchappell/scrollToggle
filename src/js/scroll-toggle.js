(function($, window, document, undefined) {
	'use strict';

	if (typeof window.requestAnimFrame === 'undefined') {
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();
	}

	$.fn.scrollToggle = function(options) {
		var opts = $.extend({}, $.fn.scrollToggle.defaults, options),
			elementArray = [];

		function Scroller() {
			this.ticking = false;
			this.lastScrollY = 0;
		}
		Scroller.prototype = {
			init: function() {
				window.addEventListener('scroll', this.onScroll.bind(this), false);
			},
			onScroll: function() {
				this.scrollY = window.scrollY;
				this.direction = this.scrollDirection();
				this.requestTick();
			},
			scrollDirection: function() {
				var dir = 'down';
				if (this.scrollY < this.lastScrollY) {
					dir = 'up';
				}
				return dir;
			},
			requestTick: function() {
				if (!this.ticking) {
					window.requestAnimFrame(this.update.bind(this));
				}
				this.ticking = true;
			},
			update: function() {
				var scrollDiff = this.scrollY - this.lastScrollY;
				this.ticking = false;

				$.map(elementArray, function(elem) {
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

		return $(this).each(function() {
			var element = $(this),
			stickyClass = opts.stick === 'top' ? opts.topClass : opts.bottomClass;
			element.translateY = 0;
			element.maxTranslateY = element.outerHeight();
			element.addClass(stickyClass);
			if (opts.stick === 'bottom') {
				element.css('margin-bottom', '-'+element.maxTranslateY+'px');
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
