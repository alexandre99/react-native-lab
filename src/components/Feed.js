import React, { Component } from 'react';
import {
  FlatList,
  AsyncStorage
} from 'react-native';
import Post from './Post';
import Config from 'react-native-config';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    const uri = `${Config.BASE_URL}fotos`;
    AsyncStorage.getItem('token')
      .then(token => {
        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        }
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
      .catch(error => console.error(error));
  }

  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {

        let novaLista = []
        if (!foto.likeada) {
          novaLista = [
            ...foto.likers,
            { login: usuarioLogado }
          ]
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado
          })
        }
        return novaLista;
      })
      .then(novaLista => {

        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        const fotos = this.state.fotos
        fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

        this.setState({ fotos })
      });

    const uri = `${Config.BASE_URL}fotos/${idFoto}/like`;
    AsyncStorage.getItem('token')
      .then(token => {
        return {
          method: 'POST',
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        }
      })
      .then(requestInfo => fetch(uri, requestInfo));
  }

  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if (this.state.valorComentario === '')
      return;

    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    const fotos = this.state.fotos.
      map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos });

    inputComentario.clear();

  }

  render() {
    return (
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item}
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)} />
        }
      ></FlatList >
    );
  }
}

