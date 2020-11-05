import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert, ScrollView  } from 'react-native';
import StoreItemModal from './StoreItemModal'
import DynamicItems  from './DynamicItems'


function ClickStoreItem(props) {
  const itemInfo = props.itemInfo
  const setMyItems = props.setMyItems
  if ( itemInfo ) {
    return <StoreItemModal
              itemInfo={ itemInfo }
              setMyItems={ setMyItems }
              setItemInfo={ props.setItemInfo }
              setGoldStatus={ props.setGoldStatus }
              isInventory={ props.isInventory }
            />
  }
  else {
    return <View/>
  }
}

function ShowItem(props) {
  const setItemInfo = props.setItemInfo
  const item = props.item
  const isInventory = props.isInventory

  // 동적할당을 위한 노가다가 필요하다.
  const image = item['image'] ? DynamicItems[item['image']] : DynamicItems['default']

  return <TouchableHighlight
          onPress={() => {
            setItemInfo(item);
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* 여기는 아이템 이미지가 들어갈 영역입니다. splash 대신 위에 들어갈 object에서 뽑아야합니다 */}
            <Image
              style={ isInventory ? styles.tinyLogo : styles.storeTinyLogo }
              resizeMode="contain"
              source={image}
              />
            { !isInventory ? <Text style={{ }}>이름, 가격 </Text> : <Text></Text>}
            {/* 아래처럼 하면 안됩니다. react는 되는데 native는 동적할당이 불가능합니다 */}
            {/* <Image style={styles.tinyLogo} source={require(`../../assets/` + item.image)} /> */}
            {/* <Image style={styles.tinyLogo} source={require(`../../assets/` + ( item.image ? item.image : 'splash.png' ))} /> */}
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
  // col이 4개라고 가정
  if ( !isInventory && items[number1*4 + number2]) {
    return <ShowItem item={ items[number1*4 + number2] } isInventory={ isInventory } setItemInfo={ setItemInfo } setGoldStatus={ props.setGoldStatus }/>
  }
  else {
    return <ShowItem item={ items[0] } isInventory={ isInventory } setItemInfo={ setItemInfo } setGoldStatus={ props.setGoldStatus }/>
  }
}

function ItemGridRow({ number1, items, setMyItems, isInventory, setItemInfo, setGoldStatus }) {

  let column
  if (isInventory) {
    column = [0, 1, 2, 3]
  }
  else {
    column = [0, 1]

  }

  return column.map((number2) =>
          <View key={number2.toString()} style={ styles.testGridCell }>
            <ItemGrid
              number1={ number1 }
              number2={ number2 }
              items={ items }
              setMyItems={ setMyItems }
              isInventory={ isInventory }
              setItemInfo={ setItemInfo }
              setGoldStatus={ setGoldStatus }
            />
          </View>
        )

}

export default function InvenGrid({ items, setMyItems, isInventory, setGoldStatus }) {
  const [itemInfo, setItemInfo] = useState(null)

  return (
      <View style={ styles.testGrid }>
        <ScrollView contentContainerStyle={ styles.testGridContainer }>
          {/* 여기도 스토어 아이템의 경우 더 늘려야할 듯 합니다. */}
          {[0, 1, 2, 3, 4].map((number1) =>
            <View key={number1.toString()} style={ styles.testGridRow }>
              <ItemGridRow
                number1={ number1 }
                items={ items }
                setMyItems={ setMyItems }
                isInventory={ isInventory }
                setItemInfo={ setItemInfo }
                setGoldStatus={ setGoldStatus }
              />
            </View>
          )}
        </ScrollView>
        <ClickStoreItem itemInfo={ itemInfo } isInventory={ isInventory } setMyItems={ setMyItems } setItemInfo={ setItemInfo } setGoldStatus={ setGoldStatus }/>
      </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 65,
    height: 65,
  },
  storeTinyLogo: {
    width: 100,
    height: 65,
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
    paddingBottom: 12,
  },
  testGridRow: {
    color: '#776e65',
    paddingTop: 12,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  testGridCell: {
    // width: 56.25,
    // height: 56.25,
    // marginRight: 15,
    borderRadius: 3,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
  }

})

