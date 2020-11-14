import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Alert } from 'react-native';
import axios from 'axios';
import * as env from '../../env';


export default function CameraModal({ photoInfo, setPhotoInfo, userToken }) {

  photoInfo.type = 'image/jpeg'
  photoInfo.name = 'photo' + '-' + Date.now() + '.jpg'
  // console.log(photoInfo)
    
  const formData = new FormData();
  formData.append("category", "general")
  formData.append("title", "car")
  formData.append("image", photoInfo);
  // console.log(formData)
  // console.log("토큰값!", userToken)

  return (
    <View style={styles.centeredView}>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}> */}
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}
            <Image
              style={{ width: 300, height: 500, resizeMode: 'contain' }}
              source={{ uri: photoInfo.uri }}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                // setModalVisible(!modalVisible);
                setPhotoInfo(null)
                axios.post(`http://${env.IP_ADDRESS}/ai-images/predict/`, formData, {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + userToken
                  }
                })
                .then(res => {
                  console.log("성공!", res.data.ans)
                  if (res.data.ans) {
                    axios.put(`http://${env.IP_ADDRESS}/ai-images/predict/`,{ "iscleared": True }, {
                      headers: {
                        Authorization: "Bearer " + userToken
                      }
                    })
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
                  } else {
                    Alert.alert('사진을 다시 찍어 주세요.')
                  }
                })
                .catch(err => console.error(err))
              }}
            >
              <Text style={styles.textStyle}>미션 수행</Text>
            </TouchableHighlight>
          {/* </View> */}
        </View>
      {/* </Modal> */}

    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});