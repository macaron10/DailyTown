import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Board from '../components/MainPageBoard'

const image = require('../assets/공허의숲.png')

export default function Main() {

  return (
    <View>
      <Board />
    </View>
  );
}
