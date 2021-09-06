"use strict";

$(function () {
	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	function showPopup(html = '', w = 0, h = 0)
	{
		$('.overlay').css({opacity: 0, display: 'block'}).animate({opacity: 1}, 500, function(){
			w = w > 0 ? w : Math.round($(window).width() * 0.7);
			w = w < 320 ? 320 : (w > 600 ? 600 : w);
			$('body').append('<div class="popup-helper" id="popup-helper">' + html + '</div>');
			$('#popup-helper').css({display: 'block', width: w});
			th = Math.round($('#popup-helper').height());
			th = th > 0 ? th + 80 : 0;
			$('#popup-helper').remove();
			h = h > 0 ? h : (th > 0 ? th : Math.round($(window).height() * 0.7));
			ml = Math.round(w / 2) * -1;
			mt = Math.round(h / 2) * -1;
			$('.popup .close, .popup .inner').css({display: 'none'});
			$('.popup .inner').html(html);
			$('input[name*="phone"]', '.popup .inner').mask("+7 999 999 99 99", {placeholder: ' ', autoclear: false});
			$('.popup').css({opacity: 0, display: 'block', width: 0, height: 0}).animate({opacity: 1, width: w, height: h, marginTop: mt, marginLeft: ml}, 500, function(){
				$('.popup .close, .popup .inner').fadeIn();
			});
		});
	}
	$('.popup .close').on('click', function(){
		$('.popup .close, .popup .inner').fadeOut(function(){
			$('.popup .inner').html('');
			$('.popup').animate({opacity: 0, width: 0, height: 0, marginTop: 0, marginLeft: 0}, 500, function(){
				$(this).css({display: 'none'});
				$('.overlay').animate({opacity: 0}, 500, function(){
					$(this).css({display: 'none'});
				});
			});
		});
	});
	$(window).on('ready load resize', function(){
		var headerHeight = $('header').outerHeight();
		$('.header-helper').height(headerHeight);
		$('.poster, .poster-mobile').css({marginTop: '-' + headerHeight + 'px'});
		$('.poster, .poster-mobile').each(function(){
			maxWidth = 2560;
			maxHeight = 1600;
			$('.poster-item img, .poster-item video', this).each(function(){
				var iw = $(this).data('width');
				var ih = $(this).data('height');
				if (iw > 0 && iw < maxWidth)
				{
					maxWidth = iw;
				}
				if (ih > 0 && ih < maxHeight)
				{
					maxHeight = ih;
				}
			});
			var initHeight = $('.poster-item', this).height();
			var initWidth = $('.poster-item', this).width();
			if (initHeight > maxHeight)
			{
				$('.poster-item', this).height(maxHeight);
				initHeight = maxHeight;
			}
			$('.poster-item', this).each(function(){
				var iw = $('img, video', this).data('width');
				var ih = $('img, video', this).data('height');
				var kw = iw / initWidth;
				var kh = ih / initHeight;
				if (kh < kw)
				{
					$('img, video', this).addClass('hf');
				} else {
					$('img, video', this).removeClass('hf');
				}
			});
		});
		if ($('.poster-slider').hasClass('slick-slider'))
		{
			$('.poster-slider').slick('refresh');
		}
	});
	$(window).on('load scroll', function(){
		if ($('#bx-panel').length)
		{
			if (!$('#bx-panel').hasClass('bx-panel-fixed'))
			{
				if ($(this).scrollTop() >= $('#bx-panel').height())
				{
					$('header').addClass('fixed');
				} else {
					$('header').removeClass('fixed');
				}
			}
		}
		var bannerPos = 0;
		var bnr = $('.poster-mobile');
		if (bnr.length)
		{
			bannerPos = bnr.height() - $('header').outerHeight();
		}
		if ($(this).scrollTop() >= bannerPos)
		{
			$('header').addClass('panel');
		} else {
			if (!$('header .left .mobile').hasClass('active'))
			{
				$('header').removeClass('panel');
			}
		}
		// loading catalog
		var loadBtn = $('.catalog .action a');
		if (loadBtn.length)
		{
			if (!loadBtn.hasClass('loading'))
			{
				var scroll = 0;
				var t1 = parseInt($(window).scrollTop());
				var t2 = parseInt($(window).height());
				if (isNaN(t1))
				{
					t1 = 0;
				}
				if (isNaN(t2))
				{
					t2 = 0;
				}
				scroll = t1 + t2;
				var pos = 0;
				t1 = loadBtn.offset();
				if (typeof t1 === 'object' && t1 !== null)
				{
					pos = parseInt(t1.top);
					if (isNaN(pos))
					{
						pos = 0;
					}
				}
				if (scroll >= pos)
				{
					loadBtn.addClass('loading').trigger('click');
				}
			}
		}
	});
	$('#bx-panel-pin').on('click', function(){
		$(window).trigger('scroll');
		$(window).trigger('resize');
	});
	$('header .main nav .navitem').hover(function(){
		$('.subnav').each(function(){
			$(this).stop(true).css({display: 'none'}).removeAttr('style');
		});
		var subMenu = $('.subnav', this);
		$(subMenu).css({opacity: 0, display: 'flex'});
		var subMenuHeight = $(subMenu).height();
		var p1 = $(window).height();
		var p2 = $(subMenu).offset();
		var p3 = $(document).scrollTop();
		if (typeof p2 === 'object' && p2 !== null)
		{
			if ('top' in p2)
			{
				p2 = p2.top;
			} else {
				p2 = 0;
			}
		} else {
			p2 = 0
		}
		p2 = p2 - p3;
		if (p2 < 0)
		{
			p2 = 0;
		}
		var th = p1 - subMenuHeight - p2;
		if (th < 0)
		{
			subMenuHeight = subMenuHeight + th;
		}
		$('.items', $(subMenu)).css({overflowY: 'hidden'});
		$(subMenu).css({height: '0px', overflow: 'hidden'}).animate({opacity: 1, height: subMenuHeight}, 300, function(){
			$('.items', $(subMenu)).css({overflowY: 'auto'});
		});
	}, function(){
		var subMenu = $('.subnav', this);
		$(subMenu).css({display: 'none'}).removeAttr('style');
	});
	$('.play'). click(function(){
		var block = $(this).closest('.video');
		$('video', block).get(0).play();
	});
	$('.catalog .items').on('click', '.item .favorite', function(e){
		var action = 'add';
		var productId = $(this).data('favorite');
		var item = $(this);
		if ($(this).hasClass('active'))
		{
			action = 'delete';
		}
		$.ajax({
			url: '/ajax/favorite.php',
			method: 'POST',
			dataType: 'json',
			data: {
				ajax: 'y',
				action: action,
				id: productId,
			},
			success: function(data)
			{
				if (action == 'add')
				{
					$(item).addClass('active');
				} else {
					$(item).removeClass('active');
				}
				var favoriteCount = data.count;
				$('header .favorite span i').text((favoriteCount > 9 ? '9+' : favoriteCount));
				if (favoriteCount > 0)
				{
					if (!$('header .favorite').hasClass('active'))
					{
						$('header .favorite').addClass('active');
					}
				} else {
					$('header .favorite').removeClass('active');
				}
			}
		});
	});
	$.ajax({
		url: '/ajax/favorite.php',
		dataType: 'json',
		success: function(data)
		{
			var favoriteCount = data.count;
			$('header .favorite span i').text((favoriteCount > 9 ? '9+' : favoriteCount));
			if (favoriteCount > 0)
			{
				if (!$('header .favorite').hasClass('active'))
				{
					$('header .favorite').addClass('active');
				}
				for (i = 0; i < data.items.length; i++)
				{
					$('.item .favorite[data-favorite="'+data.items[i]+'"]').addClass('active');
				}
			} else {
				$('header .favorite').removeClass('active');
			}
		}
	});
	var arSkip = [
		'catalog-clothes',
		'catalog-vests',
		'catalog-jackets',
		'catalog-shirts',
		'catalog-footwear',
		'catalog-keds',
		'catalog-sneakers',
		'catalog-loafers',
		'catalog-slip-ons',
		'catalog-shoes',
		'catalog-flip-flops',
	];
	var pathItems = window.location.pathname.split('/');
	var pathValue = '';
	if (pathItems.length > 2)
	{
		pathValue = pathItems[1] + '-' + pathItems[2];
	}
	$('.catalog .items').on({
		mouseenter: function () {
			if (arSkip.indexOf(pathValue) > -1) return false;
			var w = 0;
			tw = parseInt($(this).data('w'));
			if (isNaN)
			{
				w = $('.org', $(this).parent()).width();
			} else {
				w = tw;
			}
			$(this).data('w', w);
			$('.image .alt', this).css({
				opacity: 0,
				display: 'block',
				maxWidth: w,
				width: w,
			}).animate({
				opacity: 1,
			}, 400);
		},
		mouseleave: function () {
			if (arSkip.indexOf(pathValue) > -1) return false;
			var w = 0;
			w = $(this).data('w');
			w = parseInt(w);
			if (isNaN(w))
			{
				w = '100%';
			}
			$('.image .alt', this).animate({
				opacity: 0,
			}, 400, function(){
				$(this).css({display: 'none'});
			});
		}
	}, '.item');
	$.ajax({
		url: '/ajax/cart.php',
		dataType: 'json',
		data: {ajax: 'y', action: 'count'},
		success: function(data)
		{
			var cartCount = data.cart.quantity;
			$('header .cart span i').text((cartCount > 9 ? '9+' : cartCount));
			if (cartCount > 0)
			{
				if (!$('header .cart').hasClass('active'))
				{
					$('header .cart').addClass('active');
				}
			} else {
				$('header .cart').removeClass('active');
			}
		}
	});
	$('header .left .mobile').on('click', function(){
		if ($(this).hasClass('active'))
		{
			$('.mobile-menu').animate({left: '-100%'}, 500, function(){
				$(this).css({left: '0', display: 'none'});
				$('.mobile-menu .mm-panel').css({display: 'none'});
				$('.mobile-menu .mm-main').css({display: 'flex'});
				$('.mm-container').css({left: '0'});
			});
			$('header .left .mobile').removeClass('active');
			var bannerPos = 0;
			var bnr = $('.poster-mobile');
			if (bnr.length)
			{
				bannerPos = bnr.height() - $('header').outerHeight();
			}
			if ($(window).scrollTop() < bannerPos)
			{
				$('header').removeClass('panel');
			}
		} else {
			$('header').addClass('panel');
			$('.mobile-menu').css({left: '-100%', display: 'block'}).animate({left: 0}, 500);
			$('header .left .mobile').addClass('active');
		}
	});
	$('.mobile-menu .mm-body a').on('click', function(event){
		if ($(this).hasClass('mm-subitems'))
		{
			event.preventDefault();
			var layer = $(this).data('subnav');
			$('#' + layer).css({display: 'flex'});
			$('.mm-container').animate({left: '-100%'}, 500);
		}
	});
	$('.mobile-menu .mm-body .mm-caption').on('click', function(){
		var layer = $(this).closest('.mm-panel');
		$('.mm-container').animate({left: '0'}, 500, function(){
			layer.css({display: 'none'});
		});
	});
	$('footer .blocks .nav nav .title').on('click', function(){
		if ($(window).width() >= 570) return false;
		var itemsBlock = $('.items', $(this).closest('nav'));
		if (itemsBlock.closest('nav').hasClass('opened'))
		{
			itemsBlock.slideUp();
			itemsBlock.closest('nav').removeClass('opened');
		} else {
			$('footer .blocks .nav nav .items').slideUp();
			$('footer .blocks .nav nav').removeClass('opened');
			itemsBlock.slideDown();
			itemsBlock.closest('nav').addClass('opened');
		}
	});
	$('.mail').on('click', function(event){
		event.preventDefault();
		if ($(this).data('disabled') != 'y')
		{
			$(this).data('disabled', 'y');
			$.ajax({
				url: '/ajax/feedback.php',
				method: 'POST',
				dataType: 'json',
				data: {
					ajax: 'y',
					action: 'form',
				},
				success: function(data) {
					$('.mail').data('disabled', 'n');
					var html = '';
					if (data.success)
					{
						html = data.html;
					}
					showPopup(html);
				},
				error: function(){
					$('.mail').data('disabled', 'n');
				}
			});
		}
	});
	$('body .popup').on('click', 'button.feedback-submit', function(){
		$('.field', '.popup .inner').removeClass('error');
		var data = {
			ajax: 'y',
			action: 'add',
		};
		var tm = $('input[name="tm"]', '.popup .inner').val();
		$('.popup .inner').find('select, input, textarea').each(function() {
			var tn = this.name;
			tn = tn.replace(tm, '');
			data[tn] = $(this).val();
		});
		var err = false;
		if (data['fields[name]'].length < 3)
		{
			$('input[name="' + tm + 'fields[name]"]', '.popup .inner').closest('.field').addClass('error');
			err = true;
		}
		if (data['fields[email]'].length > 0 && !validateEmail(data['fields[email]']))
		{
			$('input[name="' + tm + 'fields[email]"]', '.popup .inner').closest('.field').addClass('error');
			err = true;
		}
		if (data['fields[phone]'].length < 1 || (data['fields[phone]'].replace(/[^0-9]/g,"") < 10))
		{
			$('input[name="' + tm + 'fields[phone]"]', '.popup .inner').closest('.field').addClass('error');
			err = true;
		}
		if (data['fields[message]'].length < 3)
		{
			$('textarea[name="' + tm + 'fields[message]"]', '.popup .inner').closest('.field').addClass('error');
			err = true;
		}
		if (!err)
		{
			$.ajax({
				url: '/ajax/feedback.php',
				method: 'POST',
				dataType: 'json',
				data: data,
				success: function(data) {
					if (data.success == 1)
					{
						$('.popup .inner').animate({opacity: 0}, 500, function(){
							$(this).html(data.html).animate({opacity: 1});
						});
					}
				}
			});
		}
	});
	$('.oneclick').on('click', function(){
		event.preventDefault();
		var pid = $(this).closest('.action').data('pid');
		pid = parseInt(pid);
		if (isNaN(pid))
		{
			pid = 0;
		}
		if (pid > 0)
		{
			var arValues = [];
			$('.product .details .size .sku select option').each(function(){
				var t = $(this).val();
				t = parseInt(t);
				if (isNaN(t))
				{
					t = 0;
				}
				if (t > 0)
				{
					arValues.push(t);
				}
			});
			if (arValues.length > 0)
			{
				if (arValues.indexOf(pid) < 0)
				{
					pid = 0;
					alert('Укажите размер!');
					return false;
				}
			}
		}
		if ($(this).data('disabled') != 'y')
		{
			$(this).data('disabled', 'y');
			$.ajax({
				url: '/ajax/order.php',
				method: 'POST',
				dataType: 'json',
				data: {
					ajax: 'y',
					action: 'form',
				},
				success: function(data) {
					$('.oneclick').data('disabled', 'n');
					var html = '';
					if (data.success)
					{
						html = data.html;
					}
					showPopup(html);
				},
				error: function(){
					$('.oneclick').data('disabled', 'n');
				}
			});
		}
	});
	$('.basket-btn-checkout').on('click', function(){
		event.preventDefault();
		if ($(this).data('disabled') != 'y')
		{
			$(this).data('disabled', 'y');
			$.ajax({
				url: '/ajax/order.php',
				method: 'POST',
				dataType: 'json',
				data: {
					ajax: 'y',
					action: 'form',
					additional: 1,
				},
				success: function(data) {
					$('.oneclick').data('disabled', 'n');
					$('.basket-btn-checkout').data('disabled', 'n');
					var html = '';
					if (data.success)
					{
						html = data.html;
					}
					showPopup(html);
				},
				error: function(){
					$('.oneclick').data('disabled', 'n');
					$('.basket-btn-checkout').data('disabled', 'n');
				}
			});
		}
	});
	$('body .popup').on('click', 'button.oneclick-submit', function(){
		$('.field', '.popup .inner').removeClass('error');
		var data = {
			ajax: 'y',
			action: (window.location.pathname == '/cart/' ? 'order' : 'fast'),
			product: $('.product .action .oneclick').closest('.action').data('pid'),
		};
		var tm = $('input[name="tm"]', '.popup .inner').val();
		$('.popup .inner').find('input, textarea').each(function() {
			var tn = this.name;
			tn = tn.replace(tm, '');
			data[tn] = $(this).val();
		});
		var err = false;
		if (data['fields[name]'].length < 3)
		{
			$('input[name="' + tm + 'fields[name]"]', '.popup .inner').closest('.field').addClass('error');
			err = true;
		}
		if (data['fields[phone]'].length < 1 || (data['fields[phone]'].replace(/[^0-9]/g,"") < 10))
		{
			$('input[name="' + tm + 'fields[phone]"]', '.popup .inner').closest('.field').addClass('error');
			err = true;
		}
		if (!err)
		{
			$.ajax({
				url: '/ajax/order.php',
				method: 'POST',
				dataType: 'json',
				data: data,
				success: function(data) {
					if (data.success == 1)
					{
						$('.popup .inner').animate({opacity: 0}, 500, function(){
							$(this).html(data.html).animate({opacity: 1});
						});
						$.ajax({
							url: '/cart/',
							method: 'POST',
							dataType: 'html',
							data: {},
							success: function(data) {
								$('main .container').html($(data).find('main .container').html());
							}
						});
					}
				}
			});
		}
	});
	$('.product .photo .slider .item').on('click', function(){
		$('.product .photo .picture img').attr('src', $('img', this).data('src'));
	});
	$('.product .details .size .sku select').on('change', function() {
		$('.product .details .action').data('pid', $(this).val());
	});
	$('.product .details .action .buy').on('click', function(){
		var btn = this;
		var pid = $(this).closest('.action').data('pid');
		pid = parseInt(pid);
		if (isNaN(pid))
		{
			pid = 0;
		}
		if (pid > 0)
		{
			var arValues = [];
			$('.product .details .size .sku select option').each(function(){
				var t = $(this).val();
				t = parseInt(t);
				if (isNaN(t))
				{
					t = 0;
				}
				if (t > 0)
				{
					arValues.push(t);
				}
			});
			if (arValues.length > 0)
			{
				if (arValues.indexOf(pid) < 0)
				{
					pid = 0;
					alert('Укажите размер!');
				}
			}
		}
		if (pid > 0)
		{
			$.ajax({
				url: '/ajax/cart.php',
				method: 'POST',
				dataType: 'json',
				data: {
					ajax: 'y',
					action: 'add',
					product: pid,
				},
				success: function(data){
					if (data)
					{
						if ('success' in data)
						{
							if (data.success == 1)
							{
								var txt = $(btn).data('in-basket');
								$(btn).addClass('in-basket').text(txt);
							}
						}
						if ('cart' in data)
						{
							var t = data.cart.items;
							t = parseInt(t);
							if (isNaN(t))
							{
								t = 0;
							}
							$('header .icons .cart span i').text((t > 9 ? '9+' : t));
							if (t > 0)
							{
								if (!$('header .icons .cart').hasClass('active'))
								{
									$('header .icons .cart').addClass('active');
								}
							} else {
								$('header .icons .cart').removeClass('active');
							}
						}
					}
				}
			});
		}
	});
	/* catalog page load */
	$('.catalog .action a').click(function(e){
		e.preventDefault();
		var pi = $(this).closest('.action').data('page-nav');
		var pc = $(this).closest('.action').data('page-count');
		var pn = $(this).closest('.action').data('page-number');
		console.log(pi, pc, pn)
		pi = parseInt(pi);
		if (isNaN(pi))
		{
			pi = 0;
		}
		pc = parseInt(pc);
		if (isNaN(pc))
		{
			pc = 0;
		}
		pn = parseInt(pn);
		if (isNaN(pn))
		{
			pn = 0;
		}
		if (pi > 0 && pc > 0 && pn > 0)
		{
			if (pn < pc)
			{
				var url = window.location.pathname + (window.location.search.length > 0 ? window.location.search + '&' : '?') + 'PAGEN_' + pi + '=' + (pn + 1);
				$.get(url, function(data){
					var items = $(data).find('.catalog .items');
					$('.catalog .items').append($(items).html());
					pc = $(data).find('.catalog .action').data('page-count');
					pn = $(data).find('.catalog .action').data('page-number');
					pc = parseInt(pc);
					if (isNaN(pc))
					{
						pc = 0;
					}
					pn = parseInt(pn);
					if (isNaN(pn))
					{
						pn = 0;
					}
					$('.catalog .action').data('page-count', pc);
					$('.catalog .action').data('page-number', pn);
					$('.catalog .action a').removeClass('loading');
					if (pn >= pc)
					{
						$('.catalog .action').remove();
					}
				}, "html");
			}
		} else {
			$('.catalog .action').remove();
		}
	});
	$('.product .details .description .block').on('click', function(){
		var obj = $(this).closest('.description');
		if (obj.hasClass('active'))
		{
			$('.text', obj).slideUp();
			$(obj).removeClass('active');
		} else {
			$('.product .details .description .text').slideUp();
			$('.product .details .description').removeClass('active');
			$('.text', obj).slideDown();
			$(obj).addClass('active');
		}
	});
	$('.product .details .get-in-touch a.message').each(function(){
		var url = $(this).attr('href');
		if (url.length)
		{
			url = url.replace('text', 'text=' + $('.product .details .get-in-touch').data('text') + '&t=');
			$(this).attr('href', url);
		}
	});
	$('.catalog .head .sort .sort-action').on('click', function(event){
		event.preventDefault();
		$('ul', $(this).closest('.sort')).slideToggle();
		$(this).toggleClass('opened');
	});
	$('header .search input').on('keyup', function(){
		var thisVal = $(this).val();
		if (thisVal.length)
		{
			$.ajax({
				url: '/ajax/search.php',
				method: 'POST',
				dataType: 'json',
				data: {
					ajax: 'y',
					query: thisVal,
				},
				success: function(data){
					if (Array.isArray(data))
					{
						var l = 0;
						var htmlCode = '';
						for (i = 0; i < data.length; i++)
						{
							l++;
							htmlCode += '<div class="si">';
							htmlCode += '<a href="' + data[i].url + '">';
							htmlCode += '<div class="si-photo"><img src="' + data[i].photo + '"></div>';
							htmlCode += '<div class="si-data">';
							htmlCode += '<div class="si-name">' + data[i].name + '</div>';
							if (data[i].properties.length)
							{
								htmlCode += '<div class="si-props">';
								for (j = 0; j < data[i].properties.length; j++)
								{
									htmlCode += '<div class="si-property">' + data[i].properties[j].name + ': ' + data[i].properties[j].values.join(', ') + '</div>';
								}
								htmlCode += '</div>';
							}
							htmlCode += '</div>';
							htmlCode += '</a>';
							htmlCode += '</div>';
						}
						$('header .search .result').html(htmlCode);
						if (l > 0)
						{
							var mh = 0;
							mh = $(window).height() - $('header').height();
							if (mh < 250)
							{
								mh = 250;
							}
							$('header .search .result').addClass('opened').css({maxHeight: mh, overflowY: 'auto'});
						} else {
							$('header .search .result').removeClass('opened');
						}
					}
				}
			});
		} else {
			$('header .search .result').removeClass('opened');
		}
	});
	$('.catalog .head .controls .view a').on('click', function(event){
		event.preventDefault();
		var tilesType = ($('.icon', this).hasClass('icon-4') ? 'expanded' : 'standart');
		setTiles(tilesType);
	});
	setTiles();
});

function setBoutique(bid = 0)
{
	if (bid > 0)
	{
		var obj = $('#boutique-' + bid);
		if (obj.length)
		{
			$('.boutiques .info .address').text($('.address', obj).text());
			$('.boutiques .info .phone').text($('.phone', obj).text());
			$('.boutiques .info .email a').attr('href', 'mailto:' + $('.email', obj).text());
			$('.boutiques .info .action .route').attr('href', $('.location', obj).text().trim());
			$('.gallery .gallery-wrapper').html('<div class="items">' + $('.photo', obj).html() + '</div>');
			var currentCarousel = $('.gallery .items');
			var containerControls = currentCarousel.closest('.gallery-wrapper');
			currentCarousel.slick({
				dots: false,
				arrows: true,
				slidesToScroll: 1,
				slidesToShow: 1,
				infinite: true,
				swipe: true,
				speed: 300,
				centerMode: false,
				centerPadding: '0px',
				adaptiveHeight: false,
				appendArrows: containerControls,
				appendDots: containerControls
			});
		}
	}
}

function setTiles(type = '')
{
	type = (type == 'expanded' ? 'expanded' : (type == 'standart' ? 'standart' : ''));
	var dataSend = {
		ajax: 'y',
	};
	if (type.length)
	{
		dataSend.action = 'set';
		dataSend.type = type;
	}
	$.ajax({
		url: '/ajax/tiles.php',
		method: 'POST',
		dataType: 'json',
		data: dataSend,
		success: function(data){
			if (data.type == 'expanded')
			{
				$('.catalog .items').addClass('expanded');
			} else {
				$('.catalog .items').removeClass('expanded');
			}
		}
	});
}
