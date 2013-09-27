exec(function(){

	mote.io.remote = {
    api_version: '0.1',
    app_name: 'Rdio',
    display_input: true,
    twitter: 'rdio',
    action: 'listening to',
    update: function(force) {
      if($('.play_pause').hasClass('playing')) {
        mote.io.updateButton('play', 'pause', null, force);
      } else {
        mote.io.updateButton('play', 'play', null, force);
      }
      mote.io.notify(
      	$('.text_metadata .artist_title').text(),
      	$('.text_metadata .song_title').text(),
      	$('.queue_art').prop('src'),
      	window.location.origin + $('.text_metadata .artist_title').attr('href'),
      	force);
    },
    blocks: [
      {
        type: 'notify',
        share: true
      },
      {
        type: 'buttons',
        data: [
          {
            press: function () {
              $('.prev').click();
            },
            icon: 'backward',
            hash: 'back'
          },
          {
            press: function () {
              $('.play_pause').click();
            },
            icon: 'play',
            hash: 'play'
          },
          {
            press: function () {
              $('.next').click();
            },
            icon: 'forward',
            hash: 'next'
          },
          {
            press: function () {
              $('.shuffle').click();
            },
            icon: 'random',
            hash: 'random'
          }
        ]
      },
    ]
  };

});
