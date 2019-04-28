import React, { Component } from "react";
import {
    View,
    Text
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#333'
        }}
      >
        <Text>
          Level Selector
        </Text>
      </View>
    );
  }
}