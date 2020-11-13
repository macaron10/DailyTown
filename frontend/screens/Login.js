import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store'
import * as env from '../env';

const image = require('../assets/6.png')

export default function LoginSample({ navigation }) {
  async function check () {
    const jwt = await SecureStore.getItemAsync('token')
    console.log(jwt)
    if (jwt !== null) {
      navigation.navigate('Main')
    } else {
      console.log('로그인하세요')
    }
  }
  useEffect(() => {
    return () => {check()}
}, [])

// const [userInfo, setUserInfo] = 
  const [checkBtn, setCheckBtn] = useState(0)
  const onPress = async () => {
    const res = await Google.logInAsync(
      {androidClientId: env.AND_KEY, androidStandaloneAppClientId: env.AND_KEY}).catch(error => {console.log(error)});
    console.log(res);
    const secure_available = await SecureStore.isAvailableAsync()
    if (res.type === 'success') {
      let data = {
        username: res.user.name,
        first_name: res.user.givenName,
        last_name: res.user.familyName,
        email: res.user.email,
        password: res.user.id,
        provider: 'google'
      };
      // console.log(data);

      let userInfo = await fetch(`http://${env.IP_ADDRESS}/account/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;'
        },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)  // ok -> 최초 로그인 // duplicate email -> 이후 로그인
        // Login
        fetch(`http://${env.IP_ADDRESS}/account/login/`, {  
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
          console.log('2차 제이슨', json.token)
          if (secure_available === true) {
            SecureStore.setItemAsync('token', json.token)
            SecureStore.setItemAsync('access_token', res.accessToken)
            navigation.navigate('Main')
          } else {
            console.log('자동로그인이 지원되지않는 안드로이드 버젼입니다.')
          }
        })
        .catch(error => {
          // Login 에러
          console.log('Login 에러')
          console.log(error);
          window.gapi && window.gapi.auth2.getAuthInstance().signOut();
        }); 
      })
      .catch(error => {
        // Signup 에러
        console.log('Signup 에러')
        console.log(error);
        window.gapi && window.gapi.auth2.getAuthInstance().signOut();
      });  
  };
};

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <Text style={styles.logo}>
        {/* 여기에 타이틀 추가 */}
        {/* {checkBtn} */}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.loginBtn}>
        <Text style={styles.loginText}>Google LOGIN</Text>
      </TouchableOpacity>
      {/* <Button
        title="NextPage(for Dev)"
        onPress={() => navigation.navigate('Main')}
      /> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: "center"
  },
  logo: {
    fontWeight:"bold",
    fontSize: 60,
    color:"#fb5b5a",
    marginBottom:40
  },
  loginText:{
    fontWeight:"bold",
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor: "#ace884",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 10,
  }
});
