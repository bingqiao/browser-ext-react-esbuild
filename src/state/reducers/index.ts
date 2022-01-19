import { combineReducers } from "redux";
import settingsState from './settings-reducer';

const reducers = combineReducers({
    settingsState: settingsState
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
