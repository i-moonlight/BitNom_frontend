import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './pwa/reportWebVitals';
import * as serviceWorkerRegistration from './pwa/serviceWorkerRegistration';
import rootReducer from './store/reducers/rootReducer';

// Use Local Storage Persistance
// Save to local storage
const saveToLocalStorage = state => {
  try {
    let stringState = JSON.stringify(state);
    localStorage.setItem('@knjhffkgjbmbmnccmnvfseab', stringState);
  } catch (err) {
    console.log(err);
  }
};

// Load from local storage
const loadFromLocalStorage = () => {
  try {
    let stringState = localStorage.getItem('@knjhffkgjbmbmnccmnvfseab');
    if (stringState === null) return undefined;
    return JSON.parse(stringState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const persistedStorage = loadFromLocalStorage();

// Initialize Store
const store = createStore(
  rootReducer,
  persistedStorage,
  applyMiddleware(thunk)
);

store.subscribe(() => saveToLocalStorage(store.getState()));

//Create MUI Theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#006097',
    },
    secondary: {
      main: '#FB5E5E',
    },
    background: {
      paper: '#242526',
      default: '#18191A',
    },
  },
});

//Sync to local storage everytime store changes
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
