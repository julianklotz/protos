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

PROTOS.InPlaceEditingView = Backbone.View.extend({
	textSelector: '.js-text-input',
	events: {
		'click .js-btn-add-text': 'didPressAddText',
		'click .js-btn-edit-text': 'didPressEditText',
		'click .js-btn-save-text': 'didPressSaveText',
		'click .js-btn-abort-text': 'didPressAbortText',
	},

	initialize: function() {
		this.textValue = this.model.get('name');
		this.stateMachine = new PROTOS.StateMachine(['SET', 'EDITING']);
		this.stateMachine.on('change', this.render, this);
		_.bindAll(this, 'didPressAddText', 'didPressEditText', 'didPressSaveText', 'didPressAbortText');
	},

	didPressAddText: function() {
		this.stateMachine.setState('EDITING');
		return false
	},

	didPressEditText: function() {
		this.stateMachine.setState('EDITING');
		return false
	},

	didPressSaveText: function() {
		this.model.set('name', this.$(this.textSelector).val() );
		this.leaveEditingMode();
		return false
	},

	didPressAbortText: function() {
		this.leaveEditingMode();
		return false
	},

	leaveEditingMode: function() {
		this.stateMachine.setState('SET');
	},

	render: function() {
		console.log('state: ', this.stateMachine.getState() );
		var template = _.template( $('#tpl-edit-title').html() );

		var args = {
			state: this.stateMachine.getState(),
			textValue: this.model.get('name'),
		};
		this.$el.html( template(args) );
		return this
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
	var bodyClass = 'protos-overlay-open';

	function setSize(newSize) {
		if( !newSize ) { newSize = exports.SIZE_DEFAULT; }

		if( currentSize != newSize ) {
				inner.removeClass(currentSize);
				inner.addClass(newSize);
				currentSize = newSize;
		}
	}

	var show = function() {
		overlay[0].style.top = window.scrollY + 'px';
		overlay.show();
		$('body').addClass( bodyClass );
	};

	exports.render = function(templateName, newSize, tplParams) {
		setSize(newSize);
		var tpl = _.template( $('#' + templateName).html() );
		contentElement.html( tpl( tplParams ) );
		show();
	};

	exports.showHtmlOnly = function(html, newSize) {
		setSize(newSize);
		contentElement.html( html );
		show();
	}

	exports.hide = function() {
		contentElement.empty();
		overlay.hide();
		$('body').removeClass( bodyClass );
	};

	btnClose.on('click', exports.hide);

	return exports
})();

PROTOS.formUtils = {};
PROTOS.formUtils.getImagePreview = function(input, callback, context) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			if(!context) {
				context = window;
			}
			callback.call(context, e.target.result);
		}

		reader.readAsDataURL(input.files[0]);
	}
}
