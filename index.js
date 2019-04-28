/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";

import Initializing from './screens/Initializing';
import LevelSelector from './screens/LevelSelector';
import LevelComponent from './screens/LevelComponent';

Navigation.registerComponent(`navigation.user.Initializing`, () => Initializing);
Navigation.registerComponent(`navigation.user.LevelSelector`, () => LevelSelector);
Navigation.registerComponent(`navigation.user.LevelComponent`, () => LevelComponent);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: "navigation.user.Initializing",
            options: {
              topBar: {
                visible: false,
                drawBehind: true
              }
            }
          }
        }]
      }
    }
  });
});