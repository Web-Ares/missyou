( function(){

    $( function() {
        'use strict';

        $.each( $('.main-slider'), function () {

            new Slider( $(this) );

        } );

    } );

    var Slider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _slides = _obj.find( '.main-slider__slide'),
            _window = $( window),
            _swiper;

        //private methods
        var _onEvents = function () {


                _window.on( {
                    resize: function() {

                        if( _window.height() >= 850 ) {

                            _resetHeightImg();

                        } else {

                            _setHeightImg();

                        }


                    },
                    load: function() {

                        if( _window.height() < 850 ) {

                            _setHeightImg();

                        }

                    }
                } )

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false,
                    effect: 'fade',
                    parallax: true,
                    paginationType: 'custom',
                    paginationCustomRender: function( swiper, current, total ) {

                        var names = [];

                        $( '.swiper-wrapper .swiper-slide' ).each( function(i) {

                            names.push( $(this).data('name') );

                        } );

                        var text = '<div class="swiper-pagination__text">';

                        for ( var i = 1; i <= total; i++ ) {

                            if ( current == i ) {

                                text += '<span class="active"><span>' + names[i] + '</span></span>';

                            } else {

                                text += '<span><span>' + names[i] + '</span></span>';

                            }

                        }

                        text += '</div>';

                        return text;

                    }
                } );

                _slides = _obj.find( '.main-slider__slide');

            },
            _resetHeightImg = function() {

                _slides.each( function() {
                    var curSlide = $(this),
                        curSlideImg = curSlide.find('.main-slider__pic img');

                    curSlideImg.attr( 'style', '' );

                } );

            },
            _setHeightImg = function() {

                _slides.each( function() {
                    var curSlide = $(this),
                        curSlideImg = curSlide.find('.main-slider__pic img');

                    if( curSlideImg.height() >= curSlide.height() ) {

                        curSlideImg.css( {
                            'height': curSlide.height()*0.9,
                            'width': 'auto'
                        } );

                    }

                } );

            },
            _init = function () {

                _obj[0].obj = _self;
                _onEvents();
                _initSwiper();

            };


        _init();
    };

} )();

