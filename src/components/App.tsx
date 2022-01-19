import React, { useEffect, useState } from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { defaultInterval } from '../utils/settings';
import StartButton from './start-button';
import browser = require('webextension-polyfill');

function App() {
  const { loaded } = useTypedSelector(({ settingsState }) => settingsState);
  const { fetchSettings } = useActions();
  const [os, setOS] = useState('');

  useEffect(() => {
    if (!loaded) {
      fetchSettings();
    }
  }, [loaded]);

  useEffect(() => {
    const checkPlatform = async () => {
      const platformInfo = await browser.runtime.getPlatformInfo();
      setOS(platformInfo.os);
    }
    checkPlatform();
  }, []);

  return (
    <div className="App">
      {(os === 'mac' || os === 'ios') ?
        <div className="container p-1">
          <div className='is-flex my-1 is-justify-content-center'>
            <label>Reload every {defaultInterval} seconds</label>
          </div>
          <div className='is-flex my-1 is-justify-content-center'>
            <StartButton />
          </div>
        </div> : ''
      }
    </div>
  );
}

export default App;
