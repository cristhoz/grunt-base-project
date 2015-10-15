Core.calendar = function(input, options, selected) {
	input = (Core.isString(input)) ? document.querySelector(input) : input;

	if(!Core.isElementHTML(input)) {
		throw 'this input does not exist';
	}

	var _currentDate = new Date();
	var _currentDay = _currentDate.getDate();
	var _currentMonth = _currentDate.getMonth();
	var _currentYear = _currentDate.getFullYear();

	var _activeDate = _currentDate;

	var _selectDate = _currentDate;
	var _selectDay = _selectDate.getDate();
	var _selectMonth = _selectDate.getMonth();
	var _selectYear = _selectDate.getFullYear();

	var _options = {
		change_month: false,
		change_year: false,
		label_days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		label_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		rank_year: _currentDate.getFullYear() + ':' + (_currentDate.getFullYear() - 100),
		days_blocks: [],
		min_date: null,
		max_date: null,
		get_holidays: null,
		data_put: null,
		active_date: null
	};

	var w_cal;

	var isOpen = false;
	var idEventESC;

	var id_calendar = 'autocomplete_' + Core.uniqID();

	var _config = function() {
		for(var option in options) {
			if(_options.hasOwnProperty(option)) {
				switch(option) {
					case 'min_date':
					case 'max_date':
						if(Core.isDate(options[option])) {
							_options[option] = {
								year: options[option].getFullYear(),
								month: options[option].getMonth(),
								day: options[option].getDate(),
								instance: options[option]
							};

							if(option === 'max_date') {
								if(!_options.active_date) {
									_activeDate = options[option];
								}
								
								_options.rank_year = options[option].getFullYear() + ':' + (_currentDate.getFullYear() - 100);
							}  
						} else {
							throw option + ': date instance JavaScript is accepted only';
						}
						break;
					case 'change_month':
					case 'change_year':
						if(Core.isBoolean(options[option])) {
							_options[option] = options[option];
						} else {
							throw  option + ': boolean is accepted only';
						}
						break;
					case 'label_days':
					case 'label_months':
					case 'days_blocks':
						if(Core.isArray(options[option])) {
							_options[option] = options[option];
						} else {
							throw  option + ': array is accepted only';
						}
						break;
					case 'get_holidays':
					case 'data_put':
						if(Core.isFunction(options[option])) {
							_options[option] = options[option];
						} else {
							throw  option + ': function is accepted only';
						}
						break;
					case 'active_date':
						if(Core.isDate(options[option])) {
							_options.active_date = options[option];
							_activeDate = _options.active_date;
						} else {
							throw option + ': date instance JavaScript is accepted only';
						}
				}
			} else {
				throw 'This parameter "' + option + '" does not exist.';
			}
		}
	};

	var _getDayInMonths = function(month, year) {
		var days_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var date = days_month[month];

		if(month == 1) {
			if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
				date = 29;
			}
		}

		return date;
	};

	var _getFirstDayMonth = function(month, year) {
		return new Date(year, month, 1).getDay();
	};

	var _create = function(blockDays) {
		var a_day = _activeDate.getDate();
		var a_month = _activeDate.getMonth();
		var a_year = _activeDate.getFullYear();

		var holidays = (Core.isFunction(_options.get_holidays)) ? _options.get_holidays(a_year, a_month) : [];

		var monthLength = _getDayInMonths(a_month, a_year);
		var firstDay = _getFirstDayMonth(a_month, a_year);
		var calendar = {
			next_month: true,
			prev_month: true
		};

		var _headCalendar = function() {
			//Years
			if(_options.change_year) {
				calendar.year = [];

				var between = _options.rank_year.split(':');
				var max = Math.max(between[0], between[1]);

				between = Math.abs(between[0] - between[1]);

				for(var y = 0; y < between; y++) {
					calendar.year.push({
						year: max - y,
						value: max - y,
						is_active: (max - y) === a_year
					});
				}
			} else {
				calendar.year = a_year;
			}
			
			//Months
			if(_options.change_month) {
				calendar.month = [];

				for(var m = 0; m < 12; m++) {
					if(!!_options.min_date) {
						if(a_year == _options.min_date.year && m == _options.min_date.month) {
							continue;
						}
					}

					if(!!_options.max_date) {
						if(a_year == _options.max_date.year && m > _options.max_date.month) {
							break;
						}
					}

					calendar.month.push({
						month: _options.label_months[m],
						value: m,
						is_active: m === a_month
					});
				}
			} else {
				calendar.month = _options.label_months[a_month];
			}
		};

		var _bodyCalendar = function() {
			var forDay = 0;
			var forWeek = [];

			calendar.day = [];

			//Calc fisrt day;
			for(var d = 0; d < 7; d++) {
				if(firstDay === forDay) {
					break;
				}

				forDay++;

				forWeek.push({ day: '' });
			}

			for(var l = 0; l < monthLength; l++) {
				if(forDay >= 7) {
					calendar.day.push(forWeek);
					forWeek = [];
					forDay = 0;
				}

				forDay++;

				var is_restricted = false;

				if(!!_options.min_date) {
					is_restricted = (l + 1) < _options.min_date.day && a_month == _options.min_date.month && a_year == _options.min_date.year;

					calendar.prev_month = !is_restricted && calendar.prev_month;
				}

				if(!!_options.max_date) {
					is_restricted = (l + 1) > _options.max_date.day && a_month == _options.max_date.month && a_year == _options.max_date.year;

					calendar.next_month = !is_restricted && calendar.next_month;
				}

				forWeek.push({
					day: l + 1,
					value: l + 1,
					is_holiday: holidays.indexOf(l + 1) >= 0,
					is_sunday: ((firstDay + (l + 1)) % 7) === 1,
					not_restricted: !is_restricted,
					is_current: (l + 1) == _currentDay && _currentMonth == a_month && _currentYear == a_year,
					is_active: (l + 1) == _selectDay && _selectMonth == a_month && _selectYear == a_year,
					is_full: true
				});

				if(l == monthLength - 1) {
					calendar.day.push(forWeek);
				};
			}
		};

		(function _init() {
			_headCalendar();
			_bodyCalendar();
		})();

		return calendar;
	};

	var _insert = function() {
		input.addEventListener('focus', function(e) {
			var computed = window.getComputedStyle(input);
			var offset = Core.offset(input);
			var top = (parseInt(computed.height) - parseInt(computed.borderBottomWidth)) + (offset.top - parseInt(computed.borderTopWidth));

			if(!Core.isElementHTML(w_cal)) {
				w_cal = document.createElement('div');
				w_cal.setAttribute('id', id_calendar);
				w_cal.setAttribute('class', 'ui_calendar');
				w_cal.style.display = 'none';
				w_cal.style.top = top + 'px';
				w_cal.style.left =  offset.left + 'px';

				document.body.appendChild(w_cal);

				_putHTML();
				_event();
			} else {
				w_cal.style.top = top + 'px';
				w_cal.style.left =  offset.left + 'px';
			}
		});
	};

	var _putHTML = function() {
		if(Core.isFunction(_options.data_put)) {
			_options.data_put(_activeDate.getFullYear(), _activeDate.getMonth(), function(data) {
				var blockDays = _options.days_blocks;

				var view = _create(blockDays);
				view.options = _options;

				w_cal.innerHTML = Handlebars.templates.ui_core_calendar(view);
			});
		} else {
			var view = _create(_options.days_blocks);
			view.options = _options;

			w_cal.innerHTML = Handlebars.templates.ui_core_calendar(view);
		}
	};

	var _nextMonth = function() {
		_activeDate = new Date(_activeDate.getFullYear(), _activeDate.getMonth() + 1);

		_putHTML();
	};

	var _prevMonth = function() {
		_activeDate = new Date(_activeDate.getFullYear(), _activeDate.getMonth() - 1);

		_putHTML();
	};

	var _onChange = function(year, month) {
		if(!!_options.min_date || !!_options.max_date) {
			if(!!_options.min_date) {
				if(month < _options.min_date.month && year <= _options.min_date.year) {
					_activeDate = new Date(_options.min_date.year, _options.min_date.month);
					
					return _putHTML();
				}
			}

			if(!!_options.max_date) {
				if(month > _options.max_date.month && year >= _options.max_date.year) {
					_activeDate = new Date(_options.max_date.year, _options.max_date.month);

					return _putHTML();
				}
			}
		}
		_activeDate = new Date(year, month);

		_putHTML();
	};

	var _select = function(year, month, day) {
		_selectDate = new Date(year || _activeDate.getFullYear(), month || _activeDate.getMonth(), day || _activeDate.getDate());
		_selectDay = _selectDate.getDate();
		_selectMonth = _selectDate.getMonth();
		_selectYear = _selectDate.getFullYear();

		input.value = _selectYear + '-' + Core.leadZero(_selectMonth + 1, 2) + '-' + Core.leadZero(_selectDay, 2);

		if(Core.isFunction(selected)) {
			selected({
				value: _selectYear + '-' + Core.leadZero(_selectMonth + 1, 2) + '-' + Core.leadZero(_selectDay, 2)
			})
		}

		_close();
	};

	var _open = function() {
		if(!isOpen) {
			isOpen = true;

			Core.setOnEvent('ESC', idEventESC);
			document.body.addEventListener('click', _close);

			w_cal.style.display = 'block';

		}
	};

	var _close = function() {
		if(isOpen) {
			isOpen = false;

			Core.setOffEvent('ESC', idEventESC);
			document.body.removeEventListener('click', _close);

			w_cal.style.display = 'none';
		}
	};

	var _event = function() {
		w_cal.addEventListener('click', function(e) {
			e.stopPropagation();
			e.preventDefault();

			if(Core.hasMatchedElement(e.target, 'a.js__next_month')) {
				return _nextMonth();
			};

			if(Core.hasMatchedElement(e.target, 'a.js__prev_month')) {
				return _prevMonth();
			};

			if(Core.hasMatchedElement(e.target, 'a.js__select_date')) {
				Core.cssClass.remove(w_cal.querySelector('.is_active'), 'is_active');
				Core.cssClass.add(Core.parents(e.target, 'td'), 'is_active');

				return _select(null, null, Core.data.get(e.target, 'value'));
			};
		}, true);

		w_cal.addEventListener('change', function(e) {
			e.stopPropagation();
			e.preventDefault();

			if(Core.cssClass.has(e.target, 'js__change_year')) {
				_onChange(e.target.value, _activeDate.getMonth());
			} else if(Core.cssClass.has(e.target, 'js__change_month')) {
				_onChange(_activeDate.getFullYear(), e.target.value);
			}
		});

		input.addEventListener('keydown', function(e) {
			e.preventDefault();
		});

		input.addEventListener('click', function(e) {
			e.stopPropagation();

			_open();
		});

		idEventESC = Core.setEventsESC(function() {
			_close();
		});
		Core.setOffEvent('ESC', idEventESC);
	};

	(function _init() {
		input.autocomplete = 'off';

		_config();
		_insert();
	})();

	return {
		nextMonth: _nextMonth,
		prevMonth: _prevMonth,
		open: _open,
		close: _close
	};
};