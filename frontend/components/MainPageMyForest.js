import React, { useState } from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback, Text, Modal, TouchableHighlight } from 'react-native'

// Data를 Array로 입력받는다고 가정
const data = [
  { x: 0, y: 0 },
  { x: 2, y: 1 },
  { x: 8, y: 8 },
  { x: 8, y: 4 },
  { x: 5, y: 4 },
]


export default function MyForest(props) {
  const deviceWidth = Dimensions.get('window').width
  const width = (deviceWidth - 20) / 9
  const onPressIn = () => { console.log('in') }
  const onPressOut = () => { console.log('out') }
  return (
    data.map((d) => {
      return (
        <TouchableWithoutFeedback key={`${d.x}${d.y}`}
          onPressIn={() => { onPressIn() }}
          onPressOut={() => { onPressOut() }}
        >
          <Image
            style={{
              position: 'absolute',
              alignContent: 'center',
              height: width,
              width: width,
              top: props.yStartPoint - width * 2 / 3 + d.x * width / 3 + d.y * width / 3 - (d.x + d.y) * width * 0.07,
              left: deviceWidth * 0.5 - width * 0.5 + d.x * width * 0.5 - d.y * width * 0.5,
              zIndex: d.x + d.y + 200
            }}
            source={require('../assets/test_img/' + '나무' + '.png')}
          />
        </TouchableWithoutFeedback>
      )
    })
  )
}
