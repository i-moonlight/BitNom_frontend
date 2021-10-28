import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reportWebVitals from './pwa/reportWebVitals';
import * as serviceWorkerRegistration from './pwa/serviceWorkerRegistration';
import rootReducer from './store/reducers/rootReducer';

const App = React.lazy(() => import('./App'));
const storeName = '5637759616334';

// Save to local storage // Use Local Storage Persistance
const saveToLocalStorage = (state) => {
    try {
        const stringState = JSON.stringify(state);
        localStorage.setItem(storeName, stringState);
    } catch (err) {
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
        console.log(err);
        return undefined;
    }
};

// Use Local Storage Persistance
const persistedStorage = loadFromLocalStorage();

// Initialize Store
const store = createStore(
    rootReducer,
    persistedStorage,
    applyMiddleware(thunk)
);

//Sync to local storage everytime store changes
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
    <React.StrictMode>
        <div>
            <Suspense
                fallback={
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: window.innerWidth,
                            height: window.innerHeight,
                            backgroundColor: window.matchMedia(
                                '(prefers-color-scheme: dark)'
                            ).matches
                                ? '#000'
                                : '#fff',
                        }}
                    >
                        <img
                            style={{ width: 50, height: 50 }}
                            src={`${window.location.origin}/logo.svg`}
                            alt="Logo image"
                        ></img>
                    </div>
                }
            >
                <Provider store={store}>
                    <App />
                </Provider>
            </Suspense>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
