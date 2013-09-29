exec(function(){
	mote.io.remote = {
    api_version: '0.1',
    app_name: 'Plex',
    action: 'watching',
    twitter: 'plexapp',
    display_input: true,
    update: function(force) {

      if($('.play_pause_button').hasClass('playing')) {
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
             alert("Play/Pause");
            },
            icon: 'play'
          }
      	]
      },
      {
        type: 'buttons',
        data: [
		 {
            press: function () {
              alert("Restart Vid");
            },
            icon: 'fast-backward' 
          },
          {
            press: function () {
              alert("Go back 10 sec");
            },
            icon: 'backward'
          },
          {
            press: function () {
             alert("Go forward 10 sec");
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
              alert("Lowering Volume");
            },
            icon: 'volume-down'
          },
          {
            press: function () {
              alert("Raising Volume");
            },
            icon: 'volume-up'
          }
        ]
      }
    ]
  };

});
