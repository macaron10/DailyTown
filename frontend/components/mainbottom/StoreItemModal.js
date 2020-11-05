import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";

// 가방의경우, 이동하기, 판매하기 -> 수량 선택및 금액 표시. 판매, 닫기
// 상점의경우, 이미지, 수량 구매, 닫기
function CommerceModal({ itemInfo, isInventory, setMyItems, setItemInfo, setGoldStatus, setModalVisible }) {
  if (isInventory) {
    return  <View style={styles.modalView}>
              <Text style={styles.modalText}> 이름: { itemInfo['name'] } </Text>
              <Text style={styles.modalText}> 가격: { itemInfo['price'] } </Text>

              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(prev => !prev)
                    setItemInfo(null)
                    setGoldStatus( prev => prev - itemInfo['price'] )
                  }}
                >
                  <Text style={styles.textStyle}>이동하기</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(prev => !prev)
                    setItemInfo(null)
                  }}
                >
                  <Text style={styles.textStyle}>판매하기</Text>
                </TouchableHighlight>

              </View>
            </View>
          }

  return  <View style={styles.modalView}>
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
                <Text style={styles.textStyle}>구매</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(prev => !prev)
                  setItemInfo(null)
                }}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </TouchableHighlight>

            </View>
          </View>
}

export default function StoreItemModal({ itemInfo, isInventory, setMyItems, setItemInfo, setGoldStatus }) {
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
          <CommerceModal
            itemInfo={itemInfo}
            isInventory={isInventory}
            setMyItems={setMyItems}
            setItemInfo={setItemInfo}
            setGoldStatus={setGoldStatus}
            setModalVisible={setModalVisible}
          />

        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    top: 150
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

