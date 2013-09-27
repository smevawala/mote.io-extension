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
app_name | string | Yes | Appears at the top of the app, as well as in status updates. Keep it short.
action | string | if notify.share is true | The verb that will appear in status updates. Example values are "watching" and "listening to".
twitter | string | if notify.share is true | The @handle mentioned in Twitter share status updates.
display_input | boolean | |  Default is false. Enabling this will show an icon overlay over the web page when a button is tapped.
update | function | | A function called by the plugin javascript to update the remote.
blocks | array | Yes | An array of objects containing the remote layout 

# A note on testing

You are one of the first people to ever use this API. You'll probably break things!

For example, if you send a bad remote config over, you may crash the app or leave it in a bad state. Restaring the app is your best bet. You'll need to completely kill the app and launch it again as it maintains state between open / close.
          
It's annoying to define a remote, launch the app, try it out, and test, etc. 

The mote.io varialbe is accessable from the console, so you can test your functions like this:

```javascript
mote.io.remote.blocks[0].data[0].press();
```

# Block Types

## Notify

Notify is the area in which app notifications are shown. 

![](https://mote.io/images/developers/notify.png)

Property | Type | Required | Notes
--- | --- | --- | ---
type | string | Yes | Must be 'notify'
share | boolean | | Determines if Twitter and Facebook icons are shown. **```mote.io.remote.action``` and ```mote.io.remote.twitter``` must be defined if this is true.**


```javascript
blocks: [
    {
      type: 'notify'
      share: true
    },
    ...
]
```

## Search

Search displays a text box with a search icon

![](https://mote.io/images/developers/search.png)

Property | Type | Required | Notes
--- | --- | --- | ---
type | string | Yes | Must be 'search'
action | function | Yes | A function to be called when the user submits a search query. The query is sent as the first param of the function.

```javascript
blocks: [
  {
    type: 'search',
    action: function(query) {
      alert(query);
    }
  }
  ...
]
```

## Buttons

The buttons type represents a row of buttons.

![](https://mote.io/images/developers/buttons.png)

Property | Type | Required | Notes
--- | --- | --- | ---
type | string | Yes | Must be 'buttons'
data | array | Yes | An array of button objects. Buttons are aligned from left to right but always centered on screen. 

```javascript
blocks: [
  {
    type: 'buttons',
    data: [
      {...},
      {...},
      {...}
    ]
  },
  ...
]
```

The yellow lines here represent individual blocks of buttons.

![](https://mote.io/images/developers/rows_center.png)

### Buttons.data

Data is an array of button objects. Button objects have the following properties:

Property | Type | Required | Notes
--- | --- | --- | ---
press | function | Yes | A function to call when the button is pressed
icon | string | Yes | This is an icon from [font-awesome](http://fortawesome.github.io/Font-Awesome/). Do not provide the text "icon-" as it will be added automatically.
hash | hash | | This is a button identifier used in button updates (read more below)

Here is the middle row of the image above represented in javascript:

```javascript
blocks: [
  {
    type: 'buttons',
    data: [
      {
        press: function () {
          alert('left pressed');
        },
        icon: 'chevron-left'
        hash: 'up'
      },
      {
        press: function () {
          alert('middle pressed');
        },
        icon: 'circle-blank'
        hash: 'go'
      },
      {
        press: function () {
          alert('right pressed');
        },
        icon: 'chevron-right'
        hash: 'right'
      },
    ]
  },
  ...
]
```

## Select

Select represents a select box in the app. 

![](https://mote.io/images/developers/select.png)

Property | Type | Required | Notes
--- | --- | --- | ---
type | string | Yes | Must be 'select'
data | array | Yes | An array of select option objects.

```javascript
{
  type: 'select',
  data: [
    {...},
    {...}
  ]
}
```

### Select.data

Select.data is an array of select option objects. Select option objects have the following properties:

Property | Type | Required | Notes
--- | --- | --- | ---
text | string | Yes | The option text
action | array | Yes | A function to fire when the select button is pressed
optgroup | string | | Groups select option objects under a parent with this value

```javascript
{
  type: 'select',
  data: [
    {
      optgroup: 'Latest',
      text: 'Latest',
      action: function() {
        window.location = "/latest";
      }
    },
    {
      optgroup: 'Latest',
      text: 'Freshest',
      action: function() {
        window.location = "/latest/fresh";
      }
    },
    ...
}
```

# Methods

## Notify

Notify sends information to the notify block about what to display.

![](https://mote.io/images/developers/notify.png)

Parameters | Type | Required | Notes
--- | --- | --- | ---
line1| string | Yes | The first line of text
line2 | string | Yes | The second line of text
image | string | Yes | The url of an image to display next to text. Resized to 50px x 50px
url | string | Yes | A permalink to the current playing item.  **Not the current window.location**, but a link to the single item that is playing right now.
force | boolean | Yes | Pass the value of force from ```mote.io.remote.update(force)```. Must be false if used outside of the ```update()``` context.

```javascript
mote.io.remote =  {
  update: function(force) {
    var thisArtist = $($('#player-nowplaying a')[3]).text(),
      thisSong = $($('#player-nowplaying a')[4]).text(),
      thisImage = extractUrl($('.haarp-active.section-track').find('.readpost > span').css('background-image')),
      thisPerma = window.location.origin + $('.haarp-active.section-track').find('a.track').attr('href');
   
    mote.io.notify(thisArtist, thisSong, thisImage, thisPerma, force);
  }
}
```

## Update Button

The update button method allows you to change the color and icon of a button on a remote.

![](https://mote.io/images/developers/button_update.png)

Parameters | Type | Required | Notes
--- | --- | --- | ---
button_hash| string | Yes | The hash identifier of the button. Make sure you assign this variable in the button object.
icon | string | Yes | The new icon to display.
color | string | Yes | The button icon color. A 6 character hex code like #000000 or #ffffff
force | boolean | Yes | Pass the value of force from ```mote.io.remote.update(force)```. Must be false if used outside of the ```update()``` context.

```javascript
mote.io.remote =  {
  update: function(force) {
    var thisArtist = $($('#player-nowplaying a')[3]).text(),
      thisSong = $($('#player-nowplaying a')[4]).text(),
      thisImage = extractUrl($('.haarp-active.section-track').find('.readpost > span').css('background-image')),
      thisPerma = window.location.origin + $('.haarp-active.section-track').find('a.track').attr('href');
   
    mote.io.notify(thisArtist, thisSong, thisImage, thisPerma, force);
  }
}
```
