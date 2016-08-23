( function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
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

            text += '</span>';

            return text;
        }
    });
} )();