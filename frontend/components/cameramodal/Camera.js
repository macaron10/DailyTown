import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';

export default function App() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoInfo, setPhotoInfo] = useState(null);


  const clickCameraOn = () => setIsCameraOn(prevStatus => !prevStatus);


  return (
    <View style={styles.container}>
      <View style={styles.containerUnder}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => alert('Hello, world!')}
            style={{ backgroundColor: 'red', width: '50%' }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Test</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => clickCameraOn()}
            style={{ backgroundColor: 'blue', width: '50%',  }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Picture</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerUnder: {
    flex: 1,
    justifyContent: 'flex-end'
  },

});
