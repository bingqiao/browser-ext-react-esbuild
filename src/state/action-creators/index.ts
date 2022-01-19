import { Dispatch } from "redux";
import { Settings } from "../../utils/settings";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { RootState } from "../reducers";
import browser = require('webextension-polyfill');

const persistWindowSettings = async (settings: Settings) => {
    await browser.storage.local.set({
        settings: settings
    });
}

export const fetchSettings = () => {
    return async (dispatch: Dispatch<Action>) => {
        // 1. get tab id, and default settings storage
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        });
        if (!tabs || tabs.length <= 0) {
            return;
        }
        const currentTab = tabs[0];
        if (!currentTab.windowId) {
            return;
        }
        if (!currentTab.id) {
            return;
        }
        let storageSettings = await browser.storage.local.get(['settings']);

        if (!storageSettings.settings) {
            storageSettings.settings = {};
        }


        // 2. if successful, update store
        dispatch({
            type: ActionType.FETCH_SETTINGS, payload: {
                currentTab: currentTab.id,
                currentWindow: currentTab.windowId,
                loaded: true,
                settings: storageSettings.settings
            }
        });
    };
};

export const startAutoReload = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
        const { settingsState: { currentTab, currentWindow, settings } } = getState();
        const tabSettingsMapToUpdate = JSON.parse(JSON.stringify(settings)) as Settings;
        try {
            // 1. Update storage
            tabSettingsMapToUpdate[currentTab] = true;
            await persistWindowSettings(tabSettingsMapToUpdate);
            // 2. Send reload command to content
            const res = await browser.tabs.sendMessage(
                currentTab,
                {
                    type: 'p2c-start'
                }
            );
            // 3. If successful (no exception), update store
            if (res) {
                dispatch({ type: ActionType.START_AUTO_RELOAD });
            } else {
            }
        } catch (e: any) {
            console.error('Failed to start auto reload', e);
        }
    };
};

export const stopAutoReload = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
        const { settingsState: { currentWindow, currentTab, settings } } = getState();
        const tabSettingsMapToUpdate = JSON.parse(JSON.stringify(settings)) as Settings;

        // 1. update storage
        tabSettingsMapToUpdate[currentTab] = false;
        // non-blocking
        persistWindowSettings(tabSettingsMapToUpdate);
        // 2. update store
        dispatch({ type: ActionType.STOP_AUTO_RELOAD });

        // 3. send stop command to content
        try {
            const res = await browser.tabs.sendMessage(
                currentTab,
                {
                    type: 'p2c-stop'
                });
        } catch (e) {
            console.error('Failed to stop auto reload', e);
        }
    }
};
