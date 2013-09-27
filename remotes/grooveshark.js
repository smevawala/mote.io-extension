exec(function(){

	mote.io.remote =  {
	  api_version: '0.1',
	  app_name: 'Grooveshark',
	  action: 'listening to',
	  twitter: 'grooveshark',
	  display_input: true,
	  init: function() {

	    function fireWhenReady() {

	      if ($('.play-button').length) {

	        // wait until element exists then wait an additional second for the click handler to be bound
	        // this should actually test if the event exists, this is a lazy way out
	        setTimeout(function(){
	          $('.play-button').click();
	        }, 1000);

	      } else {

	        setTimeout(fireWhenReady, 100);

	      }

	    }
	    fireWhenReady();

	  },
	  update: function(force) {

	    var thisArtist = $('.now-playing-link.artist').text(),
	      thisSong = $('.now-playing-link.song').text(),
	      thisImage = $('#now-playing-image').attr('src'),
	      thisPerma = window.location.origin + $('.now-playing-link.artist').attr('href');

	    mote.io.notify(thisArtist, thisSong, thisImage, thisPerma, force);

	    // transfer button states
	    if($('#play-pause').hasClass('playing')) {
	     mote.io.updateButton('play', 'pause', null, force);
	    }
	    if($('#play-pause').hasClass('paused')) {
	     mote.io.updateButton('play', 'play', null, force);
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
	        if($('#play-pause').hasClass('playing')) {
	          $('#play-pause').click();
	        }
	        window.location = "http://grooveshark.com/search?q=" + encodeURIComponent(query);
	      }
	    },
	    {
	      type: 'buttons',
	      data: [
	        {
	          press: function () {
	            $('#play-prev').click();
	          },
	          icon: 'backward',
	          hash: 'back'
	        },
	        {
	          press: function () {
	            $('#play-pause').click();
	          },
	          icon: 'play',
	          hash: 'play'
	        },
	        {
	          press: function () {
	            $('#play-next').click();
	          },
	          icon: 'forward',
	          hash: 'next'
	        }
	      ]
	    }
	  ]
	};

});
