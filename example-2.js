'use strict';

$(function () {
  // Поддержка svg спрайтов в IE11
  svg4everybody();

  // Мобильное меню
  $('#pull').on('click', function() {
    if (window.innerWidth < 768) {
      $('#nav').stop(true, true).slideToggle(200);
      $(this).toggleClass('active-nav');
    }
  });

  // Показ/скрытие блока логотипов
  $('#footer-logos-arrow').on('click', function() {
    if (window.innerWidth < 1360) {
      $('#footer-logos').stop(true, true).slideToggle(200);
      $(this).toggleClass('active');
    }
  });

  // Сброс стилей
  $(window).bind('load resize', function() {
    if (window.innerWidth > 767) {
      $('#nav').removeAttr('style');
      $('#pull').removeClass('active-nav');
    }

    if (window.innerWidth > 1359) {
      $('#footer-logos').removeAttr('style');
      $('#footer-logos-arrow').removeClass('active');
    }
  });

  // Стилизация элементов формы
  $('select, input[type=file]').styler();

  // Слаидер диапазона
  $('.slider').each(function() {
    var minValue = $(this).attr('data-min');
    var maxValue = $(this).attr('data-max');
    var fromValue = $(this).attr('data-from');

    $(this).ionRangeSlider({
      min: minValue,
      max: maxValue,
      from: fromValue,
      max_postfix: '+'
    });
  });

  // Количество товара
  $('.count-button').on('click', function() {
    var nameButton = $(this).attr('data-name');
    var countCover = $(this).closest('.count');
    var fieldCount = countCover.find('.count-input');
    var countValue = parseInt(fieldCount.val());
    var minValue = parseInt(fieldCount.attr('data-min')) || 1;
    var maxValue = parseInt(fieldCount.attr('data-max')) || 999;

    if (fieldCount.length) {
      if (nameButton === 'minus') {
        if (countValue > minValue) {
          fieldCount.val(--countValue);
        }
      } else if (nameButton === 'plus') {
        if (countValue < maxValue) {
          fieldCount.val(++countValue);
        }
      }

      if (isNaN(countValue)) {
        fieldCount.val(minValue);
      }
    }
  });

  $('.count-input').bind('input blur', function() {
    var fieldCount = $(this);
    var countValue = parseInt(fieldCount.val());
    var minValue = parseInt(fieldCount.attr('data-min')) || 1;
    var maxValue = parseInt(fieldCount.attr('data-max')) || 999;

    if (countValue >= maxValue) {
      fieldCount.val(maxValue);
    } else if (countValue == minValue || isNaN(countValue) || countValue < minValue) {
      fieldCount.val(minValue);
    }
  });

  // Карусель товаров
  $('#carousel').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    appendArrows: '#carousel-container',
    dots: false,
    appendDots: '#carousel-cover',
    responsive: [
      {
        breakpoint: 1715,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true
        }
      }
    ]
  });

  // Карты
  var mapsList = {};
  ymaps.ready(init);

  $('.button-map').on('click', function() {
    var currentButton = $(this);
    var parentContainer = currentButton.closest('.address');
    var mapContainer = parentContainer.find('.address__map');
    var mapBlockId = parentContainer.find('.map').attr('id');

    if (mapContainer.length) {
      mapContainer.stop(true, true).slideToggle(200, function() {
        if (mapContainer.is(':visible')) {
          currentButton.text('Скрыть');
          if (mapsList[mapBlockId]) {
            mapsList[mapBlockId].container.fitToViewport();
          }
        } else {
          currentButton.text('На карте');
        }
      });
    }
  });

  function init() {
    $('.map').each(function() {
      var idElement = $(this).attr('id');
      var latitude = $(this).attr('data-latitude');
      var longitude = $(this).attr('data-longitude');

      var myMap = new ymaps.Map(idElement, {
          center: [latitude, longitude],
          zoom: 17,
          controls: [],
          autoFitToViewport: 'always'
      });

      var placemark = new ymaps.Placemark([latitude, longitude], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/icon-placemark.png',
        iconImageSize: [82, 82],
        iconImageOffset: [-41, -82]
      });

      myMap.geoObjects.add(placemark);
      myMap.behaviors.disable('scrollZoom');

      mapsList[idElement] = myMap;
    });
  }

  // Табы на странице контактов
  $('#contacts').easytabs({
    animate: false,
    updateHash: false
  }).bind('easytabs:after', function(event, $clicked, $targetPanel) {
    if ($targetPanel[0].id === 'addresses') {
      for (var key in mapsList) {
        mapsList[key].container.fitToViewport();
      }
    }
  });

  // Табы личного кабинета
  $('#lk').easytabs({
    animate: false,
    updateHash: false
  })

  // Скрытие/показ заказов в личном кабинете
  $('.lk__order-header').on('click', function() {
    var parentContainer = $(this).closest('.lk__order');
    var listProductsOrder = parentContainer.find('.lk__order-content');

    if (parentContainer.hasClass('active')) {
      listProductsOrder.stop(true, true).slideUp(200, function() {
        parentContainer.removeClass('active');
      });
    } else {
      listProductsOrder.stop(true, true).slideDown(200, function() {
        parentContainer.addClass('active');
      });
    }
  });

  // Маска телефона
  $('input[type=tel]').mask('+7 999 999 99 99');

  // Модальные окна
  $('[data-fancybox]').fancybox({
    buttons: [],
    hash: false,
    arrows: false,
    infobar: false,
    hideScrollbar: true,
    transitionEffect: false,
    animationEffect: false,
    closeExisting: true,
    transitionDuration: 200,
    autoFocus: false,
    loop: false,
    modal: true,
    afterLoad: function afterLoad(instance, current) {
      current.$content.append('<div class="modal__close" data-fancybox-close></div>');
    },
    afterClose: function(instance, current) {
      var element = current.src + ' .modal__close';
      $(element).remove();
    }
  });

  // Сортировка
  $('.sort__element').on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).siblings().removeClass().addClass('sort__element');
      $(this).addClass('active');
    }

    if (!$(this).hasClass('small-big')) {
      $(this).removeClass('big-small').addClass('small-big');
    } else {
      $(this).removeClass('small-big').addClass('big-small');
    }
  });

  // Выбор типа плательщика в форме оформления заказа
  function showHideFields(currentType) {
    var nameType = currentType.attr('data-name');
    var orderContainer = currentType.closest('.order-step');
    var hiddenFields = orderContainer.find('.form__string_hidden');

    if (nameType == 'entity') {
      hiddenFields.show(0);
    } else {
      hiddenFields.hide(0);
    }
  }

  function checkedType() {
    var selectType = $('.order-step .order-type:checked');

    if (selectType.length) {
      showHideFields(selectType);
    } else {
      selectType = $('.order-step .order-type:first');
      selectType.prop('checked', true);
      showHideFields(selectType);
    }
  }

  checkedType();

  $('.order-type').change(function() {
    showHideFields($(this));
  });

  // Редактирование полей формы
  $('.form__button-edit').on('click', function() {
    var parentContainer = $(this).parent();
    var field = parentContainer.find('.form-input');

    if (field.length) {
      field.prop('disabled', false);
    }
  });

  // Скрытие / отображение блоков госта
  $('.accordion-heading').on('click', function() {
    var parentContainer = $(this).closest('.accordion');
    var contentAccordion = parentContainer.find('.accordion-content');

    if (contentAccordion.length) {
      contentAccordion.stop(true, true).slideToggle(200, function() {
        parentContainer.toggleClass('active');
      });
    }
  });
});
