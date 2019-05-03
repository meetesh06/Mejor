import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Button,
    Dimensions,
    StyleSheet
} from 'react-native';
// import Swiper from 'react-native-realistic-deck-swiper'
import Swiper from 'react-native-deck-swiper';
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

  handleLogout = async () => {
    await AsyncStorage.removeItem('NEW_USER');
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
      <View style={{
        flex: 1,
        backgroundColor: "#333"
      }}>
        <Swiper
          useViewOverflow={false}
          infinite={true}
          cards={levelMetadata}
          renderCard={(item) => {
              return (
                <View style={{
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                  flex: 1,
                  marginBottom: 80,
                  // width: WIDTH - 40,
                  // height: 400,
                  borderRadius: 5,
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  // justifyContent: 'center'
                }}>
                  <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Level {item.id}</Text>
                  <View
                    style={{
                      // justifyContent: 'center',
                      flex: 1
                    }}
                  >
                    <Text style={{ fontSize: 40 }}>{item.title}</Text>
                    <Text style={{ fontSize: 15, marginTop: 15, fontWeight: 'bold' }}>Description</Text>
                    <Text style={{ fontSize: 15, marginTop: 15, flex: 1, padding: 5, color: '#404040' }}>{item.description}</Text>
                    <TouchableOpacity
                      disabled={!item.available}
                      onPress={() => this.startLevel(item.id)}
                      style={{
                        backgroundColor: '#c0c0c0',
                        padding: 20,
                        marginTop: 20,
                        borderRadius: 10
                      }}
                    >
                      <Text style={{ fontSize: 25, textAlign: 'center', color: '#333' }}>
                        {item.available && 'START'}
                        {!item.available && 'COMING SOON'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
          }}
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedAll={() => {console.log('onSwipedAll')}}
          cardIndex={0}
          backgroundColor={'#333'}
          stackSize= {3}>
        </Swiper>
        <TouchableOpacity
          onPress={this.handleLogout}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            marginBottom: 40,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 10,
            padding: 15,
            borderWidth: 2,
            borderColor: '#fff'
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center'
            }}
          >
            Restart Demo
          </Text>
        </TouchableOpacity>
      </View>
    );
      // <View
      //   style={{
      //     flex: 1,
      //     backgroundColor: '#333'
      //   }}
      // >
        {/* <Swiper
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
        /> */}
        
      // </View>
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});