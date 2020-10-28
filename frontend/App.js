import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Inventory from './components/Inventory'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerUnder}>
        <Inventory/>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerUnder: {
    flex: 1,
    justifyContent: 'flex-end'
  },

});
