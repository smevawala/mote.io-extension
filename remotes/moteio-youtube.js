exec(function(){

	mote.io.remote = {
    api_version: '0.1',
    app_name: 'Youtube',
    action: 'watching',
    twitter: 'youtube',
    display_input: true,
    update: function(force) {

      if(app.player.getPlayerState() == 1) {
        mote.io.updateButton('play', 'pause', null, force);
      } else {
        mote.io.updateButton('play', 'play', null, force);
      }

      mote.io.notify(
        $('#video-category').text().trim() + ' Videos',
        $('#video-title').text().trim(),
        app.requests[app.activeCategory].results[app.player.getPlaylistIndex()]['media$group']['media$thumbnail'][0].url,
        app.player.getVideoUrl(),
        force);

    },
    blocks: [
      {
        type: 'notify',
        share: true
      },
			{
        type: 'search',
        action: function(q) {
          app.search(q);
        }
      },
      {
        type: 'buttons',
        data: [
          {
            press: function () {
            	app.previousVideo();
            },
            icon: 'fast-backward'
          },
          {
            press: function () {
            	 if(app.player.getPlayerState() == 1) {
            	 	app.player.pauseVideo();
            	 } else {
            	 	app.player.playVideo();
            	 }
            },
            icon: 'pause',
            hash: 'play'
          },
          {
            press: function () {
            	app.nextVideo();
            },
            icon: 'fast-forward'
          },
          {
            press: function () {
            	app.showInfo();
            },
            icon: 'info-sign'
          }
        ]
      },
      {
        type: 'select',
        data: [{
		      text: 'Trending',
		      action: function() {
		        app.changeCategory(0);
		      }
		    },
		    {
		      text: 'Most Popular',
		      action: function() {
		        app.changeCategory(12);
		      }
		    },
		    {
		      text: 'Music',
		      action: function() {
		        app.changeCategory(1);
		      }
		    },
		    {
		      text: 'Gaming',
		      action: function() {
		        app.changeCategory(2);
		      }
		    },
		    {
		      text: 'Sports',
		      action: function() {
		        app.changeCategory(3);
		      }
		    },
		    {
		      text: 'Film & Animation',
		      action: function() {
		        app.changeCategory(4);
		      }
		    },
		    {
		      text: 'Entertainment',
		      action: function() {
		        app.changeCategory(5);
		      }
		    },
		    {
		      text: 'News & Politics',
		      action: function() {
		        app.changeCategory(6);
		      }
		    },
		    {
		      text: 'People & Blogs',
		      action: function() {
		        app.changeCategory(7);
		      }
		    },
		    {
		      text: 'Science & Technology',
		      action: function() {
		        app.changeCategory(8);
		      }
		    },
		    {
		      text: 'Howto & Style',
		      action: function() {
		        app.changeCategory(9);
		      }
		    },
		    {
		      text: 'Education',
		      action: function() {
		        app.changeCategory(10);
		      }
		    },
		    {
		      text: 'Pets & Animals',
		      action: function() {
		        app.changeCategory(11);
		      }
		    }
		  ]
      }
    ]
  };

});
