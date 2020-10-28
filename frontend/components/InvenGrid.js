import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';


export default function InvenGrid() {
  // const [isInventory, setIsInventory] = useState(true);
  // const [isStore, setIsStore] = useState(false);
  // const clickInventory = () => setIsInventory(() => true); setIsStore(() => false);
  // const clickStore = () => setIsInventory(() => false); setIsStore(() => true);

  return (

      <View style={ styles.testGrid }>
        <View style={ styles.testGridContainer }>
          {[0, 1, 2, 3].map((number) =>
            <View key={number.toString()} style={ styles.testGridRow }>
              {[0, 1, 2 ,3 ,4].map((number) =>
                <View key={number.toString()} style={ styles.testGridCell }>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({

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

