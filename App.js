// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';

const App = () => {
    return (
        <SafeAreaProvider>
            <Navigation />
        </SafeAreaProvider>
    );
};

export default App;
