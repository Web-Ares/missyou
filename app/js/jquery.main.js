( function(){

    $( function() {
        'use strict';

        new Preloader( $('.preloader') );

        $.each( $('.site__header'), function () {

            new Menu( $(this) );

        } );


        $.each( $('.language'), function () {

            new Language( $(this) );

        } );

        $.each( $('.contact__google-map'), function () {

            new Location( $(this) );

        } );

    } );

    var Preloader = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _preloader = obj,
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function(){
                        _showSite();
                    }
                } );

            },
            _init = function () {
                _body[0].preloader = _self;
                _addEvents();
            },
            _showSite = function(){
                _preloader.addClass('preloader_loaded');

                setTimeout(function(){
                    _preloader.remove();
                    $('.site').addClass( 'site__loaded' );

                    $.each( $('.animate-block'), function () {

                        new Slides( $(this) );

                    } );
                    //$.each( $('.collection'), function () {
                    //
                    //    new Collections( $(this) );
                    //
                    //} );
                    //
                    //$.each( $('.collection-previews'), function () {
                    //
                    //    new Collections( $(this) );
                    //
                    //} );
                    //
                    //$.each( $('.collection-single'), function () {
                    //
                    //    new Collections( $(this) );
                    //
                    //} );

                },500);
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window),
            _menuBtn = _obj.find('.site__header-btn'),
            _menu = _obj.find('.site__menu'),
            _action = false,
            _lastPos;

        //private methods
        var _closeMenu = function() {

                _menuBtn.removeClass( 'active' );
                _menu.removeClass( 'opened' );
                $('html').css( {
                    'overflow-y': 'scroll'
                } );

            },
            _checkScroll = function( direction ) {

                if( direction > 0 && !_obj.hasClass( 'site__header_hidden' ) && !_menuBtn.hasClass( 'active' ) && _action ){

                    _obj.addClass( 'site__header_hidden' );
                    $( '.language' ).removeClass( 'active' )

                }

                if( direction < 0 && _obj.hasClass( 'site__header_hidden' ) && !_menuBtn.hasClass( 'active' )  && _action ){

                    _obj.removeClass('site__header_hidden');

                }

            },
            _onEvents = function () {

                _menuBtn.on( {

                    click: function () {

                        if( _menuBtn.hasClass( 'active' ) ) {

                            _closeMenu();


                        } else {

                            _openMenu();

                        }

                        return false;

                    }

                } );
                _window.on( {
                    'scroll': function () {

                        _action = _window.scrollTop() >= _obj.innerHeight();

                        if( _action ) {

                            _obj.addClass( 'site__header_fixed' );

                        } else {

                            _obj.removeClass( 'site__header_fixed' );

                        }

                    },
                    'DOMMouseScroll': function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( direction );

                        }

                    },
                    'mousewheel': function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( direction );

                        }

                    }
                    //,
                    //'touchmove': function ( e ) {
                    //
                    //    var currentPos = e.originalEvent.touches[0].clientY;
                    //
                    //    if ( currentPos > _lastPos ) {
                    //
                    //        _checkScroll( -1 );
                    //
                    //
                    //    } else if ( currentPos < _lastPos ) {
                    //
                    //        _checkScroll( 1 );
                    //
                    //    }
                    //
                    //    _lastPos = currentPos;
                    //
                    //}

                } );

            },
            _openMenu = function() {

                _menuBtn.addClass( 'active' );
                _menu.addClass( 'opened' );
                $('html').css( {
                    'overflow-y': 'hidden'
                } );

            },
            _init = function () {

                _onEvents();
                _obj[0].obj = _self;

            };


        _init();
    };

    var Slides = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window);

        //private methods
        var _addEvents = function () {
                _window.on( {
                    scroll: function () {

                        _checkScroll();

                    }
                } );
            },
            _checkScroll = function() {

                var curScroll = _window.scrollTop(),
                    windowH = _window.height(),
                    topPos = _obj.offset().top,
                    topInWindow = topPos-curScroll,
                    visiblePercent = 1-( topInWindow/windowH );

                if( visiblePercent > .3 ){

                    if( !_obj.hasClass('animate-block_active') ){

                        _obj.addClass('animate-block_active');

                    }

                }

            },
            _init = function () {
                _obj[0].slides = _self;
                _checkScroll();
                _addEvents();

            };

        //public properties

        //public methods


        _init();
    };

    var Collections = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.collection__previews-item'),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _window.on( {
                    scroll: function () {

                        _checkScroll();

                    }
                } );

            },
            _checkScroll = function() {

                if( _obj.hasClass('animate-block_active') ){

                    if( _obj.hasClass('collection-previews') ) {

                        _obj.find('.collection-previews__item').each( function( i ) {

                            _showNewItems( $( this ), i );

                        } );

                    } else  if( _obj.hasClass('collection-single') ) {

                        _obj.find('.collection-single__product').each( function( i ) {

                            _showNewItems( $( this ), i );

                        } );

                    } else {

                        _obj.find('.collection__previews-item').each( function( i ) {

                            _showNewItems( $( this ), i );

                        } );

                    }

                }

            },
            _showNewItems = function( item, index ) {

                setTimeout( function() {

                    item.addClass('visible');

                }, index * 150 );

            },
            _init = function () {

                _obj[0].slides = _self;
                _checkScroll();
                _addEvents();

            };

        //public properties

        //public methods


        _init();
    };

    var Location = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            mapName = _obj.attr('id'),
            mapLat = _obj.data('map-lat'),
            mapLng = _obj.data('map-lng'),
            iconPath = _obj.data('icon-path'),
            mapZoom = _obj.data('map-zoom'),
            myLatLng = { lat: _obj.data('map-lat'), lng: _obj.data('map-lng') },
            _window = $( window ),
            map,
            tileListener,
            marker,
            deltaY = 1.4;

        //private methods
        var _addEvents = function () {

                google.maps.event.addDomListener( window, 'resize', function() {

                    map.setCenter( myLatLng );

                    if( _window.width() < 1024 ) {

                        _offsetCenter( map.getCenter(), 0, 0);

                    } else {

                        _offsetCenter( map.getCenter(), 200, 0);

                    }

                } );

            },
            _initMap = function () {

                var customMapType = new google.maps.StyledMapType( [

                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    }

                ], {
                    name: 'Custom Style'
                } );

                var customMapTypeId = 'custom_style';

                map = new google.maps.Map( document.getElementById('contact-google-map'), {
                    zoom: mapZoom,
                    disableDefaultUI: true,
                    scrollwheel: false,
                    center: { lat: mapLat, lng: mapLng },
                    mapTypeControlOptions: {
                        mapTypeIds: [ google.maps.MapTypeId.ROADMAP, customMapTypeId ]
                    }
                } );

                var beachMarker = new google.maps.Marker( {
                    position: { lat: mapLat, lng: mapLng },
                    map: map,
                    icon: iconPath
                } );

                map.mapTypes.set( customMapTypeId, customMapType );
                map.setMapTypeId( customMapTypeId );

                google.maps.event.addListenerOnce(map, 'idle', function() {

                    map.setCenter( myLatLng );

                    if( _window.width() < 1024 ) {

                        _offsetCenter( map.getCenter(), 0, 0);

                    } else {

                        _offsetCenter( map.getCenter(), 200, -100);

                    }


                } );

            },
            _offsetCenter = function ( latlng, offsetx, offsety ) {

                var scale = Math.pow( 2, map.getZoom() ),
                    worldCoordinateCenter = map.getProjection().fromLatLngToPoint( latlng ),
                    pixelOffset = new google.maps.Point( ( offsetx/scale ) || 0, ( offsety/scale ) || 0 ),
                    worldCoordinateNewCenter = new google.maps.Point(

                        worldCoordinateCenter.x - pixelOffset.x,
                        worldCoordinateCenter.y + pixelOffset.y

                    ),

                    newCenter = map.getProjection().fromPointToLatLng( worldCoordinateNewCenter );

                map.setCenter( newCenter );

            },
            _init = function () {

                google.maps.event.addDomListener( window, 'load', _initMap );
                _addEvents();

            };

        _init();
    };

    var Language = function (obj) {

        //private properties
        var _obj = obj,
            _body = $( 'body'),
            _btn = _obj.find( '.language__curent' );

        //private methods
        var _onEvents = function () {

                _body.on({
                    'click': function( e ) {
                        _obj.removeClass( 'active' )
                    }
                })

                _obj.on({
                    'click': function( e ) {
                        e.stopPropagation();
                    }
                })

                _btn.on({
                    'click': function( e ) {
                        e.stopPropagation();

                        if ( _obj.hasClass( 'active' ) ){
                            _obj.removeClass( 'active' )
                        } else {
                            _obj.addClass( 'active' )
                        }

                    }
                })

            },
            _init = function () {

                _onEvents();

            };


        _init();
    };

} )();

