import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Board from '../components/MainPageBoard'
import Inventory from '../components/mainbottom/MainPageInventory'

export default function Main({navigation}) {
  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={ styles.button }
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>LoginPage(for Dev)</Text>
      </TouchableOpacity>
      <Board />
      <Inventory/>
    </View>
  );
}

// <View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  button: {
    position: 'absolute',
    top: 100,
    zIndex: 100,
    backgroundColor: 'black',
  }

});
