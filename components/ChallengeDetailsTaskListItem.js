import React, {useContext, useState} from "react";
import {ListItem} from "react-native-elements";
import {Snackbar} from "react-native-paper";
import ChallengeContext from "../contexts/Challenge";
import * as ImagePicker from "expo-image-picker";
import LoggedInUserContext from "../contexts/LoggedInUser";
import {useActionSheet} from "@expo/react-native-action-sheet";
import ChallengeDetailsTaskListItemOverlay
  from "./ChallengeDetailsTaskListItemOverlay";

export default function ChallengeDetailsTaskListItem({ item, index }) {
  const { id: challengeId } = useContext(ChallengeContext);
  const { user, setUser, user: { challenges: userChallenges } } = useContext(LoggedInUserContext);

  const { showActionSheetWithOptions } = useActionSheet();
  const [overlayVisibility, setOverlayVisibility] = useState(false);
  const [overlayData, setOverlayData] = useState({});
  const verifiedTasks = userChallenges[challengeId]?.verifiedTasks || {};
  const checkedTasks = userChallenges[challengeId]?.checkedTasks || {};
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  function toggleTaskCheck(key) {
    const options = ["Choose from Camera Roll", "Take Photo", "Cancel"];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 2) return;
        const isCameraRoll = buttonIndex === 0;
        const permission = isCameraRoll ?
          await ImagePicker.requestCameraRollPermissionsAsync() :
          await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return alert("You need to allow" +
          " permissions to send photo proof.");
        const opts = { allowsEditing: true };
        const proofImage = isCameraRoll ?
          await ImagePicker.launchImageLibraryAsync(opts) :
          await ImagePicker.launchCameraAsync(opts);
        if (proofImage.cancelled) return;
        user.challenges[challengeId].checkedTasks[key] = true;
        setUser({...user});
        setSnackbarVisibility(true);
      }
    );
  }

  return (
    <>
      <ChallengeDetailsTaskListItemOverlay
        data={overlayData}
        visibility={overlayVisibility}
        onBackdropPress={() => {setOverlayVisibility(false)}}
      />
      <ListItem
        title={item.name}
        onPress={() => {
          setOverlayVisibility(true);
          setOverlayData({
            title: item.name,
            description: item.description,
          });
        }}
        subtitleStyle={{color: '#bbbbbb'}}
        subtitle={checkedTasks[index] ? verifiedTasks[index] ? 'Verified!' : 'Undergoing Verification...' : ''}
        checkBox={{
          checked: checkedTasks[index],
          onPress: () => (!checkedTasks[index] || verifiedTasks[index]) && toggleTaskCheck(index),
          checkedColor: !verifiedTasks[index] ? 'gray' : 'green'
        }}
      />
      <Snackbar
        visible={snackbarVisibility}
        onDismiss={() => setSnackbarVisibility(false)}
        action={{
          label: "OK",
          onPress: () => {},
        }}
      >
        Sent image for verification.
      </Snackbar>
    </>
  );
}
