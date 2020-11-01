import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import missionData from "./MissionData";
import CameraOn from '../cameramodal/CameraOn';
import ImageModal from '../cameramodal/CameraModal';

function CheckCamera(props) {
  const isCameraOn = props.isCameraOn
  if ( isCameraOn ) {
    return <CameraOn setIsCameraOn={ props.setIsCameraOn } setPhotoInfo={ props.setPhotoInfo }/>
  }
  else {
    return <View />
  }
}

function CheckImage(props) {
  const photoInfo = props.photoInfo
  if ( photoInfo ) {
    Alert.alert('New Image Detect')
    return <ImageModal photoInfo={ photoInfo } setPhotoInfo={ props.setPhotoInfo }/>
  }
  else {
    return <View/>
  }
}

function Camera({ setIsCameraOn }) {
  const clickCameraOn = () => setIsCameraOn(prevStatus => !prevStatus);
  return (
    <TouchableOpacity
      onPress={() => clickCameraOn()}
      style={{ backgroundColor: 'blue', }}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>Picture</Text>
    </TouchableOpacity>
  );
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function MissionList() {
  const ref = React.useRef(true);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoInfo, setPhotoInfo] = useState(null);

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      <CheckCamera isCameraOn={ isCameraOn } setIsCameraOn={ setIsCameraOn } setPhotoInfo={ setPhotoInfo } />
      <CheckImage photoInfo={ photoInfo } setPhotoInfo={ setPhotoInfo } />

      {missionData.map(({ bg, color, title, contents }, index) => {
        return (
          <TouchableOpacity
          key={title}
          onPress={() => {
            ref.current.animateNextTransition();
            setCurrentIndex(index === currentIndex ? null : index);
          }}
          style={styles.cardContainer}
          activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: bg }]}>
              <Text style={[styles.heading, { color }]}>{title}</Text>
              {index === currentIndex && (
                <View style={styles.contentsContainer}>
                  <Text style={[styles.body, { color }]}>
                    {contents}
                  </Text>
                  <Camera setIsCameraOn={ setIsCameraOn } />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 300,
    // height: 500,
  },
  cardContainer: {
    // flexGrow: 1,
    // width: 300,
  },
  card: {
    // flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
    // width: 300,
    // alignItems: "center",
    // justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    // textTransform: "uppercase",
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  contentsContainer: {
    marginTop: 20,
  }
});
