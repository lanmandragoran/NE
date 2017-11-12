import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'babel-polyfill'
import App from './containers/App'

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);



// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.render(
      <AppContainer>
      <App />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
