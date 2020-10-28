import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Inventory from './components/Inventory'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerUnder}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => alert('Hello, world!')}
            style={{ backgroundColor: 'red', width: '50%' }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Inven</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('Hello, world!')}
            style={{ backgroundColor: 'blue', width: '50%',  }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Store</Text>

          </TouchableOpacity>        
        </View>
        <Inventory/>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerUnder: {
    flex: 1,
    justifyContent: 'flex-end'
  },

});
