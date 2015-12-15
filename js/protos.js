/**
 * JavaScript Components
 */

var PROTOS = PROTOS || {};

PROTOS.modal = (function() {
	var exports = {};

	var contentElement = $('#protos-overlay-content');
	var overlay = $('#protos-overlay');
	var btnClose = $('.js-protos-overlay-close');

	exports.show = function(templateName) {
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
