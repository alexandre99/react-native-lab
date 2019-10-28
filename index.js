import { Navigation } from 'react-native-navigation';
import Login from './src/components/Login';
import Feed from './src/components/Feed';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'Login',
              name: 'Login'
            }
          }
        ],
      }
    }
  });
});