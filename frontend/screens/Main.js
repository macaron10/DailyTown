import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import * as env from '../env';

import Board from '../components/MainPageBoard'
import MainPageInventory from '../components/mainbottom/MainPageInventory'
import MissionModal from '../components/mission_modal/MissionModal';
import MyGold from '../components/MyGold';
import axios from 'axios'
import tempItem from '../components/mainbottom/tempItem'

export default function Main({ navigation }) {
  const [goldStatus, setGoldStatus] = useState(0)
  const [myItems, setMyItems] = useState(
    tempItem
  )
  const [boardData, setBoardData] = useState([])
  // "0": {
  // "name": "임시1",
  // "price": 500,
  // "image": "test1"
  // }

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
  const tempData = []
  useEffect(() => {
    axios
      .get('http://k3b305.p.ssafy.io:8005/account/myitem/',
        {
          'headers': {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImhpaGkyQHNzYWZ5LmNvbSIsImV4cCI6MTYwNzU3OTQ4MCwiZW1haWwiOiJoaWhpMkBzc2FmeS5jb20ifQ.16bmul0SrSeqEe3ZJkxIJfS1kne3ZkmYOVMUIVOfByk'
          }
        })
      .then(res => {
        res.data.forEach(element => {
          if (element.isinfarm) {
            let xys = element.location - 1
            let x = xys % 6
            let y = parseInt(xys / 6)
            tempData.push({
              id: element.id,
              x: x,
              y: y,
              name: element.item.name,
            })
          } //else {승현좌의 코드}
        })
        setBoardData(tempData)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <View style={styles.container}>
      {/* 로그인 페이지로 이동 버튼(임시) */}
      <TouchableOpacity
        style={styles.devbutton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>LoginPage(for Dev)</Text>
      </TouchableOpacity>
      {/* 토큰 저장소 확인버튼(임시) */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 100, backgroundColor: '#000000', zIndex: 100 }}
        onPress={async () => {
          const jwt = await SecureStore.getItemAsync('token')
          console.log(jwt, '이게 스토어의 토큰');
          const acst = await SecureStore.getItemAsync('access_token')
          console.log(acst, '이게 스토어의 액세스 토큰');
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>저장값꺼내기</Text>
      </TouchableOpacity>
      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          const accessToken = await SecureStore.getItemAsync('access_token')
          await Google.logOutAsync({ accessToken, androidClientId: env.AND_KEY }); // 나중에 따로 config 설정해줘야함
          // ------------------------ access token 만료 확인용 -------------------------------
          // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          //   headers: { Authorization: `Bearer ${accessToken}` },
          // })
          // .then(
          //   res => res.json()
          // )
          // .then(
          //   json => {console.log(json)}
          // );
          await SecureStore.deleteItemAsync('token')
          await SecureStore.deleteItemAsync('access_token')
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.containerTop}>
        <View style={styles.infoContainer}>
          <MissionModal />
        </View>
        <MyGold goldStatus={goldStatus} />
        <Board boardData={boardData} />
      </View>
      <MainPageInventory myItems={myItems} setMyItems={setMyItems} setGoldStatus={setGoldStatus} />
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
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 50,
    backgroundColor: '#000000',
    zIndex: 100
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
