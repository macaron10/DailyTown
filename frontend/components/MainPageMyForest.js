import React from 'react'
import { Image, Dimensions, TouchableWithoutFeedback, Alert, Platform } from 'react-native'

// Data를 Array로 입력받는다고 가정
const data = [
  { x: 1, y: 0 },
  { x: 2, y: 1 },
  { x: 8, y: 8 },
  { x: 7, y: 4 },
  { x: 5, y: 4 },
]

function ImageModal(xyInfo) {
  Alert.alert(
    'X:' + String(xyInfo.x) + ', Y:' + String(xyInfo.y),
    "어떤 작업을 하시겠습니까?",
    [
      { text: "취소" },
      { text: "이동", onPress: () => [console.log("좌표이동")] },
      { text: "삭제", onPress: () => { console.log("전체배열에서 삭제하고 인벤토리로 옮기는 로직") } },
    ],
    { cancelable: true }
  );
}


export default function MyForest(props) {
  const deviceWidth = Dimensions.get('window').width
  const width = (deviceWidth - 20) / 9
  return (
    data.map((xyInfo) => {
      const url = require('../assets/test_img/tree.png')
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
          onPressIn={() => { ImageModal(xyInfo) }}
        >
          <Image
            style={{
              position: 'absolute',
              alignContent: 'center',
              resizeMode: 'contain',
              height: height,
              width: width,
              top: props.yStartPoint - height + width * 1 / 3 + 0.08 * width + xyInfo.x * width / 3 + xyInfo.y * width / 3 - (xyInfo.x + xyInfo.y) * width * 0.08,
              left: deviceWidth * 0.5 - width * 0.5 + xyInfo.x * width * 0.5 - xyInfo.y * width * 0.5,
              zIndex: xyInfo.x + xyInfo.y + 200
            }}
            source={require('../assets/test_img/' + 'tree' + '.png')}
          />
        </TouchableWithoutFeedback>
      )
    })
  )
}
