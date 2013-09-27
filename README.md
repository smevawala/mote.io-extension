Mote.io Chrome Extension
=================

# First things first

Thanks for your interest in building a remote for Mote.io! 

Here's how you can get your remote into the production version of the Mote.io extesion:

* Fork this repository
* Create a remote
* Submit a pull request

I'll review your code, merge your remote in, and then deploy it to the world!

# Building a remote

* Clone this repository
* Load it as an extension in Chrome [follow directions on google site]
* Disable production extension
* Visit http://mote.io/start to make sure it works
 
# Working with manifest.json

* You need to edit manifest.json
* More about path matching on Google Chrome site [..]

# Remote API

You can find many examplees of remotes in the /remotes directory. A remote file looks like so:

```javascript

exec(function(){

  mote.io.remote = {
    api_version: '0.1',
    app_name: 'Vimeo',
    action: 'watching',
    twitter: 'vimeo',
    display_input: true,
    update: function(force) {...},
    blocks: [...]
  };

});

```

Every remote file must be wrapped in the ```exec(function(){...});``` call. 

This function allows the javascript code to run at the document level. This means any variable you define within this function
is going to be in the global scope! 

# Config Variables


Property | Type | Required | Notes
--- | --- | --- | ---
api_version | string | Yes | Should be '0.1'
app_name | string | Yes | Appears at the top of the app, as well as in status updates.
action | string | if notify.share is true | The verb that will appear in status updates. Example values are "watching" and "listening to".
twitter | string | if notify.share is true | The @handle mentioned in Twitter share status updates.
display_input | Boolean | |  Default is false. Enabling this will show an icon overlay over the web page when a button is tapped.
update | function | | A function called by the plugin javascript to update the remote.
blocks | array | Yes | An array of objects containing the remote layout 

hr
p Here we define a variable called moteioConfig. This variable is read by the script tag supplied above when it starts.
script(src='https://gist.github.com/ianjennings/5324439.js')
hr
h3 API version
p For now, the API version should always be '0.1'. Versioning doesn't exist yet.
hr
h3 App Name
p This is the name displayed at the top of the app after sync. Keep it short, there isn't much room there.
hr
h3 Blocks
p Blocks act as rows for your remote.
p This must be an array, and order matters!

        section
          h2 Testing
          hr
          p Remember, this is a rough beta. You are one of the first people to ever use this API. You'll probably break things!
          p For example, if you send a bad remote config over, you may crash the app or leave it in a bad state. Restart the app and you should be good to go.
          p You may see errors pop up on the app. This happens during deployment and other random times. Try logging out and logging back in.
          hr
          h4 Testing Remotes
          p It's annoying to define a remote, launch the app, try it out, and test, etc. You can call moteioConfig functions from the browser window like so:
          script(src='https://gist.github.com/ianjennings/5326374.js')

        section
          h2 Block Types
          hr
          h3 Notify
          p Notify is the area in which app notifications are shown. There are no other parameters besides type.
          p
            img.img-rounded(src='/images/developers/notify.png', width='300')
          script(src='https://gist.github.com/ianjennings/5324464.js')
          hr
          h3 Search
          p Search displays a text box with a search icon
          p The only valid parameter for search is "action"
          p Action must be a function. Action returns the query value as the first parame\.
          p
            img.img-rounded(src='/images/developers/search.png', width='300')
          script(src='https://gist.github.com/ianjennings/5324471.js')
          hr
          h3 Buttons
          p The buttons type represents a row of buttons. The only valid parameter for buttons is an array called "data."
          p
            img.img-rounded(src='/images/developers/buttons.png', width='300')
          h4 Buttons.data
          p Buttons.data is an array of button objects. Buttons are aligned from left to right but always centered on screen. The yellow lines here represent seperate blocks of buttons.
          p
            img.img-rounded(src='/images/developers/rows_center.png', width='150')
          p A button object need the following parameters
          ul
            li press - A function to call when the button is pressed
            li icon - This is an icon from&nbsp;
              a(href='http://fortawesome.github.io/Font-Awesome/') font-awesome&nbsp;
              | . The "icon-" part is stripped out
            li hash - This is optional but needed to reference the button in updates
          script(src='https://gist.github.com/ianjennings/5324485.js')
          hr
          h3 Select
          p Select represents a select box in the app. The only valid parameter for select is "data"
          h4 Select.data
          p Select data is an array of select options. Options can have the following parameters
          ul
            li text - The option text
            li action - A function to fire when the select button is pressed
            li optgroup - A string representing the parent group
          p
            img.img-rounded(src='/images/developers/select.png', width='300')
          script(src='https://gist.github.com/ianjennings/5324490.js')
          hr

        section
          h2 Methods
          hr
          h3 Notify
          p Notify sends information to the notify block about what to display.
          p The notify function takes three parameters
          ul
            li line1 - The first line of text
            li line2 - The second line of text
            li image - An image to display next to text. Resized to 50px x 50px
          p
            img.img-rounded(src='/images/developers/notify.png', width='300')
          script(src='https://gist.github.com/ianjennings/5324448.js')
          hr
          h3 Update Button
          p The update button method allows you to change the color and icon of a button on a remote.
          p The update button function takes three parameters
          ul
            li button hash - The hash identifier of the button. Make sure you assign this variable in the button in config.
            li icon - The new icon to display.
            li color - The button icon color. A 6 character hex code like #000000 or #ffffff
          p
            img.img-rounded(src='/images/developers/button_update.png', width='50')
          script(src='https://gist.github.com/ianjennings/5324497.js')
        section
          h2 Kitchen sink
          hr
          p This is an example config for the Hype Machine app. It uses all available APIs.
          p
            img.img-rounded(src='/images/developers/example_remote.png', width='300')
          script(src='https://gist.github.com/ianjennings/5323006.js')
