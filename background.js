
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd == "showActiveIcon") {
        chrome.browserAction.setIcon({
            path: {
                "16": "assets/icon-active-16.png",
                "32": "assets/icon-active-32.png",
                "128": "assets/icon-active-128.png"
            },
            tabId: sender.tab.id
        });
        sendResponse({response: true});
    }
});
