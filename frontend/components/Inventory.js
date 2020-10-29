import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import InvenGrid from './InvenGrid'

function CheckInventory(props) {
  const isInventory = props.isInventory

  if (isInventory) {
    return <InvenGrid/>
  }
  else {
    return <InvenGrid/>
  }

}

export default function Inventory() {
  const [isInventory, setIsInventory] = useState(true);
  const [isStore, setIsStore] = useState(false);
  const clickInventory = () => { setIsInventory(() => true); setIsStore(() => false) };
  const clickStore = () => { setIsStore(() => true ); setIsInventory(() => false) };
  // isStore

  return (
    <View style={styles.containerUnder}>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => clickInventory()}
          style={{ backgroundColor: 'red', width: '50%' }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Inven</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => clickStore()}
          style={{ backgroundColor: 'blue', width: '50%',  }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Store</Text>

        </TouchableOpacity>
      </View>
      <CheckInventory isInventory={ isInventory } />


    </View>
  );
}

const styles = StyleSheet.create({
  containerUnder: {
    flex: 1,
    justifyContent: 'flex-end'
  },

})

