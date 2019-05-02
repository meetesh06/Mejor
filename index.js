/** @format */

import { Navigation } from "react-native-navigation";
import Initializing from './screens/Initializing';
import LevelSelector from './screens/LevelSelector';
import LevelScreen from './screens/LevelScreen';
import ProofOfConcept from './screens/ProofOfConcept';

Navigation.registerComponent(`navigation.user.Initializing`, () => Initializing);
Navigation.registerComponent(`navigation.user.LevelSelector`, () => LevelSelector);
Navigation.registerComponent(`navigation.user.LevelScreen`, () => LevelScreen);
Navigation.registerComponent(`navigation.user.ProofOfConcept`, () => ProofOfConcept);

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