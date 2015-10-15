/**
 * Create media audio and video html5 in JavaScript
 * @param  {HTMLElement} el      DOM element where the content is inserted
 * @param  {Object}      options options required for configure media
 * @return {HTMLElement          return data DOM media
 */
Core.insertMedia = function(options) {
	if(!Core.isObject(options)) {
		throw 'Options must be type object and is required';
	}

	var media = (!!options.audio) ? document.createElement('audio') : document.createElement('video');
	media.preload = true;

	var source = document.createElement('source');

	media.appendChild(source);

	if(!!options.audio) {
		if(Core.isFunction(media.canPlayType)) {
			//Verifed support in audio/mpeg and audio/ogg
			if(media.canPlayType('audio/mpeg; codecs="mp3"') != '') {
				source.src = options.source + '.mp3';
				source.type = 'audio/mpeg; codecs="mp3"';
			} else if(media.canPlayType('audio/ogg; codecs="vorbis"')  != '') {
				source.src = options.source + '.ogg';
				source.type = 'audio/ogg; codecs="vorbis"';
			} else {
				console.error('Not supported audio/mpeg and audio/ogg');
			}
		} else {
			console.error('Not supported Audio hmtl5');
		}
	} else {
		if(Core.isFunction(media.canPlayType)) {
			//Verifed support in video/mp4 and video/ogg
			if(media.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') != '') {
				source.src = options.source + '.mp4';
				source.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
			} else if(media.canPlayType('video/ogg; codecs="theora, vorbis"')  != '') {
				source.src = options.source + '.ogv';
				source.type = 'video/ogg; codecs="theora, vorbis"';
			} else {
				console.error('Not supported video/mp4 and video/ogg');
			}
		} else {
			console.error('Not supported Video hmtl5');
		}
	}

	return media;
};