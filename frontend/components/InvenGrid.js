import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';

const test = [1, 2, 3, 4]

{/* <Image style={styles.tinyLogo} source={require('@expo/snack-static/react-native-logo.png')} /> */}
{/* <Image
style={styles.tinyLogo}
source={{
  uri: 'https://reactnative.dev/img/tiny_logo.png',
}}
/> */}

const ItemGrid = (props) => {
  const number1 = props.number1
  const number2 = props.number2
  // console.log(number1, number2)
  return <Image style={styles.tinyLogo} source={require('../assets/splash.png')} />
  // return <Text>{number1}, {number2}</Text>
}

export default function InvenGrid() {
  // const [isInventory, setIsInventory] = useState(true);
  // const [isStore, setIsStore] = useState(false);
  // const clickInventory = () => setIsInventory(() => true); setIsStore(() => false);
  // const clickStore = () => setIsInventory(() => false); setIsStore(() => true);

  return (

      <View style={ styles.testGrid }>
        <View style={ styles.testGridContainer }>
          {[0, 1, 2, 3].map((number1) =>
            <View key={number1.toString()} style={ styles.testGridRow }>
              {[0, 1, 2 ,3 ,4].map((number2) =>
                <View key={number2.toString()} style={ styles.testGridCell }>
                  <ItemGrid number1={number1} number2={number2} />
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

