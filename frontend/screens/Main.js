import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Board from '../components/MainPageBoard'
import MainPageInventory from '../components/mainbottom/MainPageInventory'
import MissionModal from '../components/mission_modal/MissionModal';

export default function Main({navigation}) {
  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={ styles.button }
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>LoginPage(for Dev)</Text>
      </TouchableOpacity>
      <View style={ styles.containerTop }>
        <View style={ styles.infoContainer }>
          <MissionModal />
        </View>
        <Board />
      </View>
      <MainPageInventory/>
    </View>
  );
}

// <View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    height: '100%',
  },
  button: {
    position: 'absolute',
    top: 100,
    zIndex: 100,
    backgroundColor: 'black',
  },
  containerTop: {
    // flex: 1,
    // justifyContent: 'flex-start',
    height: "50%"
  },
  infoContainer: {
    // height: "10%",
  }
});
