import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
// import { StyleSheet } from 'react-native';
import LoginScreen from './screens/Login';
import MainScreen from './screens/Main';

const Stack = createStackNavigator();

export default function App() {
  async function playSound() {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require('./assets/bgm/bgm.mp3'));
    await soundObject.playAsync();
    await soundObject.setStatusAsync({ isLooping: false })
    await soundObject.stopAsync(); // 음악 stop
    await soundObject.unloadAsync(); // 음악 unload(메모리에서)
  }
  useEffect(() => {
    playSound()
  })
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Main" component={MainScreen}/>
      </Stack.Navigator>
      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
// });
