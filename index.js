import { Navigation } from 'react-native-navigation';
import Login from './src/components/Login';
import Feed from './src/components/Feed';
import { AsyncStorage } from 'react-native';
import loginLayout from './src/layouts/LoginLayout';
import feedLayout from './src/layouts/FeedLayout';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

const getComponentInitial = async () => {
  const token = await AsyncStorage.getItem('token');
  return (!token ? loginLayout() : feedLayout());
}

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: await getComponentInitial()
          }
        ],
      }
    }
  });
});