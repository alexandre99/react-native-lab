import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet
} from 'react-native';
import Post from './src/components/Post';

class App extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/public/fotos/rafael')
      .then(resposta => {
        console.log(resposta)
        resposta.json();
      })
      .then(json => this.setState({ fotos: json }))
      .catch(error => { 
        console.log(error) 
      });
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} />
        }
      ></FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});

export default App;
