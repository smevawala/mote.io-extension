exec(function(){

	function extractUrl(input) {
	  // remove quotes and wrapping url()
	  if (typeof input !== "undefined") {
	   return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
	  } else {
	   return;
	  }
	}

	mote.io.remote =  {
	  api_version: '0.1',
	  app_name: 'Hype Machine',
	  action: 'listening to',
	  twitter: 'hypem',
	  display_input: true,
	  init: function() {
	    if(!$('#playerPlay').hasClass('pause')) {
	      $('#playerPlay').click();
	    }
	  },
	  update: function(force) {

	    if($('.haarp-active.section-track').length > 0) {
	      active = $('.haarp-active.section-track');
	    } else {
	      active = $($('.section-track')[0]);
	    }

	    var thisArtist = $($('#player-nowplaying a')[3]).text(),
	      thisSong = $($('#player-nowplaying a')[4]).text(),
	      thisImage = extractUrl(active.find('.readpost > span').css('background-image')),
	      thisPerma = window.location.origin + active.find('a.track').attr('href');

	    mote.io.notify(thisArtist, thisSong, thisImage, thisPerma, force);

	    // transfer button states
	    if($('#playerPlay').hasClass('play')) {
	     mote.io.updateButton('play', 'play', null, force);
	    }
	    if($('#playerPlay').hasClass('pause')) {
	     mote.io.updateButton('play', 'pause', null, force);
	    }
	    if($('#playerFav').hasClass('fav-on')) {
	     mote.io.updateButton('heart', null, '#ff0000', force);
	    } else {
	     mote.io.updateButton('heart', null, '#434345', force);
	    }

	  },
	  blocks: [
	    {
	      type: 'notify',
	      share: true
	    },
	    {
	      type: 'search',
	      action: function(query) {
	        window.location = "/search/" + encodeURIComponent(query) + "/1/";
	      }
	    },
	    {
	      type: 'buttons',
	      data: [
	        {
	          press: function () {
	            $('#playerPrev').click();
	          },
	          icon: 'backward',
	          hash: 'back'
	        },
	        {
	          press: function () {
	            $('#playerPlay').click();
	          },
	          icon: 'play',
	          hash: 'play'
	        },
	        {
	          press: function () {
	            if($('#overlay').is(':visible')) {
	              $('#close').click();
	            } else {
	              $('#playerFav').click();
	            }
	          },
	          icon: 'heart',
	          hash: 'heart'
	        },
	        {
	          press: function () {
	            $('#playerNext').click();
	          },
	          icon: 'forward',
	          hash: 'next'
	        }
	      ]
	    },
	    {
	      type: 'select',
	      title: 'Change Playlist',
	      data: [
	        {
	          optgroup: 'Latest',
	          text: 'Latest',
	          action: function() {
	            window.location = "/latest";
	          }
	        },
	        {
	          optgroup: 'Latest',
	          text: 'Freshest',
	          action: function() {
	            window.location = "/latest/fresh";
	          }
	        },
	        {
	          optgroup: 'Latest',
	          text: 'Remixes Only',
	          action: function() {
	            window.location = "/latest/remix";
	          }
	        },
	        {
	          optgroup: 'Latest',
	          text: 'No Remixes',
	          action: function() {
	            window.location = "/latest/noremix";
	          }
	        },
	        {
	          optgroup: 'Latest',
	          text: 'Blogs in USA',
	          action: function() {
	            window.location = "/latest/us";
	          }
	        },
	        {
	          optgroup: 'Popular',
	          text: 'Now',
	          action: function() {
	            window.location = "/popular";
	          }
	        },
	        {
	          optgroup: 'Popular',
	          text: 'Last Week',
	          action: function() {
	            window.location = "/popular/lastweek";
	          }
	        },
	        {
	          optgroup: 'Popular',
	          text: 'Remixes Only',
	          action: function() {
	            window.location = "/popular/remix";
	          }
	        },
	        {
	          optgroup: 'Popular',
	          text: 'No Remixes',
	          action: function() {
	            window.location = "/popular/noremix";
	          }
	        },
	        {
	          optgroup: 'Popular',
	          text: 'Artists',
	          action: function() {
	            window.location = "/popular/artists";
	          }
	        },
	        {
	          optgroup: 'Popular',
	          text: 'On Twitter',
	          action: function() {
	            window.location = "/popular/twitter";
	          }
	        }
	      ]
	    }
	  ]
	};

});
