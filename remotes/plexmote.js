exec(function(){
  var pflag = false; // var mediaList = $('ul.tile-list.media-tile-list li');
  var mIndex = -1;
  //.css({'border':'5px solid #ff9d00'})

  mote.io.remote = {
    api_version: '0.1',
    app_name: 'Plex',
    action: 'watching',
    twitter: 'plexapp',
    display_input: false,
    update: function(force) {

      //mote.io.reciever.sendRemote
      if(pflag){
        if(jwplayer(player).getState() == 'PLAYING' ) {
          mote.io.updateButton('play', 'pause', null, force);
        } else {
          mote.io.updateButton('play', 'play', null, force);
        }

        mote.io.notify(
          $($('.video-details h2').find('a')[0]).text(),
          $($('.video-details h2').find('a')[1]).text(),
          $('.video-more-details').find('img').prop('src'),
          window.location.href,
          force);
      }
    },
    blocks: [
      {
        type: 'search',
        action: function(query){
          window.location = "#!/search/" + encodeURIComponent(query);
          mIndex = -1;
        }
      },
      {
        type: 'buttons',
        data: [
          {
            press: function () {
              alert("going up");
            },
            icon: 'chevron-up' 
          }
        ]
      },
      {
        type: 'buttons',
        data: [
          {
            press: function () {
              if(mIndex > 0){
                
                $($('.tile-list li').find('a .poster-container')[mIndex]).css({'outline':''})
                mIndex--;
              }
              $($('.tile-list li').find('a .poster-container')[mIndex]).css({'outline':'5px solid #ff9d00'})

            },
            icon: 'chevron-left' 
          },
          {
            press: function () {
              if($('.play-btn').length != 0){
                window.location = $('.play-btn').attr('href');
              } else {
                window.location = $($('.tile-list li a')[mIndex]).attr('href');
                mIndex = -1;
              }
            },
            icon: 'circle'
          },
          {
            press: function () {
              if(mIndex < $('.tile-list li').length-1){
                if(mIndex != -1){
                  $($('.tile-list li').find('a .poster-container')[mIndex]).css({'outline':''})
                }
                mIndex++; 
              }
              $($('.tile-list li').find('a .poster-container')[mIndex]).css({'outline':'5px solid #ff9d00'})
            },
            icon: 'chevron-right'
          }
        ]
      },
      {
        type: 'buttons',
        data: [
          {
            press: function () {
              if($('.glyphicon.left-arrow').length != 0){
                $('.glyphicon.left-arrow').click() 
                mIndex = -1; 
              }
            },
            icon: 'reply' 
          },
          {
            press: function () {
              alert("go down");
            },
            icon: 'chevron-down'
          },
          {
            press: function () {
              return 0;
            },
            icon: 'refresh'
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






/////////////////////////////////////////////






// 	mote.io.remote = {
//     api_version: '0.1',
//     app_name: 'Plex',
//     action: 'watching',
//     twitter: 'plexapp',
//     display_input: true,
//     update: function(force) {

//     	//mote.io.reciever.sendRemote
//       if(jwplayer(player).getState() == 'PLAYING') {
//         mote.io.updateButton('play', 'pause', null, force);
//       } else {
//         mote.io.updateButton('play', 'play', null, force);
//       }

//       mote.io.notify(
//         $($('.video-details h2').find('a')[0]).text(),
//         $($('.video-details h2').find('a')[1]).text(),
//         $('.video-more-details').find('img').prop('src'),
//         window.location.href,
//         force);
//     },
//     blocks: [
//       {
//         type: 'notify',
//         share: false
//       },
//       {
//       	type: 'buttons',
//       	data: [
//           {
//             press: function () {
//              if(jwplayer(player).getState() == 'PLAYING'){
//              	jwplayer(player).pause();
//              } else{
//              	jwplayer(player).play();
//              }
//             },
//             icon: 'play',
//             hash: 'play'
//           }
//       	]
//       },
//       {
//         type: 'buttons',
//         data: [
// 		 {
//             press: function () {
//             	if(jwplayer(player).getPosition() > 600){
//             		jwplayer(player).seek(jwplayer(player).getPosition()-600);
//             	} else{
//             		jwplayer(player).seek(0);
//             	}
//             },
//             icon: 'fast-backward' 
//           },
//           {
//             press: function () {
//             	if(jwplayer(player).getPosition() > 30){
//             		jwplayer(player).seek(jwplayer(player).getPosition()-30);
//             	} else{
//             		jwplayer(player).seek(0);
//             	}
//             },
//             icon: 'backward'
//           },
//           {
//             press: function () {
//             	if(jwplayer(player).getPosition() < (jwplayer(player).getDuration()-30) ){
//             		jwplayer(player).seek(jwplayer(player).getPosition() + 30);
//             	} else{
//             		jwplayer(player).seek(jwplayer(player).getDuration()-1);
//             	}
//             },
//             icon: 'forward'
//           },
//           {
//             press: function () {
//             	if(jwplayer(player).getPosition() < (jwplayer(player).getDuration()- 600) ){
//             		jwplayer(player).seek(jwplayer(player).getPosition() + 600);
//             	} else{
//             		jwplayer(player).seek(jwplayer(player).getDuration()-1);
//             	}
//             },
//             icon: 'fast-forward'
//           }
//         ]
//       },
//       {
//         type: 'buttons',
//         data: [
//           {
//             press: function () {
//             	window.location = "#!/dashboard";
//             },
//             icon: 'home' 
//           },
//           {
//             press: function () {
//             	if(jwplayer(player).getVolume()>10){
//             		jwplayer(player).setVolume(jwplayer(player).getVolume()-10);
//             	} else{
//             		jwplayer(player).setVolume(0);
//             	}
//             },
//             icon: 'volume-down'
//           },
//           {
//             press: function () {
//           		if(jwplayer(player).getVolume()<90){
//             		jwplayer(player).setVolume(jwplayer(player).getVolume()+10);
//             	} else{
//             		jwplayer(player).setVolume(100);
//             	}
//             },
//             icon: 'volume-up'
//           }
//         ]
//       },
//       {
//       	type: 'select',
//       	title: 'Change Media',
//       	data: [
// 	      	{
// 		      optgroup: 'Video',
// 		      text: 'TV Shows',
// 		      action: function() {
// 	          	alert("Change to TV");
// 	          }
// 	      	},
// 			{
// 				optgroup: 'Video',
// 				text: 'Movies',
// 				action: function(){
// 					alert("Change to Movies");
// 				}	
// 			},
// 			{
// 				optgroup: 'Music',
// 				text: 'Awesome Music',
// 				action: function(){
// 					alert("You don't have any music");
// 				}
// 			}
//       	]
//       }
//     ]
//   };




// setInterval(function(){
//     var parts = window.location.href.split("/");
//     if(pflag ==false && parts[9] =="player"){
//       alert('Player');
//       pflag = true;
//     } else if(pflag ==true && parts[9] != "player"){
//       pflag=false;
//     }

//   },3000)









});
