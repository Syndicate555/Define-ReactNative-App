import React, {useContext} from "react";
import {View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import LoggedInUserContext from "../contexts/LoggedInUser";
import ChallengeContext from "../contexts/Challenge";
import usePutData from "../hooks/usePutData";

export default function ChallengeDetailsJoinButton() {
  const { user, setUser } = useContext(LoggedInUserContext);
  const { id } = useContext(ChallengeContext);
  const putUser = usePutData(`users/${user.id}`);

  return (
    <View style={styles.join}>
      <Button
        icon={{
          name: 'login',
          type: 'simple-line-icon',
          color: 'white'
        }}
        iconContainerStyle={styles.iconContainer}
        onPress={async () => {
          user.challenges[id] = {tasksDone: 0};
          await putUser(user);
          setUser({...user});
          onPress();
        }}
        title="Join Challenge!"
        containerStyle={styles.container}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  join: {
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
    justifyContent: 'center'
  }
});
