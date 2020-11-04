import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert, ScrollView  } from 'react-native';
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
    return <StoreItemModal itemInfo={ itemInfo } setItemInfo={ props.setItemInfo } setGoldStatus={ props.setGoldStatus }/>
  }
  else {
    return <View/>
  }
}

function ShowItem(props) {
  const setItemInfo = props.setItemInfo
  const item = props.item
  return <TouchableHighlight
          onPress={() => {
            setItemInfo(item);
          }}
        >
          <View>
            {/* 여기는 아이템 이미지가 들어갈 영역입니다. splash 대신 위에 들어갈 object에서 뽑아야합니다 */}
            <Image style={styles.tinyLogo} source={require(`../../assets/` + ( item['image'] ? item['image'] : 'splash.png' ) )} />
          </View>
        </TouchableHighlight>
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
    return <ShowItem item={ items[number1*5 + number2] } setItemInfo={ setItemInfo } setGoldStatus={ props.setGoldStatus }/>
  }
  else {
    return <ShowItem item={ items[0] } setItemInfo={ setItemInfo } setGoldStatus={ props.setGoldStatus }/>
  }
}

export default function InvenGrid({ items, isInventory, setGoldStatus }) {
  const [itemInfo, setItemInfo] = useState(null)

  return (
      <View style={ styles.testGrid }>
        <ScrollView contentContainerStyle={ styles.testGridContainer }>
          {[0, 1, 2, 3].map((number1) =>
            <View key={number1.toString()} style={ styles.testGridRow }>
              {[0, 1, 2 ,3 ,4].map((number2) =>
                <View key={number2.toString()} style={ styles.testGridCell }>
                  <ItemGrid
                    number1={ number1 }
                    number2={ number2 }
                    items={ items }
                    isInventory={ isInventory }
                    setItemInfo={ setItemInfo }
                    setGoldStatus={ setGoldStatus }
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
        <ClickStoreItem itemInfo={ itemInfo } setItemInfo={ setItemInfo } setGoldStatus={ setGoldStatus }/>
      </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
  },

  testGrid: {
    flex: 0.8,
    color: '#776e65',
    position: 'relative',
    backgroundColor: '#bbada0',
    // width: '100%',
    // height: '50%',
  },
  testGridContainer: {
    color: '#776e65',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    paddingBottom: 9,
  },
  testGridRow: {
    color: '#776e65',
    paddingTop: 9,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  testGridCell: {
    color: '#776e65',
    // width: 56.25,
    // height: 56.25,
    // marginRight: 15,
    borderRadius: 3,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
  }

})

