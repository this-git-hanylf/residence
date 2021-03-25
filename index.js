

import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreen } from './app/Screens/screens';
// import App from './App';
// import { name as appName } from './app.json';
registerScreen();

// Navigation.registerComponent('Initializing', () => registerScreen);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'Initializing'
            }
        }
    })
})
