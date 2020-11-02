import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function StoreItemModal({ itemInfo, setItemInfo, setGoldStatus }) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>


            <Text style={styles.modalText}> 이름: { itemInfo['name'] } </Text>
            <Text style={styles.modalText}> 가격: { itemInfo['price'] } </Text>

            <View style={{ display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setItemInfo(null)
                  setGoldStatus( prev => prev - itemInfo['price'] )
                }}
              >
                <Text style={styles.textStyle}>아이템 사기</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setItemInfo(null)
                }}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </TouchableHighlight>

            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

