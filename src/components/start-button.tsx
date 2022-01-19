import React from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

const StartButton: React.FC = () => {
    const { startAutoReload, stopAutoReload } = useActions();
    const settingState = useTypedSelector(({ settingsState }) => settingsState);

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (settingState.settings[settingState.currentTab]) {
            stopAutoReload();
        } else {
            startAutoReload();
        }
    };

    return (
        <button className={`button is-link mx-1`} onClick={onClick}>
            <span className={`is-small is-flex is-align-items-center`} >
                <FontAwesomeIcon icon={settingState.settings[settingState.currentTab] ? faStop : faPlay} className='fa-lg' />
            </span>
        </button>
    );
};
export default StartButton;