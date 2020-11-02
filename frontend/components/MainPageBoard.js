import React, { useState } from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';


const deviceWidth = Dimensions.get('window').width
const height = (deviceWidth-20) / 9
const width = (deviceWidth-20) / 9
const yStartPoint = 100

const Tile = (props) => {
  const [changeOpacity, setChangeOpacity] = useState(1);
  const onPressIn = () => { setChangeOpacity(0) }
  const onPressOut = () => { setChangeOpacity(1) }
  return (
    <TouchableWithoutFeedback
      onPressIn={ () => { onPressIn() } }
      onPressOut={ () => { onPressOut() } }
    >
      <Image
        style={{height:height, width:width, left:props.xMove, top:props.yMove, zIndex: props.z, opacity: changeOpacity}}
        source={require('../assets/tileImage/' + 'grass' + '.png')}          
      />
    </TouchableWithoutFeedback>
  );
}

const Landscape = () => {
  const tiles = [];
  for (let i = 9; i > 0; i--) {
    tiles.push(Array(9).fill('road'));    
  }
  let yPoint = yStartPoint
  let xPoint = 0
  return (
    <View>
      {tiles.map((row, y) => {
        let xMove = -width*0.5 + xPoint
        let yMove = width*0.5/4*6 + yPoint
        xPoint -= width * 0.5
        yPoint -= 8 * height + height*2/3 + height*0.08
        return row.map((tile, x) => {
          const z = x + 100;
          xMove += width * 0.5
          yMove -= height * 0.5 / 4 * 6
          // x, y로 좌표값 가능 (0,0) ~ (8, 8)
          // 오른쪽 아래로 대각선이 x 축 0에서 시작
          // 왼쪽 아래로 대각선이 y 축 0에서 시작
          return <Tile key={`${x}${y}`} x={x} y={y} xMove={xMove} yMove={yMove} z={z} />
        });
      })}
    </View>
  )
}

export default function Board() {
  return (
    <View style={styles.container}>
      <Landscape />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
