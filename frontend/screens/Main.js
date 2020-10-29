import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import Board from '../components/MainPageBoard'

export default function Main({navigation}) {
  return (
    <View>
      <Board />
      <Button
        title="LoginPage(for Dev)"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
