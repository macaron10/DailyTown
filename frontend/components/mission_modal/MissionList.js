import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import { List, IconButton } from 'react-native-paper';

import CameraOn from '../cameramodal/CameraOn';
import ImageModal from '../cameramodal/CameraModal';
import missionData from "./MissionData";


function CheckCamera(props) {
  const isCameraOn = props.isCameraOn
  if ( isCameraOn ) {
    return <CameraOn setIsCameraOn={ props.setIsCameraOn } setPhotoInfo={ props.setPhotoInfo } />
  }
  else {
    return <View />
  }
}

function CheckImage(props) {
  const photoInfo = props.photoInfo
  if ( photoInfo ) {
    // Alert.alert('New Image Detect')
    return <ImageModal photoInfo={ photoInfo } setPhotoInfo={ props.setPhotoInfo } userToken={ props.userToken } />
  }
  else {
    return <View/>
  }
}

function Camera({ setIsCameraOn }) {
  const clickCameraOn = () => setIsCameraOn(prevStatus => !prevStatus);
  return (
    <IconButton
      icon="camera"
      style={styles.cameraIcon}
      onPress={() => {
        clickCameraOn();
      }}
      size={40}
    ></IconButton>
    // <TouchableOpacity
    //   onPress={() => {
    //     clickCameraOn()
    //   }}
    //   style={{ backgroundColor: 'blue', }}
    // >
    //   <Text style={{ color: '#fff', textAlign: 'center' }}>Picture</Text>
    // </TouchableOpacity>
  );
}

export default function MissionList({ userToken, myMission }) {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoInfo, setPhotoInfo] = useState(null);

  console.log("MissionList.js 까지 넘어옴!", myMission)

  if (isCameraOn) {
    return(
      <CheckCamera isCameraOn={ isCameraOn } setIsCameraOn={ setIsCameraOn } setPhotoInfo={ setPhotoInfo } />
    );
  } else if (photoInfo) {
    return(
      <CheckImage photoInfo={ photoInfo } setPhotoInfo={ setPhotoInfo } userToken={ userToken }/>
    )
  } else {
    return (
      <List.Section
        style={ styles.container }
        title="오늘의 미션"
      >
        <ScrollView>
          {myMission.map(({ id, item, mission, iscleared }) => {
            if (!iscleared) {
              return (
                <List.Accordion
                  key={id}
                  title={mission.description}
                  // left={props => <List.Icon {...props} icon="folder" />}
                >
                  <Text>보상</Text>
                  {/* <Image style={ styles.rewardImg } source={require(`../../assets/itemlist/${item.name}.png`)} /> */}
                  <Camera setIsCameraOn={ setIsCameraOn } />
                </List.Accordion>
              )
            }
          })}
        </ScrollView>
        {/* <ScrollView>
          {missionData.map(({ title, imgUrl }) => {
            return (
              <List.Accordion
                key={title}
                title={title}
                // left={props => <List.Icon {...props} icon="folder" />}
              >
                <Text>보상</Text>
                <Image style={ styles.rewardImg } source={imgUrl} />
                <Camera setIsCameraOn={ setIsCameraOn } />
              </List.Accordion>
            )
          })}
        </ScrollView> */}
      </List.Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  rewardImg: {
    width: 200,
    height: 200,
    left: "50%",
    marginLeft: -100
  },
  cameraIcon: {
  }
});