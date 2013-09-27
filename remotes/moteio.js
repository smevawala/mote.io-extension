exec(function(){

	mote.io.remote = {
    api_version: '0.1',
    app_name: 'Sync',
    update: function(force) {
      mote.io.notify('Connected Established!', 'Tap to launch Homebase.', 'http://www.terrariaonline.com/attachments/success-kid-jpg.33785/', force);
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
              return false;
            },
            icon: 'off'
          }
        ]
      }
    ]
  };

});
