import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import rootReducer from './store/reducers/rootReducer';

const storeName = '5637759616334';

// Save to local storage // Use Local Storage Persistance
const saveToLocalStorage = (state) => {
    try {
        const stringState = JSON.stringify(state);
        localStorage.setItem(storeName, stringState);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Error saving state to local storage: ', err);
    }
};

// Load from local storage // Use Local Storage Persistance
const loadFromLocalStorage = () => {
    try {
        const stringState = localStorage.getItem(storeName);
        if (stringState === null) return undefined;
        return JSON.parse(stringState);
    } catch (err) {
        return undefined;
    }
};

// Use Local Storage Persistance
const persistedStorage = loadFromLocalStorage();

// const thunk = createThunkMiddleware({
//     extraArgumentsEnhanced: {
//         fetch,
//     },
// });

const middleware = [thunk];

// Initialize Store
const store = createStore(
    rootReducer,
    persistedStorage,
    // applyMiddleware(thunk)
    composeWithDevTools(applyMiddleware(...middleware))
);

//Sync to local storage everytime store changes
store.subscribe(() => saveToLocalStorage(store.getState()));

const RenderComponent = () => (
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(<RenderComponent />, rootElement);
} else {
    ReactDOM.render(<RenderComponent />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    onUpdate: (registration) => {
        alert('New version of BitNorm available!  Ready to  auto update?');
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// (res) => console.log('reportVitals => ', res)
