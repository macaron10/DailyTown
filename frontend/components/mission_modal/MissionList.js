import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { List, Card, IconButton, Paragraph } from 'react-native-paper';

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
    <IconButton
        icon="camera"
        // style={styles.showButton}
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

export default function MissionList() {
  const ref = useRef(true);

  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoInfo, setPhotoInfo] = useState(null);

  if (isCameraOn) {
    return(
      <View style={ styles.container }>
        <CheckCamera isCameraOn={ isCameraOn } setIsCameraOn={ setIsCameraOn } setPhotoInfo={ setPhotoInfo } />
        <CheckImage photoInfo={ photoInfo } setPhotoInfo={ setPhotoInfo } />
      </View>
    );
  } else {
    return (
      <List.Section
      style={ styles.container }
      title="오늘의 미션"
      >
        <ScrollView>
          <List.Accordion
            title="꽃 사진을 찍으세요."
            // left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded1}
            onPress={() => {
              setExpanded1(!expanded1)
              setExpanded2(!expanded1)
              setExpanded3(!expanded1)
            }}
            >
            <Card>
              <Card.Title
                title="보상"
              >
              </Card.Title>
              <Card.Cover source={require('../../assets/test_img/pica.png')} />
              <Card.Content>
                <Camera setIsCameraOn={ setIsCameraOn } />
              </Card.Content>
            </Card>
          </List.Accordion>

          <List.Accordion
            title="Controlled Accordion"
            // left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded2}
            onPress={() => {
              setExpanded1(false)
              setExpanded2(!expanded2)
              setExpanded3(false)
            }}
            >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Controlled Accordion"
            // left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded3}
            onPress={() => {
              setExpanded1(false)
              setExpanded2(false)
              setExpanded3(!expanded3)
            }}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </ScrollView>
      </List.Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});