let sectionsToRemove = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'hideInterfaceSections') {
        hideInterfaceSections();
    }
});

function hideInterfaceSections() {
    chrome.storage.sync.get(null, function(items) {
        for (var key in items) {
            checkLocalstorageValue(key, items[key]);
        }

        sectionsToRemove.forEach((item) => {
            waitForElement(item).then((element) => {
                removeHtmlSection(element);
            });
        })
    });
}

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function removeHtmlSection(element){
    if (element == null) {
        return;
    }

    element.style.display = "none";
}

function checkLocalstorageValue(key, value) {
    if (value === 'disable') {
        switch (key) {
            case 'mainSection':
                sectionsToRemove.push('#contents');
                sectionsToRemove.push('#header.ytd-rich-grid-renderer');
                break;
            case 'sidenavItems':
                sectionsToRemove.push('a#endpoint[title=Shorts]');
                sectionsToRemove.push('.ytd-guide-renderer:nth-child(3)');
                sectionsToRemove.push('.ytd-guide-renderer:nth-child(4)');
                break;
            case 'commentsSection':
                sectionsToRemove.push('#comments');
                break;
            case 'suggestVideosSection':
                sectionsToRemove.push('#items.ytd-watch-next-secondary-results-renderer');
                break;
            default:
                break;
        }
    }
}