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
  FlatList,
  StyleSheet
} from 'react-native';

const width = Dimensions.get('screen').width;

const fotos = [
  { id: 1, usuario: 'Alexandre Teixeira' },
  { id: 2, usuario: 'Teste 1' },
  { id: 3, usuario: 'Teste 2' }
];

const App: () => React$Node = () => {
  return (
    <FlatList style={styles.container}
      data={fotos}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
        <View>
          <View style={styles.cabecalho}>
            <Image source={require('./resources/img/rhcp.jpeg')}
              style={styles.fotoDePerfil} />
            <Text>{item.usuario}</Text>
          </View>
          <Image source={require('./resources/img/rhcp.jpeg')}
            style={styles.foto} />
        </View>
      }
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40, height: 40
  },
  foto: {
    width: width,
    height: width
  }
})

export default App;
