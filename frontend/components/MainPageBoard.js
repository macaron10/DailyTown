import Axios from 'axios';
import React, { useState } from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback,Alert, Platform } from 'react-native';
import DynamicItems from "./mainbottom/DynamicItems"
import axios from 'axios'

const deviceWidth = Dimensions.get('window').width
const xyCount = 6
const height = (deviceWidth - 20) / xyCount
const width = (deviceWidth - 20) / xyCount
const yStartPoint = 100

function MyForest(props) {
  const deviceWidth = Dimensions.get('window').width
  const width = (deviceWidth - 20) / xyCount
  function handleDataChange(e) {
    props.onDataChange(e)
  }
  function handleIsMoveChange(isMove, idx) {
    props.onIsMoveChange(isMove, idx)
  }
  const data = props.data
  return (
    data.map((xyInfo, idx) => {
      const url = DynamicItems[xyInfo.name]
      let height
      if (Platform.OS === 'web') {
        height = 40
      } else {
        const image = Image.resolveAssetSource(url)
        height = image.height * width / image.width
      }
      // 개발환경을 위한 분기 web인 경우 임시의 숫자 넣어놓음
      // 웹에서는 resolveAssetSource 오류
      // const image = Image.resolveAssetSource(url)
      // const height = image.height*width/image.width
      return (
        <TouchableWithoutFeedback key={`${xyInfo.x}${xyInfo.y}`}
          onPressIn={() => {
            Alert.alert(
              'X:' + String(xyInfo.x) + ', Y:' + String(xyInfo.y),
              "어떤 작업을 하시겠습니까?",
              [
                { text: "취소" },
                {
                  text: "이동",
                  onPress: () => {
                    handleIsMoveChange(props.isMove, idx)                  
                  }
                },
                {
                  text: "삭제",
                  onPress: () => {
                    const newData = [...data]
                    const id = newData[idx]['id']
                    newData.splice(idx, 1)                                        
                    axios
                      .put(`http://k3b305.p.ssafy.io:8005/account/myitem/${id}/`, {isinfarm: false}, {'headers' : {
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImhpaGkyQHNzYWZ5LmNvbSIsImV4cCI6MTYwNzU3OTQ4MCwiZW1haWwiOiJoaWhpMkBzc2FmeS5jb20ifQ.16bmul0SrSeqEe3ZJkxIJfS1kne3ZkmYOVMUIVOfByk'
                          }
                        })
                      .then(() => {handleDataChange(newData)})
                      .catch(err => console.log(err))
                  }
                },
              ],
              { cancelable: true }
            )
          }
          }
        >
          <Image
            style={{
              position: 'absolute',
              alignContent: 'center',
              resizeMode: 'contain',
              height: height,
              width: width,
              top: yStartPoint - height + width * 2 / 3 - 0.04 * width + xyInfo.x * width / 3 + xyInfo.y * width / 3 - (xyInfo.x + xyInfo.y) * width * 0.08,
              left: deviceWidth * 0.5 - width * 0.5 + xyInfo.x * width * 0.5 - xyInfo.y * width * 0.5,
              zIndex: xyInfo.x + xyInfo.y + 200
            }}
            source={url}
          />
        </TouchableWithoutFeedback>
      )
    })
  )
}

const Tile = (props) => {
  const [changeOpacity, setChangeOpacity] = useState(1);
  const onPressIn = () => { setChangeOpacity(0) }
  const onPressOut = () => { setChangeOpacity(1) }
  let url
  if (props.isSomething) {
    url = props.shape.road
  } else {
    url = props.shape.grass
  }
  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        if (props.isMove) {
          if (!props.isSomething){
            onPressIn()
            const newData = [...props.data]
            const name = newData[props.targetIdx]['name']
            const id = newData[props.targetIdx]['id']
            newData[props.targetIdx] = {
              x: props.x,
              y: props.y,
              name: name,
            }

            props.onIsMoveChange(true, null)
            props.onDataChange(newData)            
          }
        } else {
          onPressIn()
        }
      }}
      onPressOut={() => { onPressOut() }}
    >
      <Image
        style={{ resizeMode: 'contain', height: height, width: width, left: props.xMove, top: props.yMove, zIndex: props.z, opacity: changeOpacity }}
        source={url}
      />
    </TouchableWithoutFeedback>
  );
}

const Landscape = (props) => {
  const tiles = props.tiles
  let yPoint = yStartPoint
  let xPoint = 0
  const imageUrl = {
    road: require('../assets/tileImage/road.png'),
    grass: require('../assets/tileImage/grass.png')
  }
  return (
    <View>
      {tiles.map((row, y) => {
        let xMove = -width * 0.5 + xPoint
        let yMove = width * 0.5 / 4 * 6 + yPoint
        xPoint -= width * 0.5
        yPoint -= (xyCount - 1) * height + height * 2 / 3 + height * 0.08
        return row.map((tile, x) => {
          const z = x + 100;
          xMove += width * 0.5
          yMove -= height * 0.5 / 4 * 6
          // x, y로 좌표값 가능 (0,0) ~ (5, 5)
          // 오른쪽 아래로 대각선이 x 축 0에서 시작
          // 왼쪽 아래로 대각선이 y 축 0에서 시작
          if (props.isMove && tiles[x][y]!==null) {
            return  <Tile key={`${x}${y}`} isMove={props.isMove} x={x} y={y} xMove={xMove} yMove={yMove} z={z} shape={imageUrl} isSomething={true} />
          }
          return <Tile key={`${x}${y}`} isMove={props.isMove} x={x} y={y} xMove={xMove} yMove={yMove} z={z} shape={imageUrl} isSomething={false} data={props.data} targetIdx={props.targetIdx} onIsMoveChange={props.onIsMoveChange} onDataChange={props.onDataChange} />
        });
      })}
    </View>
  )
}

export default function Board(props) {
  const [targetIdx, setTargetIdx] = useState(null)
  const [data, setData] = useState(
    // [
    //   {
    //     "id": 2,
    //     "name": "house1",
    //     "x": 0,
    //     "y": 0,
    //   },
    // ]
    props.boardData
  )
  // console.log(data)
  // setData(props.boardData)

  function changeDate(newData) {
    setData(newData)
    const newArray = [];
    for (let i = xyCount; i > 0; i--) {
      newArray.push(Array(xyCount).fill(null));
    }
    newData.forEach(element => {
      newArray[element.x][element.y] = element.name 
    });
    setTiles(newArray)
  }
  const newArray = [];
  for (let i = xyCount; i > 0; i--) {
    newArray.push(Array(xyCount).fill(null));
  }
  data.forEach(element => {
    newArray[element.x][element.y] = element.name
  });
  const [tiles, setTiles] = useState(newArray)
  const [isMove, setIsMove] = useState(false)
  function changeIsMove(isMove, idx) {
    setIsMove(!isMove)
    setTargetIdx(idx)
  }
  if (isMove) {
    return (
      <View style={styles.container}>
        <Landscape isMove={isMove} tiles={tiles} data={data} targetIdx={targetIdx} onIsMoveChange={changeIsMove} onDataChange={changeDate} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MyForest onDataChange={changeDate} data={data} onIsMoveChange={changeIsMove} />
      <Landscape isMove={isMove} tiles={tiles} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
