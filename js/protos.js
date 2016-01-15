/**
 * JavaScript Components
 */

var PROTOS = PROTOS || {};

PROTOS.StateMachine = Backbone.Model.extend({
	initialize: function(initStates) {
		this.states = initStates;
		this.setState( initStates[0] );

		console.log( "Allowed states:", this.states.toString() );
		console.log( "Init state:", this.getState() );
	},

	setStates: function(_states) {
		this.states = _states;
	},

	setState: function(newState) {
		if( this.states.indexOf(newState) == -1 ) {
			throw("State `" + newState + "` is not allowed.");
		}

		this.set('state', newState);
	},

	getState: function() {
		return this.get('state');
	},
});

PROTOS.modal = (function() {
	"use strict";

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

	function setSize(newSize) {
		if( !newSize ) { newSize = exports.SIZE_DEFAULT; }

		if( currentSize != newSize ) {
				inner.removeClass(currentSize);
				inner.addClass(newSize);
				currentSize = newSize;
		}
	}

	exports.render = function(templateName, newSize, tplParams) {
		setSize(newSize);
		var tpl = _.template( $('#' + templateName).html() );
		contentElement.html( tpl( tplParams ) );
		overlay.show();
	};

	exports.showHtmlOnly = function(html, newSize) {
		setSize(newSize);
		contentElement.html( html );
		overlay.show();
	}

	exports.hide = function() {
		contentElement.empty();
		overlay.hide();
	};

	btnClose.on('click', exports.hide);

	return exports
})();
