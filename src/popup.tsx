import React from 'react'; // esbuild doesn't bundle this if not imported here?
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import 'bulma/css/bulma.css';
import { store } from './state';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.querySelector('#root')
);
