import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import CameraOn from './CameraOn';
import ImageModal from './CameraModal';

function CheckCamera(props) {
  const isCameraOn = props.isCameraOn
  if ( isCameraOn ) {
    return <CameraOn setIsCameraOn={ props.setIsCameraOn } setPhotoInfo={ props.setPhotoInfo }/>
  }
  else {
    return <Text>Nothing carmera On</Text>
  }
}

function CheckImage(props) {
  const photoInfo = props.photoInfo
  if ( photoInfo ) {
    Alert.alert('New Image Detect')
    return <ImageModal photoInfo={ photoInfo } setPhotoInfo={ props.setPhotoInfo }/>
  }
  else {

    return <View/>
  }
}

export default function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoInfo, setPhotoInfo] = useState(null);


  const clickCameraOn = () => setIsCameraOn(prevStatus => !prevStatus);


  return (
    <View style={styles.container}>
      <CheckImage photoInfo={ photoInfo } setPhotoInfo={ setPhotoInfo } />
      <View style={styles.containerUnder}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => clickCameraOn()}
            style={{ backgroundColor: 'blue', width: '50%',  }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Picture</Text>

          </TouchableOpacity>
        </View>
        <CheckCamera isCameraOn={ isCameraOn } setIsCameraOn={ setIsCameraOn } setPhotoInfo={ setPhotoInfo } />
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
