import { SettingsState } from "../../utils/settings";
import { ActionType } from "../action-types";

export interface StartAutoReloadAction {
    type: ActionType.START_AUTO_RELOAD;
}

export interface StopAutoReloadAction {
    type: ActionType.STOP_AUTO_RELOAD;
}

export interface FetchSettingsAction {
    type: ActionType.FETCH_SETTINGS;
    payload: SettingsState
}


export type Action =
    StartAutoReloadAction |
    StopAutoReloadAction |
    FetchSettingsAction;
