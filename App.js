import React from 'react';
import Routes from './src/routes';
import Toast from 'react-native-toast-message';
import {Text} from 'react-native';

const App = () => {
    return (
        <>
        <Routes/>
        <Toast/>
        </>
    )
};


export default App;