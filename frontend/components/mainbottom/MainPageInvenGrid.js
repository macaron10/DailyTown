import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert, ScrollView  } from 'react-native';
import StoreItemModal from './StoreItemModal'
import DynamicItems  from './DynamicItems'


function ClickStoreItem(props) {
  const itemInfo = props.itemInfo
  const setMyItems = props.setMyItems
  if ( itemInfo ) {
    return <StoreItemModal
              items={ props.items }
              itemInfo={ itemInfo }
              itemForSell={ props.itemForSell }
              setMyItems={ setMyItems }
              setItemInfo={ props.setItemInfo }
              goldStatus={ props.goldStatus }
              setGoldStatus={ props.setGoldStatus }
              isInventory={ props.isInventory }
              setIsChangeItemPlace={ props.setIsChangeItemPlace }
              setChangedIndex={ props.setChangedIndex }
    
            />
  }
  else {
    return <View/>
  }
}

function ShowItem(props) {
  const setItemInfo = props.setItemInfo
  const item = props.item
  const items = props.items
  const isInventory = props.isInventory
  const setMyItems = props.setMyItems
  const index = props.index

  function changeItemPlace(changedIndex) {

    const tempItem = items[index]
    items[index] = items[changedIndex]
    items[changedIndex] = tempItem
    setMyItems(items)
    props.setChangedIndex(null)
    props.setIsChangeItemPlace(false)
  
  }

  // 동적할당을 위한 노가다가 필요하다.
  // 없으면 안뜬다.
  const image = DynamicItems[item['name']]

  return <TouchableHighlight
          onPress={() => {
            props.isChangeItemPlace ? changeItemPlace(props.changedIndex) : image ? setItemInfo([item, index]) : Alert.alert('비어있는 인벤토리입니다.')
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
  // number1 = row number2 col
  const number1 = props.number1
  const number2 = props.number2
  const isInventory = props.isInventory
  const items = props.items
  const setItemInfo = props.setItemInfo
  const index = number1*4 + number2

  // store 인 경우.
  // col이 4개라고 가정
  if ( !isInventory && items[number1*4 + number2]) {
    return <ShowItem
              item={ items[number1*4 + number2] }
              items = { items }
              isInventory={ isInventory }
              setItemInfo={ setItemInfo }
              setGoldStatus={ props.setGoldStatus }
              setMyItems= { props.setMyItems }
              index = { index }
              isChangeItemPlace={ false }
              />
            }
            else {
              return <ShowItem
              item={ items[number1*4 + number2] }
              items = { items }
              isInventory={ isInventory }
              setItemInfo={ setItemInfo }
              setGoldStatus={ props.setGoldStatus }
              setMyItems={ props.setMyItems }
              index = { index }
              isChangeItemPlace={ props.isChangeItemPlace }
              setIsChangeItemPlace= { props.setIsChangeItemPlace }
              changedIndex={ props.changedIndex }
              setChangedIndex={ props.setChangedIndex }
            />
  }
}

function ItemGridRow({ number1, items, setMyItems, isInventory, setItemInfo, setGoldStatus, isChangeItemPlace, setIsChangeItemPlace, changedIndex, setChangedIndex }) {

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
              isChangeItemPlace= { isChangeItemPlace }
              setIsChangeItemPlace={ setIsChangeItemPlace }
              changedIndex={ changedIndex }
              setChangedIndex={ setChangedIndex }
            />
          </View>
        )

}

export default function MainInvenGrid({ items, setMyItems, isInventory, goldStatus, setGoldStatus, itemForSell }) {
  const [itemInfo, setItemInfo] = useState(null)
  const [isChangeItemPlace, setIsChangeItemPlace] = useState(false)
  const [changedIndex, setChangedIndex] = useState(null)

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
                isChangeItemPlace={ isChangeItemPlace }
                setIsChangeItemPlace={ setIsChangeItemPlace }
                changedIndex={ changedIndex }
                setChangedIndex={ setChangedIndex }
              />
            </View>
          )}
        </ScrollView>
        <ClickStoreItem
          items={ items }
          itemInfo={ itemInfo }
          itemForSell={ itemForSell }
          isInventory={ isInventory }
          setMyItems={ setMyItems }
          setItemInfo={ setItemInfo }
          goldStatus={ goldStatus }
          setGoldStatus={ setGoldStatus }
          setIsChangeItemPlace={ setIsChangeItemPlace }
          setChangedIndex={ setChangedIndex }
        />
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

