export const defaultInterval = 10;

export type Settings = {[key: number]: boolean};
export interface SettingsState {
    loaded: boolean;
    currentTab: number;
    currentWindow: number;
    settings: Settings;
}
