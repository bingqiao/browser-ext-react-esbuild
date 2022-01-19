import { produce } from "immer";
import { Reducer } from "redux";
import { SettingsState } from "../../utils/settings";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState: SettingsState = {
    loaded: false,
    currentWindow: 0,
    currentTab: 0,
    settings: {}
};

const reducer: Reducer<SettingsState, Action> = produce((state: SettingsState, action: Action): SettingsState => {
    switch (action.type) {
        case ActionType.FETCH_SETTINGS:
            return { ...action.payload };
        case ActionType.START_AUTO_RELOAD:
            state.settings[state.currentTab] = true;
            return state;
        case ActionType.STOP_AUTO_RELOAD:
            state.settings[state.currentTab] = false;
            return state;
        default:
            return state;
    }
}, initialState);

export default reducer;