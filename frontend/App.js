import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MissionModal from './components/MissionModal';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>공허의 숲!!!</Text>
      <StatusBar style="auto" />
      <MissionModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
