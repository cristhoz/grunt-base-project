
Core.soundManager = function(audios, options) {
	var created = {};
	var playing = {};

	var _play = function(id) {
		_load(id);

		if(sessionStorage.soundDisabled !== 'true') {
			playing[id] = created[id];

			created[id].play();
		}
	};

	var _stop = function(id) {
		if(!playing[id]) { return; }

		playing[id].pause();
		playing[id].currentTime = 0;

		delete playing[id];
	};

	var _remove = function() {
		//todo
	};

	//todo... (mute by id)...
	var _mute = function() {
		if(sessionStorage.soundDisabled !== 'true') {
			sessionStorage.soundDisabled = 'true';

			for(var prop in playing) {
				_stop(prop);
			}
		} else {
			sessionStorage.soundDisabled = 'false';

			for(var prop in created) {
				if(created[prop].loop) {
					console.log(prop);
					_play(prop);
				}
			}
		}
	};

	var _load = function(id) {
		if(!created[id]) {
			created[id] = Core.insertMedia({
				audio: true,
				source: options.path + audios[id].src
			});

			if(audios[id].loop) {
				created[id].loop = true;
			}

			if(audios[id].volume) {
				created[id].volume = audios[id].volume;
			}
		}
	};

	return {
		play: _play,
		stop: _stop,
		remove: _remove,
		load: _load,
		mute: _mute
	};
};