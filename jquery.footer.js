/**
 * jQuery Plugin to brings the footer down if the window is higher
 * than the size of the page layout.
 * @author	Luigi Mozzillo <luigi@innato.it>
 * @link	http://innato.it
 * @version 1.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 */
!function($) {
	'use strict';

	var Footer = function(element, options) {
		this.init(element, options)
	}

	// --------------------------------------------------------------------------

	Footer.prototype = {

		/**
		 * Constructor
		 */
		constructor: Footer

		// --------------------------------------------------------------------------

		/**
		 * Initialize item
		 */
		, init: function(element, options) {
			var that = this;
			this.$element = $(element);
			if (!this.$element.length) return false;
			this.options = $.extend({}, $.fn.footer.defaults, options);

			// Set behaviours
			this._behaviours();
		}

		// --------------------------------------------------------------------------

		/**
		 * Behaviours
		 */
		, _behaviours: function() {
			var that = this;
			this._adjust();	// Brings the footer down
			if (this.options.on_resizing === true)
				// Do it again every time you resize the window
				$(window).resize(function() { $.proxy(that._adjust(), that);  });
		}

		// --------------------------------------------------------------------------

		/**
		 * Brings the footer down
		 */
		, _adjust: function() {
			var   that = this
				, footer_height	= this.$element.innerHeight()
				, footer_margin	= parseInt(this.$element.css('marginTop'))
				, footer_offset	= this.$element.offset().top
				, window_height = $(window).height()

			if ((footer_offset + footer_height - footer_margin) < window_height) {
				var   new_margin	= window_height
									- footer_offset
									- footer_height
									+ footer_margin;
				this.$element.css('marginTop', new_margin);
			}
		}
	}

	// --------------------------------------------------------------------------

	$.fn.footer = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('footer')
				, options = typeof option == 'object' && option
			if (!data) $this.data('footer', (data = new Footer(this, options)))
			if (typeof option == 'string') data[option]();
			return $(this);
		})
	};

	$.fn.footer.Constructor = Footer
	$.fn.footer.defaults = {
		on_resizing:		true	// Do it every time the window is resized
	}
}(window.jQuery);