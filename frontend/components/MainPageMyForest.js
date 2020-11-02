import React from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

export default function MyForest(props) {
  const x = 5
  const y = 7
  const width = props.width
  return (
    <View>
      <Image
        style={{
          height: width, 
          width: width, 
          top: props.yStartPoint + x*width/3 + y*width/3 - (x+y)*width*0.08, 
          left: x*width*0.5 - y*width*0.5, 
          zIndex: x + y + 100
        }}
        source={require('../assets/test_img/' + '나무' + '.png')} 
      />
    </View>
  )
}


