Core.gotoScroll = function(elList, fnChanged) {
	if(!Core.isNodeList(elList)) {
		throw 'Element must be type NodeList';
	}

	Core.forEach(elList, function(el, i, ar) {
		var href = el.href;
		href = href.substring(href.indexOf('#'), href.length);

		if(!/^#[\w-]+$/.test(href)) {
			return;
		}

		var idElement = document.querySelector(href);

		if(!Core.isElementHTML(idElement)) {
			Console.error('This element not exists');
			return;
		}

		el.addEventListener('click', function(e) {
			e.preventDefault();

			if(Core.HAS_HISTORY) {
				history.replaceState({}, '', el.href);
			}

			Core.scrollTo(Core.offset(idElement).top, 500);

			if(Core.isFunction(fnChanged)) {
				fnChanged();
			}
		});
	});
};