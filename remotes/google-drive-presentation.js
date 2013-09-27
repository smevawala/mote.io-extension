exec(function(){

	function next() {
		setSlide(getCurrentPageNumber()+1);
	}
	function previous() {
		setSlide(getCurrentPageNumber()-1);
	}
	function setSlide(num) {
		slides = getSlides();
		if (slideChangeTimeout) clearTimeout(slideChangeTimeout);
		slideChangeTimeout = setTimeout(function() {
			var slideId = slides[num-1]?slides[num-1][0]:'p';
			location.hash="#slide=id."+slideId;
			slideChangeTimeout = null;
		}, 100);
	}
	function getCurrentPageNumber() {
		slides = getSlides();
		var curSlideId = location.hash.split('.')[1];
		for (var i in slides) {
			if (slides[i][0]==curSlideId) return parseInt(i)+1;
		}
		return 1;
	}
	function getSlides() {
		return SK_viewerApp.k[1] || SK_viewerApp.l[1] || SK_viewerApp.n[1] || _getSlides();
	}
	function _getSlides() {
		for (var i in SK_viewerApp) { if (SK_viewerApp[i] && Array.isArray(SK_viewerApp[i][1])) return SK_viewerApp[i][1]; }
		return [];
	}

	mote.io.remote =  {
	  api_version: '0.1',
	  app_name: 'Google Drive',
	  blocks: [
	    {
	      type: 'buttons',
	      data: [
	        {
	          press: function () {
	          	previous();
	          },
	          icon: 'chevron-left',
	          hash: 'left'
	        },
	        {
	          press: function () {
	          	next();
	          },
	          icon: 'chevron-right',
	          hash: 'right'
	        }
	      ]
	    }
	  ]
	}

});
