Core.paging = function(options, fnCallback) {
	var wrapper = (Core.isString(options.wrapper)) ? document.querySelector(options.wrapper) : options.wrapper;

	if(!Core.isElementHTML(wrapper)) {
		throw 'this wrapper does not exist';
	}

	if(!Core.isArray(options.data)) {
		throw 'Data must be array';
	}

	var sizeItems = options.sizeItems || 10;
	var sizePages = options.sizePages || 8;
	var page = options.page || 1;
	var length = options.data.length;

	var _getPage = function() {
		var init = ((page - 1) * sizeItems);
		var max = (page * sizeItems);

		var res = [];

		for(var i = init; i < max; i++) {
			if(!options.data[i]) {
				continue;
			}

			res.push(options.data[i]);
		}

		fnCallback(res);

		_navigator();
	};

	var _navigator = function() {
		wrapper.innerHTML = '';

		var init = ((page - 1) * sizeItems);
		var end = (page * sizeItems);

		var $prev, $next;
		
		$prev = document.createElement('a');
		$prev.href = 'javascript://';
		$prev.className = (init == 0) ? 'p_change  is_inactive' : 'p_change  is_active';
		$prev.innerHTML = '<';
		$prev.addEventListener('click', function() {
			if(init != 0) {
				page--;
				_getPage();
			}
		});

		wrapper.appendChild($prev);

		$next = document.createElement('a');
		$next.href = 'javascript://';
		$next.className = (end > length) ? 'p_change  is_inactive' : 'p_change  is_active';
		$next.innerHTML = '>';
		$next.addEventListener('click', function() {
			if(end < length) {
				page++;
				_getPage();
			}
		});

		wrapper.appendChild($next);

		for(var i = 0, len = Math.ceil(length / sizeItems); i < len; i++) {
			(function _pageEvent(index) {
				var $page = document.createElement('a');
				$page.href = 'javascript://';
				$page.className = (page == index + 1) ? 'p_number  is_inactive' : 'p_number  is_active';
				$page.innerHTML = index + 1;
				$page.addEventListener('click', function() {
					page = index + 1;
					_getPage();
				});

				wrapper.insertBefore($page, $next);
			})(i);
		}
	};

	(function _init() {
		Core.cssClass.add(wrapper, 'ui_paging');

		_getPage();
	})();
};