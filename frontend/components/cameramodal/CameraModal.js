import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import axios from 'axios';
import {Buffer} from 'buffer'
// import {decode, encode} from 'base-64'
// if (!global.btoa) { global.btoa = encode }
// if (!global.atob) { global.atob = decode }

function btoa(data) { return new Buffer(data, "binary").toString("base64"); }
function atob(data) { return new Buffer(data, "base64").toString("binary"); }

// function b64toBlob(b64Data, contentType, sliceSize) {

//   if( b64Data == "" || b64Data == undefined ) return null;
  
// 	contentType = contentType || '';
// 	sliceSize = sliceSize || 512;

// 	const byteCharacters = atob(b64Data);
// 	const byteArrays = [];

// 	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
// 		const slice = byteCharacters.slice(offset, offset + sliceSize);
// 		const byteNumbers = new Array(slice.length);

// 		for (let i = 0; i < slice.length; i++) {
// 		    byteNumbers[i] = slice.charCodeAt(i);
// 		}
// 		const byteArray = new Uint8Array(byteNumbers);
// 		byteArrays.push(byteArray);
//   }
  
// 	const blob = new Blob(byteArrays, {type: contentType});
// 	return blob;
// }

// function atob(data) { return new Buffer(data, "base64").toString("binary"); }

export default function CameraModal({ photoInfo, setPhotoInfo }) {
  let formData = new FormData();
  let blobBin = atob(photoInfo.uri);
  let array = [];
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  let file = new Blob([new Uint8Array(array)], { type: "image/jpg" }); // Blob 생성
  formData.append("image", file);

  console.log(file)
  // const formData = new FormData();
  formData.append("category", "general")
  formData.append("title", "car")
  console.log(formData)
  // formData.append("image", b64toBlob(photoInfo, "image/jpg"), "car.jpg");

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
                // axios.post('http://k3b305.p.ssafy.io:8005/ai-images/predict/', formData, {
                //   headers: {
                //     Accept: "application/json",
                //     'Content-Type': 'multipart/form-data',
                //     Authorization: ""
                //   }
                // })
                // .then(res => {
                //   console.log(res)
                // })
                // .catch(err => console.error(err))
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