/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList
} from 'react-native';

const width = Dimensions.get('screen').width;

const fotos = [
  { id: 1, usuario: 'Alexandre Teixeira' },
  { id: 2, usuario: 'Teste 1' },
  { id: 3, usuario: 'Teste 2' }
];

const App: () => React$Node = () => {
  return (
    <FlatList style={{ marginTop: 20 }}
      data={fotos}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
        <View>
          <Text>{item.usuario}</Text>
          <Image source={require('./resources/img/rhcp.jpeg')} style={{ width: width, height: width }} />
        </View>
      }
    />
  );
};

export default App;
