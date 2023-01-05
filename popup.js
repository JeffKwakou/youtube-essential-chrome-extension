function onClickCheckbox(event) {
    chrome.storage.sync.set({[event.target.id]: event.target.checked ? 'disable' : 'enable'}, function() {
        chrome.tabs.query({url: "https://www.youtube.com/*"}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    });
}

chrome.storage.sync.get(null,function(tabs) {
    for (var key in tabs) {
        document.getElementById(key).checked = tabs[key] === 'disable';
    }
});

// Handle click event on checkboxes
document.getElementById('mainSection').addEventListener('click', onClickCheckbox);
document.getElementById('sidenavItems').addEventListener('click', onClickCheckbox);
document.getElementById('commentsSection').addEventListener('click', onClickCheckbox);
document.getElementById('suggestVideosSection').addEventListener('click', onClickCheckbox);