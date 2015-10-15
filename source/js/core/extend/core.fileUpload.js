/**
 * System for handling file uploads
 * @param  {Object | Element | Object} el       input file is for the event
 * @param  {Object}                    settings adjustments will need to make the file upload
 */
Core.fileUpload = function(el, settings) {
	/*
		___ EXAMPLE SETTINGS ___

		Core.fileUpload({
			services: Core.ROOT_URL + 'Services/UploadImage.php',
			maxSizeUpload: 2,
			acceptMime: ['image/jpeg', 'image/png'],
			handleDrag: '#modal-create',
			trigger: '#trigger-fl-ce',
			headers: {
				'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content
			},
			preview: function(view) {
				return Mustache.to_html(templates.THUMBNAILS_FILE, view);
			},
			progress: function(obj, id) {
				$('#' + id + ' .progress-file').width((obj.fileUploaded * 100) / obj.fileSize + '%');
			},
			error: function(obj) {
				switch(obj.typeError) {
					case 1:
						alert('Not support this file.');
						break;
					case 2:
						alert('Choose up to ten images max 2MB.');
						break;
				}
			},
			success: function(obj, id) {

			}
		});
	*/
	el = (Core.isString(el)) ? document.querySelector(el) : el;

	var $wThumb;
	var fName = (el.name.trim() == '') ? settings.name || 'file' : el.name;
	var files = el.files;
	var filesSize = 0;
	var filesLoaded = {};

	var logic = {
		viewAcceptMime: function(type) {
			if(Core.isArray(settings.acceptMime)) {
				for(var i = 0, len = settings.acceptMime.length; i < len; i++) {
					if(type == settings.acceptMime[i]) {
						return true;
					}
				}

				return false;
			} else {
				return true;
			}
		},
		sizeFile: function(size) {
			return ((size / 1024) / 1024);
		}
	};

	var dragDropFile = function() {
		var $drag = (Core.isString(settings.handleDrag)) ? document.querySelector(settings.handleDrag) : settings.handleDrag;

		document.body.addEventListener('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';

			$drag.removeEventListener('drop', fnDrop, false);
			$drag.addEventListener('drop', fnDrop, false);
		}, false);

		document.body.addEventListener('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
		}, false);

		function fnDrop(e) {
			e.stopPropagation();
			var files = e.target.files || e.dataTransfer.files;

			sendFiles(files);
		}
	};

	var sendFiles = function(files) {
		for(var i = 0, len = files.length; i < len; i++) {
			(function(file) {
				var uniqueID = Core.uniqID();

				if(logic.viewAcceptMime(file.type)) {
					if(logic.sizeFile(file.size) < settings.maxSizeUpload) {
						if(Core.isFunction(settings.preview)) {
							var reader = new FileReader();
							reader.readAsDataURL(file);

							reader.addEventListener('load', function(e) {
								var pic = e.target;

								var response = {
									id: uniqueID,
									dataImage: pic.result,
									nameImage: file.name
								};

								settings.preview(response);
							});
						}

						var formdata = new FormData();
						formdata.append(fName, file);

						var xhr = new XMLHttpRequest();

						xhr.upload.addEventListener('progress', function(e) {
							settings.progress({
								filePorcent: Math.round(e.loaded / e.total) * 100,
								fileSize: e.total,
								fileUploaded: e.loaded,
								allFilesPorcent: 0,
								allFilesSize: 0,
								allFilesUploaded: 0
							}, uniqueID);
						}, false);

						xhr.addEventListener('load', function(e) {
							settings.success(JSON.parse(e.target.response), uniqueID);
						}, false);

						xhr.open('POST', settings.services);

						if(Core.isObject(settings.headers)) {
							for(var prop in settings.headers) {
								xhr.setRequestHeader(prop, settings.headers[prop]);
							}
						}

						xhr.send(formdata);
					} else {
						settings.error({typeError: 2, message: 'This file is greater than ' + settings.maxSizeUpload + 'MB.'});
					}
				} else {
					settings.error({typeError: 1, message: 'Not support this file.'});
				}
			})(files[i]);
		}
	};

	(function init() {
		if(Core.isString(settings.handleDrag) || Core.isElementHTML(settings.handleDrag)) {
			dragDropFile();
		}

		if(Core.isString(settings.outputList)) {
			$wThumb = $(settings.outputList);
		}

		if(Core.isString(settings.trigger) || Core.isElementHTML(settings.trigger)) {
			$trigger = (Core.isString(settings.trigger)) ? document.querySelector(settings.trigger) : settings.trigger;

			$trigger.addEventListener('click', function() {
				el.click();
			});
		}

		el.addEventListener('change', function() {
			sendFiles(el.files);
		});
	})();
};
