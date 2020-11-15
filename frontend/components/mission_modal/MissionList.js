import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import { List, IconButton } from 'react-native-paper';

import CameraOn from '../cameramodal/CameraOn';
import ImageModal from '../cameramodal/CameraModal';
import DynamicItems from "../mainbottom/DynamicItems"


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
    return <ImageModal photoInfo={ photoInfo } setPhotoInfo={ props.setPhotoInfo } userToken={ props.userToken } missionInfo={ props.missionInfo } myItems={ props.myItems } />
  }
  else {
    return <View/>
  }
}

function Camera({ setIsCameraOn, setMissionInfo, missionInfo }) {
  const clickCameraOn = () => setIsCameraOn(prevStatus => !prevStatus);
  // console.log("여긴 넘어왔나?", missionInfo)

  return (
    <IconButton
      icon="camera"
      style={styles.cameraIcon}
      onPress={() => {
        clickCameraOn();
        setMissionInfo(missionInfo)
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

export default function MissionList({ userToken, myMission, myItems }) {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoInfo, setPhotoInfo] = useState(null);
  const [missionInfo, setMissionInfo] = useState(null);

  // console.log("MissionList.js 까지 넘어옴!", myMission)

  if (isCameraOn) {
    return(
      <CheckCamera isCameraOn={ isCameraOn } setIsCameraOn={ setIsCameraOn } setPhotoInfo={ setPhotoInfo } />
    );
  } else if (photoInfo) {
    return(
      <CheckImage photoInfo={ photoInfo } setPhotoInfo={ setPhotoInfo } userToken={ userToken } missionInfo={ missionInfo } myItems={ myItems }/>
    )
  } else {
    return (
      <List.Section
        style={ styles.container }
        title="오늘의 미션"
      >
        <ScrollView>
          {myMission.map( missionInfo => {
            if (!missionInfo.iscleared) {
              return (
                <List.Accordion
                  key={missionInfo.id}
                  title={missionInfo.mission.description}
                  // left={props => <List.Icon {...props} icon="folder" />}
                >
                  <Text>보상</Text>
                  <Image style={ styles.rewardImg } source={ DynamicItems[missionInfo.item.name] } />
                  <Camera setIsCameraOn={ setIsCameraOn } setMissionInfo={ setMissionInfo } missionInfo={ missionInfo }/>
                </List.Accordion>
              )
            }
          })}
        </ScrollView>
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