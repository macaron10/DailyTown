import React from 'react';
import { StyleSheet, View } from 'react-native';
import Inventory from './components/Inventory'

export default function App() {
  return (
    <View style={styles.container}>
      <Inventory/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

});
