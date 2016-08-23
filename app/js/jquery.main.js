( function(){

    $( function() {
        'use strict';

        new Preloader( $('.preloader') );

        $.each( $('.site__header'), function () {

            new Menu( $(this) );

        } );

        $.each( $('.google-map'), function () {

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
                    $.each( $('.collection'), function () {

                        new Collections( $(this) );

                    } );

                    $.each( $('.collection-previews'), function () {

                        new Collections( $(this) );

                    } );

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
            _menu = _obj.find('.site__menu');

        //private methods
        var _closeMenu = function() {

                _menuBtn.removeClass( 'active' );
                _menu.removeClass( 'opened' );
                $('html').css( {
                    'overflow-y': 'scroll'
                } );

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

                    } else {

                        _obj.find('.collection__previews-item').each( function( i ) {
                            _showNewItems( $( this ), i );
                        } );

                    }

                }

            },
            _showNewItems = function( item, index ){

                setTimeout( function() {
                    item.css( {
                        opacity: 1
                    } )
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
            mapTitle = _obj.data('map-title');

        //private methods
        var _addEvents = function () {
            },
            _initMap = function () {
                var customMapType = new google.maps.StyledMapType([
                    {
                        stylers: [
                            {hue: '#f6d38a'},
                            {visibility: 'simplified'},
                            {gamma: 1},
                            {weight: 1}
                        ]
                    },
                    {
                        //featureType: 'water',
                        //stylers: [{color: '#f2dcad'}]
                    }
                ], {
                    name: 'Custom Style'
                });
                var customMapTypeId = 'custom_style';

                var map = new google.maps.Map(document.getElementById('contact-google-map'), {
                    zoom: mapZoom,
                    center: {lat: mapLat, lng: mapLng},
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
                    }
                });

                var beachMarker = new google.maps.Marker({
                    position: {lat: mapLat, lng: mapLng},
                    map: map,
                    icon: iconPath
                });

                map.mapTypes.set(customMapTypeId, customMapType);
                map.setMapTypeId(customMapTypeId);

            },
            _init = function () {
                _addEvents();
                google.maps.event.addDomListener(window, 'load', _initMap);
            };

        _init();
    };

} )();

