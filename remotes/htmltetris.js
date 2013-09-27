exec(function(){

	mote.io.remote =  {
	  api_version: '0.1',
	  app_name: 'Tetris',
	  blocks: [
	    {
	      type: 'buttons',
	      data: [
	        {
	          press: function () {
	            moves[5]();
	          },
	          icon: 'undo',
	        },
	        {
	          press: function () {
	            moves[4]();
	          },
	          icon: 'repeat',
	        }
	      ]
	    },
	    {
	      type: 'buttons',
	      data: [
	        {
	          press: function () {
	            moves[0]();
	          },
	          icon: 'chevron-left'
	        },
	        {
	          press: function () {
	            moves[6]();
	          },
	          icon: 'circle-blank'
	        },
	        {
	          press: function () {
	            moves[2]();
	          },
	          icon: 'chevron-right'
	        }
	      ]
	    }
	  ]
	};

});
