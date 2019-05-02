import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-realistic-deck-swiper'
import {
  Navigation
} from 'react-native-navigation';
import {
  levelMetadata
} from '../levelData/levelData';

console.log(levelMetadata);

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class App extends Component {
  startLevel = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.user.LevelScreen',
        passProps: {
          level_id: id
        },
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  _renderCard = (item) => {
    return <View style={{
      width: WIDTH - 40,
      height: 400,
      borderRadius: 5,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{ fontSize: 35 }}>Level {item.id}</Text>
      <Text style={{ fontSize: 40 }}>{item.title}</Text>
      <Text style={{ fontSize: 15, marginTop: 15 }}>{item.description}</Text>
      <TouchableOpacity
        disabled={!item.available}
        onPress={() => this.startLevel(item.id)}
        style={{
          backgroundColor: '#c0c0c0',
          padding: 20,
          marginTop: 20
        }}
      >
        <Text style={{ fontSize: 25 }}>
          {item.available && 'START'}
          {!item.available && 'COMING SOON'}
        </Text>
      </TouchableOpacity>

    </View>
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#333'
        }}
      >
        <Swiper
          cardsData={levelMetadata}
          renderCard={this._renderCard}
          containerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
          }}
        />
      </View>
    );
  }
}