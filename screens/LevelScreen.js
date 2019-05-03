//@flow
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  levelData
} from '../levelData/levelData';

export default class App extends React.Component {
  render() {
    const Component = levelData[this.props.level_id].pageComponent;
    
    return (
      <Component />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  }
});