let settings = {
    mainSection: "disable",
    sidenavItems: "disable",
    commentsSection: "disable",
    suggestVideosSection: "disable"
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(settings, function() {
        console.log("Les valeurs ont été stockées.");
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        if (tab.url.includes("youtube.com")) {
            chrome.tabs.sendMessage(tabId, {message: 'hideInterfaceSections'});
        }
    }
});