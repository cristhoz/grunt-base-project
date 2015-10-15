Core.personalizeForm = function(form, settings) {
	form = (Core.isString(form)) ? document.querySelector(form) : form;

	if(!Core.isElementHTML(form)) {
		throw 'this form does not exist';
	}

	var selectOne = function(input) {
		var eventClick = new Event('focus');

		var $parent = input.parentNode;
		Core.cssClass.add($parent, 'ui_form_select');

		var $label = document.createElement('a');
		$label.href = 'javascript://';
		$label.className = 'ui_fs_label';
		$label.innerText = input.options[input.selectedIndex].text;
		$label.addEventListener('click', function() {
			var worked = false;

			if(document.createEvent) {
				var e = document.createEvent("MouseEvents");
				e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

				worked = input.dispatchEvent(e);
			} else if(input.fireEvent) {
				worked = input.fireEvent("onmousedown");
			}

			if(!worked) {
				alert("It didn't worked in your browser.");
			}
		});

		input.addEventListener("change", function() {
			$label.innerText = input.options[input.selectedIndex].text;
		});

		$parent.appendChild($label);
	};

	(function _init() {
		for(var i = 0, len = form.length; i < len; i++) {
			switch(form[i].type) {
				case 'select-one':
					selectOne(form[i]);
					break;
			}
			//console.log(form[i].type);
		}
	})();

	return {
		refreshSelect: function(select) {
			select = (Core.isString(select)) ? document.querySelector(select) : select;

			if(!Core.isElementHTML(select)) {
				throw 'this select does not exist';
			}

			var $parent = select.parentNode;

			var $label = $parent.querySelector('.ui_fs_label');
			$label.innerText = select.options[select.selectedIndex].text;
		}
	}
};