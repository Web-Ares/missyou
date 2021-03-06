( function(){

    $( function() {
        'use strict';

        $.each( $('.main-slider'), function () {

            new Slider( $(this) );

        } );

    } );

    var Slider = function (obj) {

        //private properties
        var _obj = obj,
            _slides = _obj.find( '.main-slider__slide'),
            _window = $( window ),
            _imgBottom = _obj.find( '.move-down' ),
            _imgTop = _obj.find( '.move-top'),
            _bottomStep = 5,
            _topStep = 5,
            _swiper,
            _x = -0.5,
            _y = -0.4;

        //private methods
        var _onEvents = function () {

                _window.on( {
                    resize: function() {

                        if( _window.height() >= 850 ) {

                            _resetHeightImg();

                        } else {

                            _setHeightImg();

                        }

                        // if (_window.width() < 1024) {
                        //
                        //     _imgBottom.css( {
                        //         '-webkit-transform': 'translate( -50%, -50% )',
                        //         'transform': 'translate( -50%, -50% )'
                        //     } );
                        //     _imgTop.css( {
                        //         '-webkit-transform': 'translate( -50%, -50% )',
                        //         'transform': 'translate( -50%, -50% )'
                        //     } );
                        // }

                    },
                    load: function() {

                        if( _window.width() > 1024 ) {

                            _moveBottom( _x, _y );
                            _moveTop( _x, _y );

                        }

                        if( _window.height() < 850 ) {

                            _setHeightImg();

                        }

                    },
                    mousemove: function( e ){

                        if( _window.width()>1024 ) {

                            // console.log("mousemove");

                            var pageX = e.pageX,
                                pageY = e.pageY,
                                halfWidth = _obj.width() / 2,
                                halfHeight = _obj.height() / 2,
                                percentFromCenterX = ( pageX - halfWidth ) / halfWidth,
                                percentFromCenterY = ( pageY - halfHeight ) / halfHeight;

                            if ( _window.outerWidth() > 760 ) {

                                _moveBottom( percentFromCenterX, percentFromCenterY );
                                _moveTop( percentFromCenterX, percentFromCenterY );

                            } else {

                                _imgBottom.css( {
                                    '-webkit-transform': 'translate( -50%, -50% )',
                                    'transform': 'translate( -50%, -50% )'
                                } );

                            }

                        }

                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    // loop: true,
                    autoplay: false,
                    autoplayDisableOnInteraction: false,
                    effect: 'fade',
                    parallax: true,
                    // paginationType: 'bullet',
                    paginationBulletRender: function( index, className, swiper ) {

                        var names = [];

                        $( '.swiper-wrapper .swiper-slide' ).each( function(i) {

                            names.push( $(this).data('name') );

                        } );

                        return '<span class="' + className + '"><span>' + names[index] + '</span></span>';

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
            _moveBottom = function( xPercent, yPercent ) {

                _imgBottom.css( {
                    '-webkit-transform': 'translate( calc( -50% - ' + -( xPercent * _bottomStep ) + 'px ), calc( -50% - ' + -( yPercent * _bottomStep ) + 'px ) )',
                    'transform': 'translate( calc( -50% - ' + -( xPercent * _bottomStep ) + 'px ), calc( -50% - ' + -( yPercent * _bottomStep ) + 'px ) )'
                } );

            },
            _moveTop = function( xPercent, yPercent ) {

                _imgTop.css( {
                    '-webkit-transform': 'translate( calc( -50% - ' + ( xPercent * _topStep ) + 'px ), calc( -50% - ' + ( yPercent * _topStep ) + 'px ) )',
                    'transform': 'translate( calc( -50% - ' + ( xPercent * _topStep ) + 'px ), calc( -50% - ' + ( yPercent * _topStep ) + 'px ) )'
                } );

            },
            _init = function () {

                _onEvents();
                _initSwiper();

            };


        _init();
    };

} )();

