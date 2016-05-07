
// BEGINNING INSTAGRAM JAVASCRIPT CODE
window.Instagram = {
    /**
     * Store application settings
     */

  // The CONFIGURATION OBJECT ****
    config: {},

      BASE_URL: 'https://api.instagram.com/v1',

      init: function( opt ) {
          opt = opt || {};

          this.config.client_id = "fa639a7c4cc347bf8827cc5d53145ea0";
        },

      /**
       * Get a list of popular media in this location
       */
      popular: function( callback ) {
          var endpoint = this.BASE_URL + 'locations/{location-id}/media/popular?client_id=' + this.config.client_id;
          this.getJSON( endpoint, callback );
      },


      /**
       * Get a list of recently tagged media in this location
       */
      tagsByName: function( name, callback ) {
          var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
          this.getJSON( endpoint, callback );
      },

        getJSON: function( url, callback ) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                success: function( response ) {
                    if ( typeof callback === 'function' ) callback( response );
                }
            });
        }
    };

// INSTAGRAM INITIAL

Instagram.init({
    client_id: 'fa639a7c4cc347bf8827cc5d53145ea0'
});


$( document ).ready(function() {

    Instagram.popular(function( response ) {
        var $instagram = $( '#instagram' );
        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append( '<img src="' + imageUrl + '" />' );
        }
    });

    $( '#form' ).on('submit', function( e ) {
        e.preventDefault();

        var tagName = $( '#search' ).val();
        Instagram.tagsByName(tagName, function( response ) {
            var $instagram = $( '#instagram' );
                $instagram.html('');

            for ( var i = 0; i < response.data.length; i++ ) {
                imageUrl = response.data[i].images.low_resolution.url;
                $instagram.append( '<img src="' + imageUrl + '" />' );
            }
        });

    });

});
// END OF INSTAGRAM JAVASCRIPT CODE
