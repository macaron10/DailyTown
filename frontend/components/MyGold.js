import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function MyGold({ goldStatus }) {
  return (
    <View style={{position: 'absolute', top: 20}}>
      <TouchableOpacity
        style={{ width: '100%'}}
      >
        <Text style={{ color: 'white', fontSize: 25 }}>
          <Image style={{resizeMode: "contain",}} source={require('../assets/icon/coin.png')} />
          { goldStatus }
        </Text>
      </TouchableOpacity>
    </View>
  );
}
