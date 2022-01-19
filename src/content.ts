import { defaultInterval } from "./utils/settings";
import browser = require('webextension-polyfill');

let timeout: number;

const clearTimer = () => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
    }
}

const requestReload = () => {
    clearTimer();
    timeout = setTimeout(() => {
        browser.runtime.sendMessage(
            { type: 'c2b-reload-me' }
        );
    }, defaultInterval * 1000);
}

const reloadIfStarted = async () => {
    const { tab }: { tab: browser.Tabs.Tab, sender: string } = await browser.runtime.sendMessage(
        { type: 'c2b-get-current-tab' }
    );
    if (!tab || !tab.id) {
        return;
    }
    const { settings } = await browser.storage.local.get(['settings']);
    if (settings && settings[tab.id]) {
        // non-blocking?
        requestReload();
    } else {
        return;
    }
}


browser.runtime.onMessage.addListener(async (message: any, sender: browser.Runtime.MessageSender) => {

    switch (message.type) {
        case 'p2c-stop':
            clearTimer();
            return Promise.resolve(true);
        case 'p2c-start':
            requestReload();
            return Promise.resolve(true);
        default:
            break;
    }
    return;
});

reloadIfStarted();