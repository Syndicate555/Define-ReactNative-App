import React, {useContext} from "react";
import LoggedInUserContext from "../contexts/LoggedInUser";
import ChallengeContext from "../contexts/Challenge";
import ProgressCircle from 'react-native-progress-circle';
import {Text, View} from "react-native";

export default function ChallengeListItemProgressCircle() {
  const { totalTasks, id: challengeId } = useContext(ChallengeContext);
  console.log(challengeId);
  const { user: { challenges: { [challengeId]: { tasksDone } } } } =
    useContext(LoggedInUserContext);

  return (
    <ProgressCircle
      radius={50}
      borderWidth={5}
      percent={tasksDone / totalTasks * 100}
    >
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>{tasksDone} / {totalTasks}</Text>
        <Text>Tasks</Text>
      </View>
    </ProgressCircle>
  );
}
