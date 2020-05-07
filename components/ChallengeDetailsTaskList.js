import React, {useContext} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import UserContext from "../contexts/User";
import ChallengeContext from "../contexts/Challenge";
import ChallengeDetailsTaskListItem from "./ChallengeDetailsTaskListItem";
import useGetData from "../hooks/useGetData";
import Loading from "./Loading";

export default function ChallengeDetailsTaskList(props) {
  const { id: challengeId } = useContext(ChallengeContext);
  const challenges = useGetData(`challenges/${challengeId}`);
  const { user: { challenges: userChallenges } } = useContext(UserContext);

  if (!challenges) return <Loading />;

  const tasks = challenges.tasks;
  const completedTasks = userChallenges[challengeId]?.checkedTasks || [];

  if (tasks && completedTasks) {
    if (
      Object.entries(tasks).length === Object.entries(completedTasks).length
    ) {
      alert("All tasks have been completed!");
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        {...props}
        data={tasks}
        renderItem={({ item, index }) => (
          <ChallengeDetailsTaskListItem item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  }
});
