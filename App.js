import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.red, styles.center]}>just red</Text>
        <Text style={[styles.bigblue, styles.center]}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red, styles.center]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue, styles.center]}>red, then bigblue</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
    marginTop: 50
  },

  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});