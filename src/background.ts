import browser = require('webextension-polyfill');

const reloadTab = (tabId: number) => {
    if (!tabId) {
        return false;
    }
    console.log('reloading tab: ', tabId);
    setTimeout(() => {
        browser.tabs.reload(tabId, { bypassCache: true });
    }, 100);
    return true;
};

browser.runtime.onMessage.addListener((message: any, sender: any) => {
    console.log('received message: ', message);
    const { type } = message as { type: string;};
    if (!type) {
        return Promise.reject('Invalid type');
    }

    switch (type) {
        case 'c2b-get-current-tab':
            return Promise.resolve({ tab: sender.tab, sender: 'background.js' });
        case 'c2b-reload-me':
            if (reloadTab(sender.tab.id)) {
                return Promise.resolve(true);
            }
            break;
        default:
            return;
    }
    return;
});

browser.runtime.onStartup.addListener(async () => {
    browser.storage.local.clear();
});
