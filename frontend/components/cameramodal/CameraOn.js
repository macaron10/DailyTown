import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { IconButton } from 'react-native-paper';
// import * as MediaLibrary from 'expo-media-library';


export default function CameraOn({ setIsCameraOn, setPhotoInfo }) {
  const camera = useRef();

  function clickCameraOn() {
    setIsCameraOn( prevStatus => !prevStatus )
  };
  const [hasPermission, setHasPermission] = useState(null);
  // const [hasPermission2, setHasPermission2] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const snap = async () => {
    if (camera) {
      const { uri } = await camera.current.takePictureAsync()
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // console.log('abcd', uri)
      // console.log(asset)
      // 로컬 핸드폰에 저장로직만들어둠(혹시나해서)
      setPhotoInfo({uri: uri})
      clickCameraOn()
      // MediaLibrary.createAlbumAsync('Expo', asset)
      // .then(() => {
      //   Alert.alert('Album created!')
      // })
      // .catch(error => {
      //   Alert.alert('An Error Occurred!')
      // });
    }
  };




  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.CAMERA);
      // let { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
      // setHasPermission2(status2 === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ height: "100%", paddingTop: 10 }}>
      <Camera style={{ flex: 1 }} type={type}
        ref={camera}      
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'blue'
            }}
            onPress={() => clickCameraOn()}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Goback{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'blue'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Flip{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
            flex: 0.5,
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'blue'
            }}
            onPress={() => snap()}
        >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }} >
              Take a Picture
            </Text>
        </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
