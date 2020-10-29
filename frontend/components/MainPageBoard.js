import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

const height = 40
const width = 40
const yStartPoint = 150

const Tile = (props) => {
  return (
    <View>
      <Image 
        style={{ height:height, width:width, left: props.x, top: props.y, zIndex: props.z}} 
        source={require('../assets/tileImage/' + 'road' + '.png')}
      />
    </View>
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
        let xx = -width*0.5 + xPoint
        let yy = width*0.5/4*6 + yPoint
        xPoint -= width * 0.5
        yPoint -= 8 * height + height*2/3 + height*0.08
        return row.map((tile, x) => {
          const z = x + 100;
          xx += width * 0.5
          yy -= height * 0.5 / 4 * 6
          // x, y로 좌표값 가능 (0,0) ~ (8, 8)
          // 오른쪽 아래로 대각선이 x 축 0에서 시작
          // 왼쪽 아래로 대각선이 y 축 0에서 시작
          // console.log(x, y)
          // console.log(tiles[x][y])
          // if (x === 1 && y === 5) {
          //   return <Tile key={`${x}${y}`} x={xx} y={yy} z={z} />;            
          // }
          return <Tile key={`${x}${y}`} x={xx} y={yy} z={z} />;
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '60vh'
  },
});
