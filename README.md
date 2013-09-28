Mote.io Chrome Extension
=================

# Hey HackNY!

Promo codes for iOS are at the bottom. 

**The internet seems to cut out randomly** which may affect your demo. Mote.io doesn't require a persistant connection, but messages may be dropped or delayed.

You can resolve problems by:

* Log in and out of the app
* Refreshing the webpage

If worse problems occur, I'll explin the connection issues and you can fire commands from console.

-----------
-----------
-----------

Thanks for your interest in building a remote for Mote.io! 

Here's how you can get your remote into the production version of the Mote.io extesion:

* Fork this repository
* Create a remote
* Submit a pull request

I'll review your code, merge your remote in, and then deploy it to the world!

# Development Cycle

Mote.io remotes work by clicking and inspecting objects in the DOM. When a button is pressed on the phone, it fires a function which should probably click something on the page.

It's annoying to define a remote, reload the extension, launch the app, sync, and press the button on the phone just to test if a function works.

Instead, this is how I develop remotes:

1. Test all of my button functions in the Chrome console before even begining to write the config file. This is identical to the environment the functions will be called in when triggered from the phone. If it works in console, it will work in ```mote.io.remote```. These functions can be as simple as ```$('#playerPlay').click();```
1. Create a really simple remote with just buttons and test it on the phone
2. Test functions to find now playing objects / states in the Chrome console (like #1). These may be like: ```$('#now-playing').text().trim();```
2. I go back and add update(), notify(), and updateButton() methods and test it on the phone

You can also fire the button functions manually from the console once they have been added to mote.io.remote like so:
```javascript
mote.io.remote.blocks[0].data[0].press();
```

# Setting up the extension in developer mode

1. [Fork this repository](https://github.com/ianjennings/mote.io-extension/fork)
1. [Disable production extension](https://support.google.com/chrome/answer/187443?hl=en)
1. [Load it as an unpacked extension in Chrome](http://developer.chrome.com/extensions/getstarted.html#unpacked)
1. Visit [the start page](http://mote.io/start) to make sure the unpacked extension works

# Adding your own remote

1. First, create a file in the ```/remotes``` directory with a descriptive name.
1. Then, add an entry to ```manifest.json``` for the site you want to support.

The entry should look something like this:

```javascript
    {
      "matches": [
        "http://www.pandora.com/*"
      ],
      "js": [
        "moteio.js",
        "remotes/pandora.js"
      ],
      "run_at": "document_start"
    }
```

# Reloading and refreshing extension code

Chrome extensions are a hassle to refresh. You need to visit ```chrome://extensions``` and refresh the page to update your extension. You can read more about refreshing extensions [here](http://developer.chrome.com/extensions/getstarted.html#update-code).

You also may try [this extension](https://chrome.google.com/webstore/detail/quick-extension-reload/goeiakeofnlpkioeadcbocfifmgkidpb?hl=en-GB) that adds a shortcut to reload extensions.

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
    init: function() {...}
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
init | function | | A function called after a phone has connected.
update | function | | A function called by the plugin javascript to update the remote.
blocks | array | Yes | An array of objects containing the remote layout .

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
line2 | string |  | The second line of text
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
	
	if($('#playerFav').hasClass('fav-on')) {
	mote.io.updateButton('heart', null, '#ff0000', force);
	} else {
	mote.io.updateButton('heart', null, '#434345', force);
	}

  }
}
```

# Additional Notes

## jQuery

The mote.io plugin provides you with jQuery for free by using the ```jQ``` variable.

## Deferred Loading

A remote is only sent to the client once, when it is found on the webpage. Something like the following will work just fine.

```javascript
setTimeout(function(){
  mote.io.remote = {};
}, 5000);
```



# Promo codes!

```
XL4YEFKLRWX6
FK336NR4KPEE
Y4A9XR34RK3X
7WFK346HW7KR
3MKXYP9NMKX3
MJLJ7HW63NTH
HEWEMJ9EW376
M6FM9RAEF7PP
HXKELPJP3RKW
7RMPHATHNXKE
NTT4LRFYHTYF
4NFA4MEP3P9A
X4EPENHWNFRH
3P4YHMTJE73X
MFHNN3WMTJMP
YAFXHPWHM737
F6AR73NTTN7X
KH4PWJH4HNHX
3XPRTWJXA7RX
F7YJJ33MENF7
PFTREF4WNAF3
WR67Y3PJ7EP9
F4NEFY3JF4TK
T46R3YRAR4AM
RJMPPLYPKPF4
AXLJ947E3463
XEPYALX6AF67
ENXJTF6FYP4Y
NYNLJMRHRAXW
3NLXHWL99K3H
3YHNYNX4KHW3
PT7XLLL69MPY
LP7XYF3H6L4A
HLHXPKJFR6W9
4KEPRFRPE3NH
RL9HJJT93XAN
LKYFAWNTPJ9N
6XARW74XXPM6
NP96HW3PLTX6
R6A3YRKM4L6L
EKXWP43NK6WE
KKL7LPAJ3WK3
XJX6NFKMLARK
W3LP99TN6JFK
XFKTP9JNE4NK
LXY7MEPM7XXA
FAEPXRAY973X
3697H7HPWYWJ
MAFXL6E7HEHM
WPAKXFYLYETA
```
