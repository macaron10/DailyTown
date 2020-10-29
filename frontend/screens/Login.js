import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const image = require('../assets/공허의숲.png')

export default function LoginSample() {
  // const [userInfo, setUserInfo] = 
  const [checkBtn, setCheckBtn] = useState(0)
  const onPress = () => setCheckBtn(v => v+1);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <Text style={styles.logo}>
        {checkBtn}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.loginBtn}>
        <Text style={styles.loginText}>Google LOGIN</Text>
      </TouchableOpacity>
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
