import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {
  Navigation
} from 'react-native-navigation';


export default class App extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    try {
      const alreadyDone = await AsyncStorage.getItem('NEW_USER');
      if(alreadyDone) {
        Navigation.setRoot({
          root: {
            stack: {
              children: [{
                component: {
                  name: "navigation.user.LevelSelector",
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
      } else {
        this.setState({
          loading: false
        })
      }
    } catch(e) {
      console.log(e);
    }
  }

  handleNextScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        // name: 'navigation.user.LevelSelector',
        name: 'navigation.user.ProofOfConcept',
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#333'
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 10,
            justifyContent: 'center'
          }}
        >

          <Image
            source={require('../media/logo.png')}
            style={{
              width: 200,
              alignSelf: 'center',
              // backgroundColor: 'red',
              height: 150
            }}
            resizeMode="contain"
          />
          <View
            style={{
              padding: 10
            }}
          >

            <Text
              style={{
                color: '#f0f0f0',
                textAlign: 'center'
              }}
            >
              Reality is wrong
              Dreams are for real
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#c0c0c0',
                marginTop: 20,
                fontWeight: '100'
              }}
            >
              - TUPAC AMARU SHAKUR -
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            flex: 2,
            backgroundColor: '#f0f0f044',
            margin: 20,
            padding: 15,
            // justifyContent: 'center',
            borderRadius: 20
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              flex: 1,
              textAlign: 'center'
            }}
          >
            This is a open source project aimed to create a interactive mobile application to learn computer graphics for Under Grad students.
            {'\n'}
            {'\n'}
            Here you can encounter new and creative ways to learn the subject never before seen.
            {'\n'}
            {'\n'}
            We hope this project can help students understand the beauty of the subject that is Computer Graphics.
            {'\n'}
            {'\n'}
            You can view our source code and contribute to this project by visiting
            {'\n'}
            {'\n'}
            https://github.com/meetesh06/Mejor
          </Text>
        </ScrollView>
        <TouchableOpacity
          disabled={this.state.loading}
          onPress={this.handleNextScreen}
          style={{
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
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}