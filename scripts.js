"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(function () {
	/* ----------------------------------------------------- МЕНЮ ----------------------------------------------------- */
	function addScrollMenu(bodyElement, headerElement)
	{
		var headerHeightValue = headerElement.height();
		if (window.innerHeight > headerHeightValue)
		{
			bodyElement.removeClass('overflow');
		} else {
			bodyElement.addClass('overflow');
		}
	}
	$(document).on('click', function(event)
	{
		var pullElements = $('[data-pull]');
		var menuElement = $('#menu');
		if (pullElements.is(event.target) || pullElements.has(event.target).length !== 0)
		{
			event.preventDefault();
			var bodyElement = $('body');
			var headerElement = $('#header');
			pullElements.toggleClass('opened');
			menuElement.slideToggle(0, function() {
				if (pullElements.hasClass('opened'))
				{
					$.fancybox.close();
				}
			});
			if (window.innerWidth > 989)
			{
				addScrollMenu(bodyElement, headerElement);
			} else {
				bodyElement.toggleClass('overflow');
			}
		} else {
			if (!menuElement.is(event.target) && menuElement.has(event.target).length === 0)
			{
				pullElements.removeClass('opened');
				menuElement.slideUp(0);
				$('body').removeClass('overflow');
			}
		}
	});
	$(window).bind('resize', function() {
		var bodyElement = $('body');
		var headerElement = $('#header');
		if (window.innerWidth > 989)
		{
			addScrollMenu(bodyElement, headerElement);
		} else {
			if ($('[data-pull]').hasClass('opened'))
			{
				bodyElement.addClass('overflow');
			} else {
				bodyElement.removeClass('overflow');
			}
		}
	});
	/* ------------------------------------- ПЕРЕКЛЮЧЕНИЕ ПУНКТОВ ДЕСКТОПНОГО МЕНЮ ------------------------------------ */
	$('#desktop-menu').each(function() {
		var bodyElement = $('body');
		var headerElement = $('#header');
		$(this).easytabs({
			animate: false,
			updateHash: false
		}).bind('easytabs:after', function() {
			addScrollMenu(bodyElement, headerElement);
		});
	});
	/* ------------------------------------- ПЕРЕКЛЮЧЕНИЕ ПУНКТОВ МОБИЛЬНОГО МЕНЮ ------------------------------------- */
	$('.menu__mobile-link, .menu__mobile-heading').on('click', function(event) {
		var dataIdValue = $(this).attr('data-id');
		if (dataIdValue)
		{
			event.preventDefault();
			var currentLink = $(this);
			var parentContainer = currentLink.closest('.menu__mobile-bar');
			var comboBox = $('#menu #' + dataIdValue);
			var parentContainerComboBox = comboBox.closest('.menu__mobile-bar');
			var parentComboBox = currentLink.closest('.menu__mobile-list');
			parentContainerComboBox.show(0, function() {
				parentContainer.css('visibility', 'hidden');
				if (currentLink.hasClass('menu__mobile-link'))
				{
					comboBox.show(0);
					parentContainer.animate({
						marginLeft: '-100%'
					}, 200, function() {
						parentContainer.hide(0).css('visibility', 'visible');
					});
				} else {
					if (currentLink.hasClass('menu__mobile-heading'))
					{
						parentComboBox.hide(0);
						parentContainerComboBox.animate({
							marginLeft: '0'
						}, 200, function () {
							parentContainer.hide(0).css('visibility', 'visible');
						});
					}
				}
			});
		}
	});
	/* ------------------------------------------------------ ЧАТ ----------------------------------------------------- */
	$('#chat-collapse').on('click', function() {
		$('#chat-popup').toggleClass('rolled-up');
	});
	$(document).on('click', function(event) {
		var chatPopup = $('#chat-popup');
		var chatCloseButton = $('#chat-close');
		if (chatPopup.hasClass('visible'))
		{
			if (!chatPopup.is(event.target) && chatPopup.has(event.target).length === 0 || chatCloseButton.is(event.target) || chatCloseButton.has(event.target).length !== 0)
			{
				chatPopup.removeClass('visible');
				setTimeout(function() {
					chatPopup.fadeOut(0, function() {
						$(this).removeClass('rolled-up');
					});
				}, 100);
			}
		}
	});
	$('[data-chat-open]').on('click', function(event) {
		event.preventDefault();
		$.fancybox.close();
		var chatPopup = $('#chat-popup');
		if (!chatPopup.hasClass('visible'))
		{
			chatPopup.fadeIn(0, function() {
				$('#chat-info').scrollTop($('#chat-messages')[0].scrollHeight);
				setTimeout(function() {
					chatPopup.addClass('visible');
				}, 100);
			});
		}
	});
	$('[data-close-form]').on('click', function(event) {
		event.preventDefault();
		$('#chat-form').hide(0);
	});
	/* ------------------------------------- ПЕРЕКЛЮЧЕНИЕ ВИДИМОСТИ КНОПКИ НАВЕРХ ------------------------------------- */
	$(window).bind('load scroll', function() {
		var buttonUpElement = $('#button-up');
		if ($(document).scrollTop() > 50)
		{
			buttonUpElement.addClass('visible');
		} else {
			buttonUpElement.removeClass('visible');
		}
	});
	/* ------------------------------------------- СКРОЛЛИНГ СТРАНИЦЫ НАВЕРХ ------------------------------------------ */
	$('#button-up').on('click', function() {
		$('html, body').stop(true, true).animate({
			scrollTop: 0
		}, 400);
	});
	/* -------------------------------------------- ВЫПАДАЮЩЕЕ МЕНЮ ЯЗЫКОВ -------------------------------------------- */
	$(document).on('click', function (event) {
		var languageElement = $('#language');
		if (languageElement.is(event.target) || languageElement.has(event.target).length !== 0)
		{
			languageElement.toggleClass('active');
		} else {
			if (languageElement.hasClass('active'))
			{
				languageElement.removeClass('active');
			}
		}
	});
	/* ------------------------------------------- ИЗМЕНЕНИЕ ПОЛЯ КОЛИЧЕСТВА ------------------------------------------ */
	$('[data-count]').bind('input', function() {
		var currentField = $(this);
		if (currentField.val().match(/[^0-9]/g))
		{
			currentField.val(currentField.val().replace(/[^0-9]/g, ''));
		}
		if (currentField.val() > parseInt(currentField.attr('max')))
		{
			currentField.val(currentField.attr('max'));
		}
	});
	$('[data-count]').bind('blur', function() {
		var currentField = $(this);
		if (!parseInt(currentField.val()))
		{
			currentField.val(currentField.attr('min'));
		}
	});
	$('[data-button]').on('click', function() {
		var currentButton = $(this);
		var parentContainer = currentButton.parent();
		var currentField = parentContainer.find('[data-count]');
		var fieldMin = parseInt(currentField.attr('min'));
		var fieldMax = parseInt(currentField.attr('max'));
		var fieldValue = parseInt(currentField.val());
		if (currentField.length)
		{
			if (currentButton.attr('data-button') === 'minus' && fieldValue > fieldMin)
			{
				fieldValue--;
			} else if (currentButton.attr('data-button') === 'plus' && fieldValue < fieldMax) {
				fieldValue++;
			} else if (!fieldValue) {
				fieldValue = fieldMin;
			}
			currentField.val(fieldValue);
		}
	});
	/* -------------------------------------- ПЛАВАЮЩЕЕ ДОПОЛНИТЕЛЬНОЕ МЕНЮ САЙТА ------------------------------------- */
	var lastScrollTop = 0;
	$(window).bind('scroll', function() {
		var currentScrollPosition = $(this).scrollTop();
		var subNavElement = $('#sub-nav');
		if (currentScrollPosition > 100)
		{
			if (currentScrollPosition < lastScrollTop)
			{
				subNavElement.removeAttr('style').removeClass('sub-nav_no-fixed');
			} else if (currentScrollPosition > lastScrollTop) {
				subNavElement.css('top', '-100px');
			}
		} else if (currentScrollPosition == 0) {
			subNavElement.removeAttr('style').addClass('sub-nav_no-fixed');
		}
		lastScrollTop = currentScrollPosition;
	});
	/* --------------------------------------------- ПОЛЯ ЗАГРУЗКИ ФАЙЛОВ --------------------------------------------- */
	$('.form-file__field, .chat__button-upload, .detail-content__review-upload-icon-block').on('click', function() {
		var parentContainer = $(this).parent();
		parentContainer.find('[type=file]').click();
	});
	var listFiles = {};
	/* В listFiles добавляются загружаемые файлы из всех файловых полей на странице, 
	для каждого поля создается свой объект ключом которого является название из атрибута "name" фалового поля */
	if (navigator.userAgent.search(/rv:11.0/) == -1 && navigator.userAgent.search(/MSIE/) == -1)
	{
		$('.form-file [type=file]').each(function() {
			var thisName = $(this).attr('name').replace('[]', '');
			if ($(this).prop('multiple'))
			{
				$(this).attr('name', thisName + '[]');
			} else {
				$(this).attr('name', thisName);
			}
			var thisName = thisName + '_items';
			if (!$('input[type=hidden][name=' + thisName + ']').length)
			{
				$(this).parent().append($('<input/>', {
					'type': 'hidden',
					'name':  thisName
				}));
			}
		});
		$('.form-file__list .form-file__item').each(function() {
			var fieldName = '';
			fieldName = $('[type=file]', $(this).closest('.form-file')).attr('name');
			listFiles[fieldName] = listFiles[fieldName] || {};
			var thisFile = {
				'lastModified': $(this).data('modified'),
				'name': $('.form-file__item-name', this).text().trim(),
				'size': $(this).data('size'),
				'temporary': $(this).data('key'),
				'type': $(this).data('type'),
				'uid': $(this).attr('id')
			};
			listFiles[fieldName][thisFile.uid] = thisFile;
			$('.form-file__item-delete-block', this).on('click', function() {
				removeFiles($(this), fieldName, thisFile.uid);
				delete listFiles[fieldName][thisFile.uid];
				setTempFilesValue();
			});
			console.log(listFiles);
		});
		$('.form-file [type=file]').on('change', function(event) {
			var parentContainer = $(this).closest('.form-file');
			var containerListFiles = parentContainer.find('.form-file__list');
			var elementsListFiles = containerListFiles.find('.form-file__item');
			var typesLoadFiles = getMimeTypes(event.target);
			var sizeFiles = parseInt($(this).attr('data-size'));
			var textError = '';
			listFiles[event.target.name] = listFiles[event.target.name] || {};
			if (!sizeFiles || sizeFiles <= 0)
			{
				sizeFiles = 1048576;
			}
			$('.form-file__item', containerListFiles).each(function() {
				if ($('.form-string__error-text', this).length)
				{
					$(this).remove();
				}
			});
			var _iterator = _createForOfIteratorHelper(event.target.files), _step;
			try {
				for (_iterator.s(); !(_step = _iterator.n()).done;)
				{
					var file = _step.value;
					if (typesLoadFiles.indexOf(file.type) !== -1 && file.size <= sizeFiles)
					{
						file.uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
							var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
							return v.toString(16);
						});
						listFiles[event.target.name][file.uid] = file;
						var colorIcon = getColorIcon(file);
						generateFrame(event.target.name, containerListFiles, file, listFiles, colorIcon);
					} else if (file.size > sizeFiles) {
						textError += 'Размер файла ' + file.name + ' больше разрешенного <br>';
					} else if (typesLoadFiles.indexOf(file.type) === -1) {
						textError += 'Запрещенный формат файла ' + file.name + ' <br>';
					}
				}
			} catch (err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
			if (textError)
			{
				generateErrorFrame(containerListFiles, textError);
			}
			console.log(listFiles);
			$(this).val('');
		});
	}
	function getMimeTypes(fileField)
	{
		var listTypes = fileField.accept;
		var arrTypes = null;
		if (listTypes)
		{
			arrTypes = listTypes.split(',');
		} else {
			arrTypes = [
				'application/pdf',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'application/vnd.oasis.opendocument.text',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'image/jpeg',
				'image/png',
				'image/tiff',
				'text/plain'
			];
		}
		return arrTypes;
	}
	function getColorIcon(file)
	{
		var colorIcon = 'grey';
		
		switch (file.type)
		{
			case 'application/pdf':
				colorIcon = 'red';
				break;
			case 'application/msword':
			case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			case 'application/vnd.oasis.opendocument.text':
				colorIcon = 'blue';
				break;
			case 'application/vnd.ms-excel':
			case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				colorIcon = 'green';
				break;
			default:
				colorIcon = 'grey';
		}
		return colorIcon;
	}
	function generateFrame(nameField, containerListFiles, file, listFiles, colorIcon)
	{
		var itemId = file.uid;
		var iconContainer = $('<div/>', {
			'class': 'form-file__item-img-block'
		});
		var loaderProgress = $('<div/>', {
			'class': 'form-file__item-loader-progress'
		});
		loaderProgress.append($('<div/>', {
			'class': 'form-file__item-loader-status'
		}));
		var symbolPosition = file.name.lastIndexOf('.') + 1;
		var iconItem = $('<div/>', {
			'class': 'form-file__item-icon',
			'data-color': colorIcon,
			'data-text': file.name.slice(symbolPosition)
		});
		iconItem.append(loaderProgress);
		iconContainer.append(iconItem);
		var nameContainer = $('<div/>', {
			'class': 'form-file__item-name',
			'text': file.name
		});
		var deleteContainer = $('<div/>', {
			'class': 'form-file__item-delete-block'
		}).append($('<div/>', {
			'class': 'form-file__item-delete-button',
			'data-file': file.uid,
			click: function click() {
				removeFiles($(this), nameField, file.uid);
				delete listFiles[nameField][file.uid];
				setTempFilesValue();
			}
		}));
		var containerFile = $('<div/>', {
			'class': 'form-file__item',
			'id': itemId
		});
		containerFile.append(iconContainer).append(nameContainer).append(deleteContainer);
		containerListFiles.append(containerFile);
		uploadFile(nameField, file);
	}
	function generateErrorFrame(containerListFiles, textError)
	{
		var containerFile = $('<div/>', {
			'class': 'form-file__item'
		}).append($('<div/>', {
			'class': 'form-string__error-text',
			'html': textError
		}));
		containerListFiles.prepend(containerFile);
	}
	function removeFiles(eventButton, fieldName = '', fileUid = '')
	{
		var parentContainer = eventButton.closest('.form-file__item');
		if (listFiles[fieldName][fileUid])
		{
			if (listFiles[fieldName][fileUid]['temporary'])
			{
				$.ajax({
					url: '/bitrix/templates/eldirect/ajax/upload.php',
					method: 'POST',
					async: true,
					data: {
						'ajaxPost': 'y',
						'remove': 'y',
						'uid': fileUid,
						'key': listFiles[fieldName][fileUid]['temporary']
					},
					dataType: 'json',
					success: function(result) {
					}
				});
			}
		}
		parentContainer.remove();
	}
	function uploadFile(nameField, file)
	{
		var fileReader = new FileReader();
		fileReader.onload = function(theFile) {
			$.ajax({
				url: '/bitrix/templates/eldirect/ajax/upload.php',
				method: 'POST',
				async: true,
				data: {
					'ajaxPost': 'y',
					'base64Encode': 'y',
					'fileField': nameField,
					'fileInfo': {
						'name': file.name,
						'size': file.size,
						'type': file.type,
						'uid': file.uid
					},
					'fileData': theFile.target.result,
					'previewSize': {
						'width': 35,
						'height': 35
					}
				},
				dataType: 'json',
				xhr: function() {
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener('progress', function(event) {
						if(event.lengthComputable) {
							var percentComplete = Math.ceil(event.loaded / event.total * 100);
							var fileObject = $('#' + file.uid);
							$('.form-file__item-loader-status', fileObject).css({
								'width': percentComplete + '%'
							});
						}
					}, false);
					return xhr;
				},
				success: function(result)
				{
					for (key in result)
					{
						var isKeysExists = false;
						var inputFieldName = "";
						var inputFileName = "";
						if (result[key]['field'] && result[key]['file'])
						{
							var isKeysField = false;
							if (result[key]['field']['name'] && result[key]['field']['multiple'])
							{
								isKeysField = true;
							}
							var isKeysFile = false;
							if (result[key]['file']['name'] && result[key]['file']['uid'])
							{
								if (result[key]['file']['name']['original'] && result[key]['file']['name']['temporary'])
								{
									isKeysFile = true;
								}
							}
							if (isKeysField && isKeysFile)
							{
								inputFieldName = result[key]['field']['name'] + (result[key]['field']['multiple'] ? '[]' : '');
								inputFileUid = result[key]['file']['uid'];
								if (listFiles[inputFieldName])
								{
									if (listFiles[inputFieldName][inputFileUid])
									{
										isKeysExists = true;
									}
								}
							}
						}
						if (isKeysExists)
						{
							listFiles[inputFieldName][inputFileUid]['temporary'] = result[key]['file']['name']['temporary'];
							var iconObject = $('#' + key + ' .form-file__item-icon');
							var colorClass = 'form-file__item-icon_' + $(iconObject).data("color");
							var iconText = $(iconObject).data("text");
							$('.form-file__item-loader-progress', iconObject).remove();
							$('#' + key).data('temporary', result[key]['file']['name']['temporary']);
							var isImagePreview = false;
							if (result[key]['preview'])
							{
								if (result[key]['preview']['path'])
								{
									isImagePreview = true;
									$(iconObject).attr('class', 'form-file__item-img').css('backgroundImage', 'url(' + result[key]['preview']['path'] + ')');
								}
							}
							if (!isImagePreview)
							{
								$(iconObject).addClass(colorClass).text(iconText);
							}
							setTempFilesValue();
						}
					}
				}
			});
		};
		fileReader.readAsDataURL(file);
	}
	function setTempFilesValue()
	{
		$('.form-file [type=file]').each(function() {
			var keyName = $(this).attr('name');
			var fieldName = keyName.replace('[]', '') + '_items';
			var arValue = [];
			if (listFiles[keyName])
			{
				for (key in listFiles[keyName])
				{
					if (listFiles[keyName][key]['temporary'])
					{
						arValue.push(listFiles[keyName][key]['temporary']);
					}
				}
			}
			$('input[name=' + fieldName + ']').val(arValue.join(';'));
		});
	}
	/* ---------------------------------------- ВЫПАДАЮЩЕЕ МЕНЮ ХЛЕБНЫХ КРОШЕК ---------------------------------------- */
	$('.breadcrumbs__container').hover(function() {
		var currentElement = $(this);
		var bradcrumbsSubNav = currentElement.find('.breadcrumbs__sub-links');
		if (bradcrumbsSubNav.length)
		{
			var coordsX = currentElement.offset().left;
			var coordsY = currentElement.offset().top + currentElement.innerHeight();
			var wrapperWidth = $('#wrapper').innerWidth();
			var subNavPositionRight = coordsX + bradcrumbsSubNav.innerWidth();
			bradcrumbsSubNav.css({
				'top': coordsY + 'px'
			});
			if (subNavPositionRight >= wrapperWidth)
			{
				bradcrumbsSubNav.css({
					'left': 'auto',
					'right': wrapperWidth - (coordsX + currentElement.innerWidth()) + 'px'
				});
				bradcrumbsSubNav.addClass('breadcrumbs__sub-links_right');
			} else {
				bradcrumbsSubNav.css({
					'left': coordsX + 'px',
					'right': 'auto'
				});
				bradcrumbsSubNav.removeClass('breadcrumbs__sub-links_right');
			}
		}
	}, function() {
		$('.breadcrumbs__sub-links').removeClass('breadcrumbs__sub-links_right').removeAttr('style');
	});
	/* --------------------------------------- ОЧИСТКА ПОЛЕЙ СЛАИДЕРА В ФИЛЬТРЕ --------------------------------------- */
	$('#filter-reset').on('click', function() {
		var rangeSlides = $('#filter').find('.range-slider');
		rangeSlides.each(function() {
			var instanceSlider = $(this).data('ionRangeSlider');
			instanceSlider.reset();
		});
	});
	/* ------------------------------------- ПЕРЕКЛЮЧЕНИЕ ВИДИМОСТИ СЕКЦИЙ ФИЛЬТРА ------------------------------------ */
	$('.filter__section-heading').on('click', function() {
		var currentElementHeading = $(this);
		var sectionContainer = currentElementHeading.closest('.filter__section');
		var sectionContent = sectionContainer.find('.filter__section-content');
		if (sectionContent.length)
		{
			if (sectionContainer.hasClass('active'))
			{
				sectionContent.stop(true, true).slideUp(200, function() {
					sectionContainer.removeClass('active');
				});
			} else {
				sectionContent.stop(true, true).slideDown(200, function() {
					sectionContainer.addClass('active');
				});
			}
		}
	});
	/* ---------------------------- ПЕРЕКЛЮЧЕНИЕ ВИДИМОСТИ ФИЛЬТРА НА МОБИЛЬНЫХ УСТРОЙСТВАХ --------------------------- */
	$('#filter-button-show').on('click', function() {
		if (window.innerWidth < 990)
		{
			$('#filter').stop(true, true).slideToggle(200);
		}
	});
	$(window).bind('load resize', function() {
		if (window.innerWidth > 989)
		{
			$('#filter').removeAttr('style');
		}
	});
	/* --------------------------- ПЕРЕКЛЮЧЕНИЕ ВИДИМОСТИ ДЛИННОГО ТЕКСТА ОПИСАНИЯ КАТЕГОРИЙ -------------------------- */
	$('#btn-show-text').on('click', function() {
		var parentContainer = $(this).parent();
		var btnText = $(this).find('.btn-show-text-label');
		if (!parentContainer.hasClass('visible'))
		{
			parentContainer.addClass('visible');
			btnText.text('Скрыть');
			$(this).addClass('active');
		} else {
			parentContainer.removeClass('visible');
			btnText.text('Показать');
			$(this).removeClass('active');
		}
	});
	/* ------------------------------------------ ПЕРЕКЛЮЧЕНИЕ ВИДА КАТАЛОГА ------------------------------------------ */
	$('.controls-views__button').on('click', function() {
		var currentName = $(this).attr('data-type');
		var catalogProductsContainer = $('#catalog-products');
		if (window.innerWidth > 479)
		{
			if (currentName === 'line')
			{
				catalogProductsContainer.addClass('catalog-content__products_line');
			} else if (currentName === 'table') {
				catalogProductsContainer.removeClass('catalog-content__products_line');
			}
			$('.controls-views__button.active').removeClass('active');
			$(this).addClass('active');
		} else {
			if (currentName === 'column')
			{
				catalogProductsContainer.addClass('catalog-content__products_column');
			} else if (currentName === 'table') {
				catalogProductsContainer.removeClass('catalog-content__products_column');
			}
			$('.controls-views__button.current').removeClass('current');
			$(this).addClass('current');
		}
	});
	/* -------------------------------------------------- СОРТИРОВКА -------------------------------------------------- */
	$('.sort__select-item').on('click', function(event) {
		sortSelect($(this), event);
	});
	$('.sort__select').each(function(event) {
		var activeSortElement = $(this).find('.sort__select-item.active');
		if (!activeSortElement.length)
		{
			activeSortElement = $(this).find('.sort__select-item:first');
		}
		sortSelect(activeSortElement, event);
	});
	$(document).on('click', function() {
		if (window.innerWidth < 768)
		{
			var sortContainer = $(event.target).closest('.sort__select');
			var sortDropdownElement = $('.opened .sort__select-dropdown');
			if (sortContainer.is(event.target) || sortContainer.has(event.target).length !== 0)
			{
				if (!sortContainer.hasClass('opened'))
				{
					$('.sort__select.opened').removeClass('opened');
					sortContainer.addClass('opened');
				} else {
					sortContainer.removeClass('opened');
				}
			} else if (!sortDropdownElement.is(event.target) && sortDropdownElement.has(event.target).length === 0) {
				$('.sort__select.opened').removeClass('opened');
			}
		}
	});
	function sortSelect(sortElement, event)
	{
		var curentSortElement = sortElement;
		var sortContainer = curentSortElement.closest('.sort__select');
		var labelSortElement = sortContainer.find('.sort__select-label');
		if (!curentSortElement.hasClass('active'))
		{
			curentSortElement.siblings().removeClass('active sort_big-small');
			curentSortElement.addClass('active');
			labelSortElement.removeClass('sort_big-small');
		} else {
			if (event && event.type === 'click')
			{
				[curentSortElement, labelSortElement].map(function(item) {
					item.toggleClass('sort_big-small');
				});
			} else {
				if (curentSortElement.hasClass('sort_big-small'))
				{
					labelSortElement.addClass('sort_big-small');
				}
			}
		}
		if (labelSortElement.length)
		{
			labelSortElement.addClass('active');
			var labelSortText = labelSortElement.find('.sort__select-label-text');
			if (labelSortText.length) {
				labelSortText.text(curentSortElement.text());
			}
		}
	}
	/* ----------------------------------------------- СРАВНЕНИЕ ТОВАРОВ ---------------------------------------------- */
	$('.comparison__section-name').on('click', function() {
		$(this).toggleClass('active');
	});
	var stumbPosition = null;
	var listSize = null;
	var headerSize = null;
	$(window).bind('load scroll', function() {
		var stumbElement = $('#comparison-stumb');
		var comparisonContainer = $('#comparison-container');
		var listComparison = $('#comparison-list');
		var comparisonWrapper = $('.comparison__wrapper');
		if (stumbElement.length)
		{
			if (stumbPosition === null)
			{
				stumbPosition = stumbElement.offset().top;
			}
			if (listSize === null)
			{
				listSize = listComparison.height();
			}
			if (headerSize === null)
			{
				headerSize = $('#header').height();
			}
			if ($(this).scrollTop() + headerSize >= stumbPosition)
			{
				stumbElement.height(listSize);
				comparisonContainer.addClass('comparison_float');
				comparisonWrapper.addClass('compensate-for-scrollbar');
			} else {
				stumbElement.removeAttr('style');
				comparisonContainer.removeClass('comparison_float');
				comparisonWrapper.removeClass('compensate-for-scrollbar');
			}
		}
	});
	$(window).bind('resize', function() {
		var stumbElement = $('#comparison-stumb');
		var listComparison = $('#comparison-list');
		if (stumbElement.length)
		{
			stumbPosition = stumbElement.offset().top;
			listSize = listComparison.height();
			headerSize = $('#header').height();
			stumbElement.height(listSize);
		}
	});
	/* ---------------------------------------------- АККОРДИОН ВАКАНСИЙ ---------------------------------------------- */
	$('.vacancies__section-name, .info-content__description-name').on('click', function() {
		var parentContainer = $(this).parent();
		if ($(this).hasClass('info-content__description-name'))
		{
			if (window.innerWidth < 990)
			{
				showToggleInformation(parentContainer);
			}
		} else {
			showToggleInformation(parentContainer);
		}
	});
	function showToggleInformation(parentContainer)
	{
		if (!parentContainer.hasClass('active'))
		{
			parentContainer.addClass('active').siblings().removeClass('active');
		} else {
			parentContainer.removeClass('active');
		}
	}
	/* ---------------------------------- ДОБАВЛЕНИЕ ТОВАРА В ИЗБРАННОЕ И К СРАВНЕНИЮ --------------------------------- */
	$('.detail-sub-btn, .sub-buttons__input').on('change', function()
	{
		var btnContainer = $(this).closest('.tooltip');
		if ($(this).prop('checked') == true)
		{
			if ($(this).attr('data-name') == 'favorites')
			{
				btnContainer.tooltipster('content', 'Добавлено в избранное');
			} else if ($(this).attr('data-name') == 'comparison') {
				btnContainer.tooltipster('content', 'Добавлено в сравнение');
			}
			btnContainer.tooltipster('open');
		} else {
			if ($(this).attr('data-name') == 'favorites')
			{
				btnContainer.tooltipster('content', 'Добавить в избранное');
			} else if ($(this).attr('data-name') == 'comparison') {
				btnContainer.tooltipster('content', 'Добавить в сравнение');
			}
			btnContainer.tooltipster('open');
		}
	});
	/* ------------------------------------------ ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ ----------------------------------------- */
	$('.card-product__button-add, .detail-content__button-add, .products-carousel__button-add').on('click', function(event) {
		if (!$(this).hasClass('complete'))
		{
			event.preventDefault();
			$(this).addClass('complete');
			var textButton = $(this).find('.btn_text');
			if (textButton.length)
			{
				textButton.text('В корзине');
			}
			if ($(this).hasClass('card-product__button-add'))
			{
				var imgElement = $(this).closest('.card-product').find('.card-product__img');
				var basketElement = $('#basket-desktop-icon');
				var imgSize = imgElement.width();
				if (window.innerWidth < 768)
				{
					basketElement = $('#basket-mobile-icon');
				}
				imgElement.clone().css({
					'width': imgSize,
					'position': 'absolute',
					'z-index': '9999',
					'top': imgElement.offset().top,
					'left': imgElement.offset().left,
					'right': 'auto',
					'bottom': 'auto',
					'margin': 0
				}).appendTo('body').animate({
					opacity: 0.05,
					left: basketElement.offset()['left'],
					top: basketElement.offset()['top'],
					width: 20
				}, 500, function () {
					$(this).remove();
				});
			}
		}
	});
	/* ---------------------------------- СКРОЛЛИНГ СТРАНИЦЫ К ОПРЕДЕЛЕННОМУ ЭЛЕМЕНТУ --------------------------------- */
	$('.link-scroll-section').on('click', function(event) {
		event.preventDefault();
		var scrollSection = $(this).attr('href');
		if ($(this).attr('data-tab'))
		{
			$(scrollSection).easytabs('select', $(this).attr('data-tab'));
		}
		var positionSection = $(scrollSection).offset().top - $('#header').height();
		$('html, body').stop(true, true).animate({
			scrollTop: positionSection
		}, 400);
	});
	/* ------------------------------------------- БЫСТРОЕ ФОРМЛЕНИЕ ЗАКАЗА ------------------------------------------- */
	$('#request-send').text($('#request-send').data('next')).data('action', 'next');
	$('#quick-steps').easytabs('select', '#items-step');
	if ($('.variable-input:checked').length)
	{
		showHideVariable($('.variable-input:checked'));
	} else {
		var variableElement = $('.variable-input:first');
		showHideVariable(variableElement);
		variableElement.prop('checked', true);
	}
	$('.variable-input').on('change', function() {
		showHideVariable($(this));
	});
	/* Добавление форм продукта */
	$('#btn-add-product').on('click', function() {
		var formProduct = $('#tpl-form-product').clone(true);
		formProduct.removeClass('quick-content__container-form_hide').removeAttr('id');
		$('#container-form-products').append(formProduct);
		showHideAddProductButton();
	});
	/* Удаление формы продукта */
	$('[data-delete-form]').on('click', function(event) {
		event.preventDefault();
		$(this).parent().remove();
		showHideAddProductButton();
	});
	/* Отображение формы реквизитов */
	$('#btn-requisites').on('click', function(event) {
		event.preventDefault();
		$('#form-requisites').slideToggle(0);
		$(this).toggleClass('active');
	});
	$('[data-close-form]').on('click', function(event) {
		event.preventDefault();
		$(this).parent().hide();
		$('#btn-requisites').removeClass('active');
	});
	/* Подстановка фактического адреса в реквизитах компании */
	$('#check-address').on('change', function() {
		if ($(this).prop('checked'))
		{
			$('#field-actual-address').val($('#field-legal-address').val());
		} else {
			$('#field-actual-address').val('');
		}
	});
	$('#field-legal-address').bind('input', function() {
		if ($('#check-address').prop('checked'))
		{
			$('#field-actual-address').val($(this).val());
		}
	});
	function showHideVariable(variableElement)
	{
		var idContainer = variableElement.attr('data-src');
		if (idContainer)
		{
			$(idContainer).addClass('active').siblings('.quick-content__variable-forms').removeClass('active');
		}
	}
	function showHideAddProductButton()
	{
		var cntItems = $('#container-form-products .quick-content__container-form').length;
		if (cntItems < 20)
		{
			$('#btn-add-product').removeClass('quick-content__button-more_hide');
		} else {
			$('#btn-add-product').addClass('quick-content__button-more_hide');
		}
	}
	$('#request-send').on('click', function(event) {
		event.preventDefault();
		if ($(this).data('action') == 'send')
		{
			var isErrors = false;
			var fKey = '';
			var formObject = $(this).closest('form');
			var arFields = {
				'ajax': 'y',
				'prefix': $('input [name=prefix]', formObject).val(),
				'variant': $('input [name=variant]', formObject).val(),
				'data': $('input [name=data]', formObject).val()
			};
			var fType = 'fields';
			fKey = $('input[name="f[request][type]"]').val();
			if (fKey.length)
			{
				fType = $('input[name=' + fKey + ']:checked').val();
				arFields[fKey] = fType;
			}
			if (fType == 'fields')
			{
				if (arFields.variant == 'help')
				{
					fKey = $('input[name="f[request][requirements]"]').val();
					if (fKey.length)
					{
						arFields[fKey] = $('textarea[name=' + fKey + ']').val();
						if (arFields[fKey].length < 50)
						{
							$('textarea[name=' + fKey + ']').closest('.form-string').addClass('error-field');
							isErrors = true;
						} else {
							$('textarea[name=' + fKey + ']').closest('.form-string').removeClass('error-field');
						}
					}
				} else {
					var arProducts = {
						'name': [],
						'quantity': [],
						'comment': [],
						'temp': {
							'name': [],
							'quantity': [],
							'comment': [],
						},
						'fields': {
							'name': '',
							'quantity': '',
							'comment': ''
						}
					};
					fKey = $('input[name="f[product][name][]"]').val();
					if (fKey.length)
					{
						arProducts['fields']['name'] = fKey;
						$('input[name="' + fKey + '[]"]').each(function() {
							arProducts['temp']['name'].push($(this).val());
						});
					}
					fKey = $('input[name="f[product][quantity][]"]').val();
					if (fKey.length)
					{
						arProducts['fields']['quantity'] = fKey;
						$('input[name="' + fKey + '[]"]').each(function() {
							arProducts['temp']['quantity'].push($(this).val());
						});
					}
					fKey = $('input[name="f[product][comment][]"]').val();
					if (fKey.length)
					{
						arProducts['fields']['comment'] = fKey;
						$('textarea[name="' + fKey + '[]"]').each(function() {
							arProducts['temp']['comment'].push($(this).val());
						});
					}
					for (let i = 0; i < arProducts['temp']['name'].length; i++)
					{
						if (arProducts['temp']['name'][i].length || arProducts['temp']['quantity'][i].length || arProducts['temp']['comment'][i].length)
						{
							arProducts['name'].push(arProducts['temp']['name'][i]);
							arProducts['quantity'].push(arProducts['temp']['quantity'][i]);
							arProducts['comment'].push(arProducts['temp']['comment'][i]);
						}
					}
				}
			} else {
				fKey = $('input[name="f[request][file]"]').val();
				console.log(1, fKey, fType);
				if (fKey.length)
				{
					fKey += '_items';
					var fFiles = $('input[name=' + fKey + ']').val();
					if (fFiles.length)
					{
						arFields[fKey] = fFiles;
					} else {
						var objFile = $('input[name=' + fKey + ']').closest('.form-file');
						var objError = $('<div/>', {
							'class': 'form-string__error-text'
						}).text('Прикрепите корректный файл с описанием требований');
						objError = $('<div/>', {
							'class': 'form-file__item'
						}).append(objError);
						$('.form-file__list', objFile).append(objError);
					}
				}
			}
			console.log('isError: ', isErrors);
			console.log('fKey: ', fKey);
			console.log('arFields: ', arFields);
			console.log('fType: ', fType);
			console.log('arProducts: ', arProducts);
			/* $.ajax({}); */
		} else {
			$('#quick-steps').easytabs('select', '#contacts-step');
		}
	});
	/* --------------------- ПЕРЕКЛЮЧЕНИЕ ПУНКТОВ ДОСТАВКИ НА СТРАНИЦЕ ДОСТАВКИ ОФОРМЛЕНИЯ ЗАКАЗА --------------------- */
	$('.delivery-address-toggler').on('change', function() {
		toggleDeliveryPoint($(this));
	});
	if ($('.delivery-address-toggler:checked').length)
	{
		toggleDeliveryPoint($('.delivery-address-toggler:checked'));
	} else {
		$('.order-delivery__contacts').each(function() {
			var radioElement = $(this).find('.delivery-address-toggler:first');
			if (radioElement.length)
			{
				radioElement.prop('checked', true);
				toggleDeliveryPoint(radioElement);
			}
		});
	}
	function toggleDeliveryPoint(currentElement)
	{
		var parentMainContainer = currentElement.closest('.order-delivery__contact-item');
		parentMainContainer.siblings().find('.order-delivery__contact-content:visible').hide(0);
		parentMainContainer.find('.order-delivery__contact-content').show(0);
	}
	/* ------------------------------------- СПОСОБЫ ОПЛАТЫ ПРИ ОФОРМЛЕНИИ ЗАКАЗА ------------------------------------- */
	$('.order-payment__container').on('click', function() {
		var parentMainContainer = $(this).closest('.order-payment__item');
		if (!parentMainContainer.hasClass('disabled'))
		{
			if (!parentMainContainer.hasClass('active'))
			{
				parentMainContainer.addClass('active').siblings().removeClass('active');
			}
		}
	});
	/* ----------------------------------- ОТОБРАЖЕНИЕ ИНФОРМАЦИОННЫХ БЛОКОВ ЗАКАЗА ----------------------------------- */
	$('.all-info-order__section-heading').on('click', function() {
		var parentContainer = $(this).closest('.all-info-order__section');
		parentContainer.toggleClass('active');
	});
	$('.lk-info__section-button').on('click', function() {
		var parentContainer = $(this).closest('.lk-info__section');
		parentContainer.siblings('.active').find('.lk-info__section-button').text('Сделать основной');
		parentContainer.addClass('active').siblings().removeClass('active');
		$(this).text('Основной');
	});
	/* ------------------------------------------ КАРТА НА СТРАНИЦЕ КОНТАКТОВ ----------------------------------------- */
	if ($('div').is('#map'))
	{
		ymaps.ready(init);
	}
	function init()
	{
		var myMap = new ymaps.Map('map', {
			center: [47.25010607424489, 38.89049399999989],
			zoom: 17,
			controls: []
		});
		var myGeoObject = new ymaps.Placemark([47.25010607424489, 38.89049399999989], {}, {
			preset: 'islands#redDotIcon'
		});
		myMap.geoObjects.add(myGeoObject);
	}
	/* ------------------------------------------------ КАРТА ДОСТАВКИ ------------------------------------------------ */
	if ($('div').is('#popup-map'))
	{
		ymaps.ready(initPopupMap);
	}
	/* Табы доставки в попап окне карты */
	$('#map-addresses').easytabs({
		animate: false,
		updateHash: false,
		tabs: '.popup__map-nav > li',
		panelContext: $('#map-list-addresses')
	});
	/* Фильтрация активного списка адресов в попап окне карты */
	$('#map-search').bind('input', function(event) {
		var listElements = $('.popup__map-list-item.active .popup__map-address-item');
		if (event.keyCode == 27 || $(this).val() == '')
		{
			$(this).val('');
			listElements.show();
		} else {
			filter(listElements, $(this).val());
		}
	});
	function initPopupMap()
	{
		var myMap = null;
		var collection = null;
		/* Попап окно карты */
		$('.link-popup-map').on('click', function(event) {
			event.preventDefault();
			var srcPopup = $(this).attr('data-src');
			if (srcPopup)
			{
				$.fancybox.open({
					src: srcPopup,
					type: 'inline',
					opts: {
						closeExisting: true,
						gutter: 0,
						keyboard: false,
						arrows: false,
						infobar: false,
						modal: false,
						touch: false,
						animationEffect: false,
						animationDuration: 200,
						transitionEffect: false,
						transitionDuration: 200,
						baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-stage"></div>' + '</div>' + '</div>',
						hideScrollbar: true,
						hash: false,
						autoFocus: false,
						afterShow: function afterShow() {
							$('body').css('overflow', 'hidden');
							if (!myMap)
							{
								/* Инициализация карты */
								myMap = new ymaps.Map('popup-map', {
									center: [47.239165297977664, 38.88117849999999],
									zoom: 12,
									controls: []
								});
							}
							/* Добавляем объекты на крату при инициализации табов */
							addObjects();
							/* Переключение табов внутри карты при выборе варианта доставки */
							$('.order-delivery__input').each(function() {
								if ($(this).prop('checked') == true)
								{
									$('#map-addresses').easytabs('select', $(this).attr('data-src'));
									return;
								}
							});
							/* Если не выбрано ни одного пункта доставки то при запуске окна выставляем пукт по дефолту */
							if (!$('.order-delivery__input:checked').length)
							{
								selectDelivery();
							}
						},
						beforeClose: function beforeClose() {
							$('body').removeAttr('style');
							if (myMap)
							{
								myMap.destroy();
								myMap = null;
							}
						}
					}
				});
			}
		});
		/* Отслеживаем смену табов */
		$('#map-addresses').bind('easytabs:midTransition', function(event, $clicked, $targetPanel, settings) {
			/* Перед добавлением каоллекции объектов на карту, обнуляем коллекцию */
			if (collection != null && collection.getParent())
			{
				myMap.geoObjects.remove(collection);
				collection = null;
			}
		}).bind('easytabs:after', function(event, $clicked, $targetPanel, settings) {
			/* Сбрасываем результаты сортировки списка через поиск */
			resetSearchMap();
			/* Если переключаемся между табами в попап окне то меняем вариант доставки вне попап окна */
			selectDelivery();
			/* Добавляем объекты на крату */
			addObjects();
		});
		function addObjects()
		{
			/* Выбираем первый элемент активного списка и скроллим к нему карту */
			var firstAddress = $('.popup__map-list-item.active').find('.popup__map-address-item:first');
			var firstAddressCoords = firstAddress.attr('data-coords').split(',');
			myMap.setCenter(firstAddressCoords, 12, {
				duration: 300
			});
			/* Создаем список объектов из адресов и добавляем их на карту */
			var groupsList = $('.popup__map-list-item.active').find('.popup__map-address-item');
			collection = new ymaps.GeoObjectCollection(null, {
				preset: 'islands#darkBlueCircleDotIcon'
			});
			myMap.geoObjects.add(collection);
			groupsList.each(function() {
				var currentAddress = $(this);
				var infoAddress = {
					address: currentAddress.find('.popup__map-address-name').text(),
					coords: currentAddress.attr('data-coords').split(',')
				};
				var placemark = new ymaps.Placemark(infoAddress.coords, {
					balloonContent: infoAddress.address
				});
				myMap.geoObjects.options.set('balloonPanelMaxMapArea', 0);
				collection.add(placemark);
				/* Если кликаем по адресу то скроллим карту к нужному объекту и открываем/закрываем информацию о нем */
				currentAddress.on('click', function() {
					currentAddress.addClass('active').siblings().removeClass('active');
					myMap.setCenter(infoAddress.coords, 12, {
						duration: 300
					});
					setTimeout(function() {
						if (!placemark.balloon.isOpen())
						{
							placemark.balloon.open();
							changeAddress(currentAddress);
						} else {
							placemark.balloon.close();
						}
					}, 1);
				});
				/* Если кликаем по объекту на карте то сбрасваем поиск по адресам и подсвечиваем активным нужный адрес */
				placemark.events.add('click', function(event) {
					resetSearchMap();
					changeAddress(currentAddress);
					currentAddress.addClass('active').siblings().removeClass('active');
				});
			});
		}
	}
	/* Функция фильтрации списка при вводе в поле поиска по адресам попап окна карты */
	function filter(filter, query)
	{
		query = $.trim(query);
		$(filter).each(function() {
			$(this).find('.popup__map-address-name').text().search(new RegExp(query, 'i')) < 0 ? $(this).hide() : $(this).show();
		});
	}
	/* Сброс стилей поиска по адресам */
	function resetSearchMap() 
	{
		$('#map-search').val('');
		$('.popup__map-address-item').removeAttr('style');
	}
	/* Добавление адреса в поле пункта назначения в сайтбаре доставки */
	function changeAddress(activeAddress)
	{
		var textAddress = activeAddress.find('.popup__map-address-name').text();
		$('#point-address').val(textAddress);
	}
	/* Функция выбора доставки */
	function selectDelivery()
	{
		var attrLinkObject = $('.popup__map-nav-link.active').attr('href');
		$('.order-delivery__input[data-src=\\' + attrLinkObject + ']').prop('checked', true);
	}
});
