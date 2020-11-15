import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { set } from "react-native-reanimated";

import MissionList from "./MissionList";


export default function MissionModal({ userToken, myMission, myItems }) {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("MyMission 넘어옴!", myMission)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              icon="close"
              style={styles.closeModal}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              size={30}
            ></IconButton>
            <MissionList userToken={ userToken } myMission={ myMission } myItems={ myItems }/>
            {/* <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight> */}
          </View>
        </View>
      </Modal>
      <IconButton
        icon="email-outline"
        style={styles.showButton}
        onPress={() => {
          setModalVisible(true);
        }}
        size={40}
      ></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,  
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "95%",
    width: "90%"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  showButton: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
  closeModal: {
    position: "absolute",
    right: 3,
  }
});