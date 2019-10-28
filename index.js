import { Navigation } from 'react-native-navigation';
import Login from './src/components/Login';
import Feed from './src/components/Feed';
import { AsyncStorage } from 'react-native';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

const getComponentInitial = async () => {
  const token = await AsyncStorage.getItem('token');
  return (!token ? { id: 'Login', name: 'Login' } : { id: 'Feed', name: 'Feed' });
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