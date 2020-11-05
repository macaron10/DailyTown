import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import * as Google from 'expo-google-app-auth';
import * as env from '../env';
import * as SecureStore from 'expo-secure-store'

const image = require('../assets/voidforest.png')

export default function LoginSample({ navigation }) {
  // const [userInfo, setUserInfo] = 
  const [checkBtn, setCheckBtn] = useState(0)
  const onPress = async () => {
    const res = await Google.logInAsync(
      {androidClientId: env.AND_KEY});
    // console.log(res);
  
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

    let userInfo = await fetch(`http://${env.IP_ADDRESS}:8000/account/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
    .catch(error => {
      console.log(error);
      console.log('에러');
      window.gapi && window.gapi.auth2.getAuthInstance().signOut();
    });  

  }



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
      <Button
        title="NextPage(for Dev)"
        onPress={() => navigation.navigate('Main')}
      />
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
    backgroundColor: "#fbccd1",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 10,
  }
});
