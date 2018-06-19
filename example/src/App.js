import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AppNavigator from './router' 

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator></AppNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});
