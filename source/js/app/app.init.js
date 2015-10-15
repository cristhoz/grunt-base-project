/*!
 * @app
 * @author me@yocristian.com (De la Hoz, Cristian)
 */

(function(factory) {
	var _ended = function() {
		if(Core.isObject(window.Config) && Core.isObject(window.Copies)) {
			factory(window.App, window.Copies, window.Config);
		}
	};

	window.App = window.App || {};
	
	(function() {
		if(!Core.isObject(window.Config)) {
			Core.ajax({
				type: 'GET',
				url: '/assets/js/config.json'
			}).success(function(Config) {
				window.Config = Config;

				_ended();
			});
		}

		if(!Core.isObject(window.Copies)) {
			Core.ajax({
				type: 'GET',
				url: '/assets/js/copies.json'
			}).success(function(Copies) {
				window.Copies = Copies;

				_ended();
			});
		}
	})();
})(function(App, Copies, Config) {
	var _forEach = Array.prototype.forEach;
	var _isYoutubeLoad = false;

	var services = {
		EXAMPLE: 'path/to/service'
	};

	var _parseSelects = function(_name, _textdefault, _valueDefault, _data, _value, _text, _valueSelected) {
		var IS_SELECTED = false;

		var response = {
			name: _name,
			options: []
		};

		if(Core.isArray(_data) && Core.isString(_value) && Core.isString(_text)) {
			for(var i = 0, len = _data.length; i < len; i++) {
				//if(Core.hasData(_data[i][_value]) && Core.hasData(_data[i][_text])) {
					var option = {
						text: _data[i][_text],
						value: _data[i][_value]
					};

					if(_valueSelected === _data[i][_value]) {
						response.textSelected = _data[i][_text];
						response.valueSelected = true;
						option.selected = true;

						IS_SELECTED = true;
					}

					response.options.push(option);
				//}
			}
		}

		//if(Core.hasData(_valueDefault) && Core.hasData(_textdefault)) {
			var option = {
				text: _textdefault,
				value: ''
			};

			if(_valueSelected === _valueDefault || !IS_SELECTED) {
				response.textSelected = _textdefault;
				option.selected = true;
			}
			
			response.options.unshift(option);
		//}

		return response;
	};

	var _onlyNumbersCheck = function(e) {
		e = (e) ? e : window.event;
		
		var charCode = (e.which) ? e.which : e.keyCode;

		if(charCode > 31 && (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	};

	var _videoYoutube = function() {
		Core.loadScript('https://www.youtube.com/iframe_api', 'YT_JS');

		window.onYouTubeIframeAPIReady = function() {
			_isYoutubeLoad = true;
		}.bind(this);
	};

	App.models = (function(models) {
		this.service_data = {};

		this.validate = function(data) {
			if(data.length == 0) {
				return true;
			};

			if(Config.debug) {
				for(var i = 0, len = data.length; i < len; i++) {
					for(var ii = 0, llen = data[i].errors.length; ii < llen; ii++) {
						console.error('error_' + data[i].field + '_' + data[i].errors[ii]);
					}
				}
			}
			
			return false;
		};

		this.send = function(service, method, data, fnCallback) {
			Core.ajax({
				type: method,
				url: service,
				data: data
			}, function() {
				//window.location.reload();
			}).success(fnCallback);
		};

		models.example = (function(example) {
			example.fields = {
				name: 'required',
				last_name: 'required'
			};

			example.save = function(req, fnCallback) {
				if(this.validate(Core.validateObject(req, example.fields))) {
					this.send(services.EXAMPLE, 'GET', req, function(data) {
						if(data.estado === 'error') {
							return fnCallback({ success: false, message: 'error_server_save' });
						}

						return fnCallback({ success: true });
					}.bind(this));
				}
			}.bind(this);

			return example;
		}.bind(this))(models.example || {});

		return models;
	}.bind({}))(App.models || {});

	App.middleware = (function(middleware) {
		this.load = function(object, elements, fnEnded) {
			var length = Object.keys(elements).length;
			var loaded = 0;

			for(var el in elements) {
				if(!Core.isFunction(elements[el].fn)) {
					throw el + ' is not function';
				}

				var args = elements[el].args || [];
				args.push(function(data) {
					object[el] = data;

					if(++loaded === length) {
						fnEnded(object);
					}
				});

				elements[el].fn.apply(null, args);
			}
		};

		middleware.example = function(request, fnEnded) {
			this.load(Copies.create, {
				example: {
					fn: App.models.example.get,
					args: [ request ]
				}
			}, fnEnded);
		}.bind(this);

		return middleware;
	}.bind({}))(App.middleware || {});

	App.controller = (function(controller) {
		controller.example = function() {
			App.middleware.example(function(data) {
				var response = [];

				for(var example in data.examples) {
					response.push({
						logo: Core.config.PATH_URL + examples[example].imagen,
						sprite: Core.config.PATH_URL + examples[example].imagen_ritmo
					})
				}

				App.views.example(data);
			});
		};

		return controller;
	}.bind({}))(App.controller || {});

	App.views = (function(views) {
		var _wraperHTML = document.querySelector('#site_section');

		var _setTemplate = function(tmpl, data) {
			if(!Core.isString(tmpl) || !Core.isObject(data)) {
				if(!Core.isString(tmpl)) {
					throw 'Variable "tmpl" is required.';
				} else {
					throw 'Variable "data" is required and must be object';
				}
			}

			try {
				_wraperHTML.innerHTML = Handlebars.templates[tmpl](data);
				_wraperHTML.className = 's__section  s__' + tmpl.toLowerCase();
			} catch(e) {
				throw 'This ' + tmpl + ' template not exist.';
			}
		};

		views.home = function() {
			_setTemplate('home', {});
		};

		views.example = function(data) {
			_setTemplate('home', data);
		};

		return views;
	}.bind({}))(App.views || {});

	(function _init() {
		Core.routes({
			'/': 'App.views.home',
			'/example': 'App.controller.example'
		});
	})();
});