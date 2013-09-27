function updateIcon() {
  chrome.tabs.create({'url': 'https://mote.io/start'}, function(tab) {
    // Tab opened.
  });
}

chrome.browserAction.onClicked.addListener(updateIcon);
