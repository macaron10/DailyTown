import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyGold({ goldStatus }) {
  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: 'blue', width: '30%'}}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>골드량: { goldStatus } </Text>
      </TouchableOpacity>
    </View>
  );
}
