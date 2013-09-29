exec(function(){
	mote.io.remote = {
    api_version: '0.1',
    app_name: 'Plex',
    action: 'watching',
    twitter: 'plexapp',
    display_input: true,
    update: function(force) {

      if(jwplayer(player).getState() == 'PLAYING') {
        mote.io.updateButton('play', 'pause', null, force);
      } else {
        mote.io.updateButton('play', 'play', null, force);
      }

      if($('.like').hasClass('on')) {
       mote.io.updateButton('heart', null, '#ff0000', force);
      } else {
       mote.io.updateButton('heart', null, '#434345', force);
      }

      mote.io.notify(
        $($('.video-details h2').find('a')[0]).text(),
        $($('.video-details h2').find('a')[1]).text(),
        $('.video-more-details').find('img').prop('src'),
        window.location.href,
        force);
    },
    blocks: [
      {
        type: 'notify',
        share: false
      },
      {
      	type: 'buttons',
      	data: [
          {
            press: function () {
             if(jwplayer(player).getState() == 'PLAYING'){
             	jwplayer(player).pause();
             } else{
             	jwplayer(player).play();
             }
            },
            icon: 'play',
            hash: 'play'
          }
      	]
      },
      {
        type: 'buttons',
        data: [
		 {
            press: function () {
              jwplayer(player).seek(0);
            },
            icon: 'fast-backward' 
          },
          {
            press: function () {
              jwplayer(player).seek(jwplayer(player).getPosition()-50);
            },
            icon: 'backward'
          },
          {
            press: function () {
             jwplayer(player).seek(jwplayer(player).getPosition()+50);
            },
            icon: 'forward'
          },
          {
            press: function () {
              alert("Skip");
            },
            icon: 'fast-forward'
          }
        ]
      },
      {
        type: 'buttons',
        data: [
          {
            press: function () {
              alert("Going home");
            },
            icon: 'home' 
          },
          {
            press: function () {
            	if(jwplayer(player).getVolume()>10){
            		jwplayer(player).setVolume(jwplayer(player).getVolume()-10);
            	} else{
            		jwplayer(player).setVolume(0);
            	}
            },
            icon: 'volume-down'
          },
          {
            press: function () {
          		if(jwplayer(player).getVolume()<90){
            		jwplayer(player).setVolume(jwplayer(player).getVolume()+10);
            	} else{
            		jwplayer(player).setVolume(100);
            	}
            },
            icon: 'volume-up'
          }
        ]
      },
      {
      	type: 'select',
      	title: 'Change Media',
      	data: [
	      	{
		      optgroup: 'Video',
		      text: 'TV Shows',
		      action: function() {
	          	alert("Change to TV");
	          }
	      	},
			{
				optgroup: 'Video',
				text: 'Movies',
				action: function(){
					alert("Change to Movies");
				}	
			},
			{
				optgroup: 'Music',
				text: 'Awesome Music',
				action: function(){
					alert("You don't have any music");
				}
			}
      	]
      }
    ]
  };

});
