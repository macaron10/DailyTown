import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image, Button, } from "react-native";
import DynamicItems from "./DynamicItems"
import { IconButton } from 'react-native-paper';
import axios from 'axios'


// const image = DynamicItems[itemInfo['name']]

function SellingMode({ itemInfo, index, items, itemForSell, setMyItems, setCount, count, setModalVisible, setItemInfo, goldStatus, setGoldStatus, isSellingMode }) {
  const image = DynamicItems[itemInfo['name']]
  // const image = itemInfo['name'] ? DynamicItems[itemInfo['name']] : DynamicItems['default']
  // console.log(items)
  // console.log(items[index])
  const location = itemInfo.location
  const sellId = itemInfo.id
  const price = itemInfo.price
  function sellItem() {
    items[index] = {
      "name": "",
      "location": location
    }
    setMyItems(items)
    axios
      .delete('http://k3b305.p.ssafy.io:8005/account/shop/', {
        'headers': {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImVoajAxMjhAZ21haWwuY29tIiwiZXhwIjoxNjA3OTMyOTE2LCJlbWFpbCI6ImVoajAxMjhAZ21haWwuY29tIn0.oEAQ0lPTHaBIBWjO3V9nO0jaiDFiZ-qZwQMJleQPisY'
        }
        , data: { "myitem_pk": sellId, "gold": goldStatus + price }
      })
      .then(() => {})
      .catch(err => console.log(err))
  }
  function buyItem() {
    let cnt = 0
    for (let i = 0; i < itemForSell.length; i++) {
      if (cnt < count) {
        if (itemForSell[i]['name'] === '') {
          itemForSell[i] = itemInfo
          cnt++
        }
      }
      else {
        break
      }
    }
    if (cnt < count) {
      Alert.alert('인벤토리가 꽉 찼습니다. 구입하지 못한 금액은 차감되지 않습니다.')
      setGoldStatus(prev => prev + itemInfo['price'] * (count - cnt))
    }
    setMyItems(itemForSell)
  }


  return <View style={styles.modalView}>
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <View style={{ display: 'flex' }}>
        <Image
          style={styles.tinyLogo}
          resizeMode="contain"
          source={image}
        />
        <Text>{itemInfo['price']}</Text>
      </View>
      {isSellingMode ? <View /> :
        <View style={{ display: 'flex' }}>
          <IconButton
            icon="arrow-up-drop-circle"
            onPress={() => {
              setCount(prev => prev + 1)
            }}
          >
          </IconButton>
          <IconButton
            icon="arrow-down-drop-circle"
            onPress={() => {
              setCount(prev => prev - 1)
            }}
          >
          </IconButton>

        </View>

      }
      <View>
        <Text>{count}개</Text>
        <Text>총 가격표시: {itemInfo['price'] * count} </Text>
      </View>

      {/* <Text style={styles.modalText}> 이름: { itemInfo['name'] } </Text>
              <Text style={styles.modalText}> 가격: { itemInfo['price'] } </Text> */}

    </View>


    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <TouchableHighlight
        style={{ ...styles.openButton, backgroundColor: "#2196F3", width: '50%', marginRight: 10 }}
        onPress={() => {
          let isCanSell = false
          isSellingMode ? sellItem() : count * itemInfo['price'] <= goldStatus ? isCanSell = true : Alert.alert('골드가 부족합니다')
          if (isCanSell) {
            buyItem()
          }
          setGoldStatus(prev => isSellingMode ? prev + itemInfo['price'] * count : isCanSell ? prev - itemInfo['price'] * count : prev);
          setModalVisible(prev => !prev);
          setItemInfo(null);
        }}
      >
        <Text style={styles.textStyle}>{isSellingMode ? '판매' : '구매'}</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{ ...styles.openButton, backgroundColor: "#2196F3", width: '50%' }}
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

// 가방의경우, 이동하기, 판매하기 -> 수량 선택및 금액 표시. 판매, 닫기
// 상점의경우, 이미지, 수량 구매, 닫기
function CommerceModal({ setIsMove, itemInfomation, isInventory, items, setMyItems, itemForSell, setItemInfo, goldStatus, setGoldStatus, setModalVisible, setIsChangeItemPlace, setChangedIndex }) {
  const [count, setCount] = useState(1)
  const [sellingItem, setSellingItem] = useState(null)
  const index = itemInfomation[1]
  const itemInfo = itemInfomation[0]
  if (isInventory && sellingItem === null) {
    return <View style={styles.modalView}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => {
            setModalVisible(prev => !prev);
            setItemInfo(null)
            setIsChangeItemPlace(true);
            setChangedIndex(index);
            setIsMove(true)
          }}
        >
          <Text style={styles.textStyle}>이동하기</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => {
            // setModalVisible(prev => !prev)
            setSellingItem(itemInfo)
            setItemInfo([itemInfo, index])
          }}
        >
          <Text style={styles.textStyle}>판매하기</Text>
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
  if (sellingItem) {
    return <SellingMode isSellingMode={true} index={index} items={items} setMyItems={setMyItems} itemInfo={sellingItem} setCount={setCount} count={count} setModalVisible={setModalVisible} setItemInfo={setItemInfo} goldStatus={goldStatus} setGoldStatus={setGoldStatus} />
  }

  return <SellingMode itemInfo={itemInfo} items={items} itemForSell={itemForSell} setMyItems={setMyItems} setCount={setCount} count={count} setModalVisible={setModalVisible} setItemInfo={setItemInfo} goldStatus={goldStatus} setGoldStatus={setGoldStatus} />
}

export default function StoreItemModal({
  setIsMove,
  itemInfo,
  isInventory,
  items,
  setMyItems,
  itemForSell,
  setItemInfo,
  goldStatus,
  setGoldStatus,
  storeImage,
  setIsChangeItemPlace,
  setChangedIndex
}) {
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
            setIsMove={setIsMove}
            items={items}
            itemForSell={itemForSell}
            itemInfomation={itemInfo}
            isInventory={isInventory}
            setMyItems={setMyItems}
            setItemInfo={setItemInfo}
            goldStatus={goldStatus}
            setGoldStatus={setGoldStatus}
            setModalVisible={setModalVisible}
            storeImage={storeImage}
            setIsChangeItemPlace={setIsChangeItemPlace}
            setChangedIndex={setChangedIndex}
          />

        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 65,
    height: 65,
  },
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
    borderRadius: 10,
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

