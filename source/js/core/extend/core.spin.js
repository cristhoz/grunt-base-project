Core.spinLoader = function() {
	var opts = {
		lines: 13,
		length: 40,
		width: 8,
		radius: 36,
		scale: 0.25,
		corners: 1,
		color: '#fff',
		opacity: 0.25,
		rotate: 24,
		direction: 1,
		speed: 1.2,
		trail: 60,
		fps: 20,
		zIndex: 2e9,
		top: '50%',
		left: '50%',
		shadow: true,
		hwaccel: false,
		position: 'absolute'
	};

	var target = document.querySelector('#spin_loader');
	var loader = document.querySelector('#site_loader');

	var spinner = new Spinner(opts).spin(target);

	Core.fadeIn(loader);

	return {
		stop: function() {
			spinner.stop();
			
			Core.fadeOut(loader);
		}
	}
};