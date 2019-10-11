import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Platform
} from 'react-native';
import Post from './src/components/Post';
import Config from 'react-native-config'

class App extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    console.log('Config carregada:' + Config.URL);
    fetch(Config.URL)
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
      .catch(error => { 
        console.log(error) 
      });
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} />
        }
      ></FlatList>
    );
  }
}

const margem = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margem
  }
});

export default App;
