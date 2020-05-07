import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import UserContext from "../contexts/User";
import ChallengeListItem from "../components/ChallengeListItem";
import useLazyGetData from "../hooks/useLazyGetData";

export default function ProfileScreenActiveChallengesList(props) {
  const [userChallenges, setUserChallenges] = useState([]);
  const { user: { challenges } } = useContext(UserContext);
  const getChallenge = useLazyGetData('challenges');

  useEffect(() => {
    (async () => {
      let arr = [];
      for (let [key, value] of Object.entries(challenges)) {
        const challenge = await getChallenge(`/${key}`);
        arr.push({...challenge, tasksDone: value.tasksDone});
      }
      setUserChallenges(arr);
    })();
  }, []);

  return (
    <FlatList
      {...props}
      style={styles.profileSummary}
      ListFooterComponent={<View style={{ marginBottom: 20 }} />}
      data={userChallenges}
      renderItem={({ item }) => {
        return <ChallengeListItem {...item} showStartDate={false} />
      }}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  profileSummary: {
    flex: 1,
    backgroundColor: "white",
  }
});
