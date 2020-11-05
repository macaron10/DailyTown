import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Board from '../components/MainPageBoard'
import MainPageInventory from '../components/mainbottom/MainPageInventory'
import MissionModal from '../components/mission_modal/MissionModal';
import MyGold from '../components/MyGold';
import axios from 'axios'

export default function Main({navigation}) {
  const [goldStatus, setGoldStatus] = useState(0)
  const [myItems, setMyItems] = useState({
    "0": {
    "name": "임시1",
    "price": 500,
    "image": "splash"
    }
  })

  // 맨처음 한번만 받아올 예정
  // useEffect( () => {
  //   axios.get('http://k3b305.p.ssafy.io:8080/items/getInventory')
  //     .then(res => {
  //       setGoldStatus( res.data.gold )
  //       setMyItem( res.data )
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

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
        <MyGold goldStatus={ goldStatus } />
        <Board />
      </View>
      <MainPageInventory myItems={ myItems } setMyItems={ setMyItems } setGoldStatus={ setGoldStatus }/>
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
    left: '70%',
    zIndex: 100,
    backgroundColor: 'black',
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
