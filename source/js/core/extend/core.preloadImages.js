Core.preloadImages = function(fnProgress, fnEnded) {
	var elements = document.body.getElementsByTagName('*');
	var images = [];
	var loaded = 0;

	for(var i = 0, len = elements.length; i < len; i++) {
		if(elements[i].tagName === 'SCRIPT') {
			continue;
		}

		if(elements[i].tagName === 'IMG') {
			images.push(elements[i].src);
			continue;
		}

		if(elements[i].style.backgroundImage && elements[i].style.backgroundImage != '') {
			images.push(elements[i].style.backgroundImage);
			continue;
		}

		var styles = window.getComputedStyle(elements[i]);

		if(styles.backgroundImage && styles.backgroundImage !== '' && styles.backgroundImage !== 'none') {
			var backgrounds = styles.backgroundImage;
			backgrounds = backgrounds.split(',');

			for(var a = 0, lenA = backgrounds.length; a < lenA; a++) {
				if(/http:\/\//.test(backgrounds[a])) {
					var imageName = backgrounds[a].substring(4, backgrounds[a].length - 1);

					if(images.indexOf(imageName) === -1) {
						images.push(imageName);
					}
				}
			}
		}
	}

	images.forEach(function(el) {
		var image = new Image();
		image.src = el;
		image.onload = function() {
			loaded++;

			fnProgress((loaded / images.length) * 100);

			if(loaded === images.length) {
				fnEnded();
			}
		};
	});
};