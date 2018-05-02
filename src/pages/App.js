import React from 'react';
import { Provider } from 'react-redux';

// Redux
import { createAppStore } from '../redux/stores/AppStore';

// Components
import { Header } from '../components/Header/Header';
import HomePage from './HomePage';
import { Footer } from '../components/Footer/Footer';

export const App = () => (
    <Provider store={createAppStore()}>
        <div className="container">
            <Header />
            <HomePage />
            <Footer />
        </div>
    </Provider>
);