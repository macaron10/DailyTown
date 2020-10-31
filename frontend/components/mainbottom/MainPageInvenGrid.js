import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert } from 'react-native';
import StoreItemModal from './StoreItemModal'

{/* <Image style={styles.tinyLogo} source={require('@expo/snack-static/react-native-logo.png')} /> */}
{/* <Image
style={styles.tinyLogo}
source={{
  uri: 'https://reactnative.dev/img/tiny_logo.png',
}}
/> */}

function ClickStoreItem(props) {
  const itemInfo = props.itemInfo
  if ( itemInfo ) {
    return <StoreItemModal itemInfo={ itemInfo } setItemInfo={ props.setItemInfo }/>
  }
  else {
    return <View/>
  }
}

function ItemGrid(props) {
  const number1 = props.number1
  const number2 = props.number2
  const isInventory = props.isInventory
  const items = props.items
  const setItemInfo = props.setItemInfo
  // store 인 경우.
  // col이 5개라고 가정
  if ( !isInventory && items[number1*5 + number2]) {
    console.log(items[number1*5 + number2])
  }
  // Store랑 Inventory를 구분해야하지만, 일단은 구분없이 나올 수 있도록함.
  // 밑에 item Number와 itemName 같은 데이터를 json같은 형태로 미리 만들어놔야할듯하다.
  // 그리고 object 형태로 setItemInfo에 넣을 예정
  return <TouchableHighlight
            onPress={() => {
              setItemInfo({
                itemNumber: number2,
                itemName: '아이템이름'
              });
            }}
          >
            <View>
              {/* 여기는 아이템 이미지가 들어갈 영역입니다. splash 대신 위에 들어갈 object에서 뽑아야합니다 */}
              <Image style={styles.tinyLogo} source={require('../../assets/splash.png')} />
            </View>
          </TouchableHighlight>
}

export default function InvenGrid({ items, isInventory }) {
  const [itemInfo, setItemInfo] = useState(null)

  return (
      <View style={ styles.testGrid }>
        <ClickStoreItem itemInfo={ itemInfo } setItemInfo={ setItemInfo }/>
        <View style={ styles.testGridContainer }>
          {[0, 1, 2, 3].map((number1) =>
            <View key={number1.toString()} style={ styles.testGridRow }>
              {[0, 1, 2 ,3 ,4].map((number2) =>
                <View key={number2.toString()} style={ styles.testGridCell }>
                  <ItemGrid number1={ number1 } number2={ number2 } items={ items } isInventory={ isInventory } setItemInfo={ setItemInfo } />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
  },

  testGrid: {
    color: '#776e65',
    position: 'relative',
    backgroundColor: '#bbada0',
    width: '100%',
    height: 300,
  },
  testGridContainer: {
    color: '#776e65',
    position: 'absolute',
    zIndex: 1,
  },
  testGridRow: {
    color: '#776e65',
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
  },
  testGridCell: {
    color: '#776e65',
    width: 56.25,
    height: 56.25,
    marginRight: 15,
    borderRadius: 3,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
  }

})

