import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import axios from 'axios';

export default function CameraModal({ photoInfo, setPhotoInfo }) {
  // const [modalVisible, setModalVisible] = useState(true);
  const formData = new FormData();
  formData.append("category", "general")
  formData.append("title", "car")
  formData.append("image", { uri: photoInfo.uri, name: 'image.jpg', type: 'image/jpeg' })
  // console.log(formData)
  // console.log(photoInfo.uri)

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
                console.log(JSON.stringify(formData))
                axios.post('http://k3b305.p.ssafy.io:8005/ai-images/predict/', formData, {
                  headers: {
                    Accept: "application/json",
                    'Content-Type': 'multipart/form-data',
                    Authorization: ""
                  }
                })
                .then(res => {
                  console.log(res)
                })
                .catch(err => console.error(err))
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
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