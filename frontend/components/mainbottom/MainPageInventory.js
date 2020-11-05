import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MainPageInvenGrid from './MainPageInvenGrid'
import StoreItem from './StoreItem.json'
import axios from 'axios'

function CheckInventory(props) {
  const isInventory = props.isInventory
  const myItems = props.myItems
  const storeItems = StoreItem
  // 여기서 store Item과 user item이 필요하다.
  if ( isInventory ) {
    return <MainPageInvenGrid isInventory={ isInventory } items={ myItems } setMyItem={ props.setMyItems } setGoldStatus={ props.setGoldStatus } />
  }
  else {
    // inven grid 형태로 넘겨준다. isInventory를 넘겨주는 것은, 컴포넌트를 최대한 활용하기위함
    return <MainPageInvenGrid isInventory={ isInventory } items={ storeItems } setMyItem={ props.setMyItems } setGoldStatus={ props.setGoldStatus }/>
  }

}

export default function Inventory({ myItems, setMyItems, setGoldStatus }) {
  const [isInventory, setIsInventory] = useState(true);
  // isStore는 현재는 필요없으나, 나중에 필요하게 될수 있기 때문에 넣어둔다. 왜냐면 isInventory로 다 분기가 가능하기 때문.
  const [isStore, setIsStore] = useState(false);
  const clickInventory = () => { setIsInventory(() => true); setIsStore(() => false) };
  const clickStore = () => { setIsStore(() => true ); setIsInventory(() => false) };

  return (
    <View style={styles.containerUnder}>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => clickInventory()}
          style={{ backgroundColor: 'red', width: '50%' }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Inventory</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => clickStore()}
          style={{ backgroundColor: 'blue', width: '50%',  }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Store</Text>

        </TouchableOpacity>
      </View>
      <CheckInventory isInventory={ isInventory } myItems={ myItems } setMyItems={ setMyItems } setGoldStatus={ setGoldStatus } />


    </View>
  );
}

const styles = StyleSheet.create({
  containerUnder: {
    flex: 1,
    justifyContent: 'flex-end'
  },

})

