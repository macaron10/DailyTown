import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Board from '../components/MainPageBoard'
import Inventory from '../components/Inventory'

export default function Main({navigation}) {
  return (
    <View style={ styles.container }>
      <Board />
      <Button
        style={{ flex: 0.3 }}
        title="LoginPage(for Dev)"
        onPress={() => navigation.navigate('Login')}
      />
      <Inventory/>
    </View>
  );
}

// <View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

});
