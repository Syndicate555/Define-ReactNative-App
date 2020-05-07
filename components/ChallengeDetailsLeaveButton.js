import React, {useContext, useEffect} from "react";
import {View, StyleSheet, Alert} from "react-native";
import {Button} from "react-native-elements";
import LoggedInUserContext from "../contexts/LoggedInUser";
import ChallengeContext from "../contexts/Challenge";
import {useNavigation} from "@react-navigation/core";
import usePutData from "../hooks/usePutData";

export default function ChallengeDetailsLeaveButton() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(LoggedInUserContext);
  const putUser = usePutData(`users/${user.id}`);
  const { id } = useContext(ChallengeContext);

  return (
    <View style={styles.leave}>
      <Button
        icon={{
          name: 'logout',
          type: 'simple-line-icon',
          color: 'white'
        }}
        iconContainerStyle={styles.iconContainer}
        onPress={() => {
          Alert.alert(
            "Confirmation",
            "Are you sure you want to leave this challenge?",
            [
              {
                text: "No",
                onPress: () => {},
                style: "cancel"
              },
              {
                text: "Yes",
                onPress: async () => {
                  delete user.challenges[id];
                  await putUser(user);
                  setUser({...user});
                },
              }
            ]
          );
        }}
        title="Leave Challenge..."
        containerStyle={styles.container}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  leave: {
    flex: -1,
    justifyContent: "flex-end"
  },
  iconContainer: {
    paddingRight: 5
  },
  container: {
    margin: 20
  },
  button: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});
