import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import Board from '../components/MainPageBoard'
import MainPageInventory from '../components/mainbottom/MainPageInventory'
import MissionModal from '../components/mission_modal/MissionModal';
import MyGold from '../components/MyGold';

export default function Main({navigation}) {
  const [goldStatus, setGoldStatus] = useState(10000)
  const test = SecureStore.getItemAsync('token')

  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={ styles.devbutton }
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>LoginPage(for Dev)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', top:100, backgroundColor: '#000000', zIndex:100}}
        onPress={() => {console.log(test,'이게 스토어의 값')}}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>저장값꺼내기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ styles.logoutButton }
        onPress={() => {SecureStore.deleteItemAsync('token')}}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
      <View style={ styles.containerTop }>
        <View style={ styles.infoContainer }>
          <MissionModal />
        </View>
        <Board />
        <MyGold goldStatus={ goldStatus } />
      </View>
      <MainPageInventory setGoldStatus={ setGoldStatus }/>
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
  devbutton: {
    position: 'absolute',
    top: 100,
    left: '70%',
    zIndex: 100,
    backgroundColor: 'black',
  },
  logoutButton:{
    position: 'absolute',
    right:0,
    top:50,
    backgroundColor: '#000000',
    zIndex:100
  },
  containerTop: {
    // flex: 1,
    // justifyContent: 'flex-start',
    height: "50%"
  },
  infoContainer: {
    position: "relative",
    // height: "10%",
  }
});
