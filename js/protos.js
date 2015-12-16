/**
 * JavaScript Components
 */

var PROTOS = PROTOS || {};

PROTOS.modal = (function() {
	var exports = {};

	exports.SIZES = {
		S: 'protos-overlay-small',
		M: 'protos-overlay-medium',
		L: 'protos-overlay-large'
	};

	exports.SIZE_DEFAULT = exports.SIZES.M;

	var contentElement = $('#protos-overlay-content');
	var overlay = $('#protos-overlay');
	var btnClose = $('.js-protos-overlay-close');
	var inner = $('.protos-overlay-inner');
	var currentSize = null;

	exports.show = function(templateName, newSize) {
		if( !newSize ) {
				newSize = exports.SIZE_DEFAULT;
		}

		if( currentSize != newSize ) {
				inner.removeClass(currentSize);
				inner.addClass(newSize);
				currentSize = newSize;
		}

		modalContents = $('#' + templateName).html();
		contentElement.html(modalContents);
		overlay.show();
	};

	exports.hide = function() {
		contentElement.empty();
		overlay.hide();
	};

	btnClose.on('click', exports.hide);

	return exports
})();
