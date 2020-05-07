import React, {useEffect, useRef, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import { ListItem } from "react-native-elements";
import useLazyGetData from "../hooks/useLazyGetData";
import Loading from "./Loading";

const userRanking = [
  { id: 0, tasks: 9 },
  { id: 2, tasks: 9 },
  { id: 3, tasks: 9 },
  { id: 1, tasks: 8 }
];
const rankingColors = ['gold', 'gray', 'brown'];

export default function ChallengeRankings(props) {
  const getUser = useLazyGetData('users');
  const [ranking, setRanking] = useState([]);
  const userCache = useRef({});

  useEffect(() => {
    (async() => {
      for (const {id} of userRanking) {
        if (!userCache.current[id]) {
          userCache.current[id] = await getUser(`/${id}`);
        }
      }
      setRanking(userRanking);
    })();
  }, []);

  if (!userRanking) return <Loading />;

  return (
    <View style={styles.ranking}>
      <View style={styles.rankingTitle}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Challenge is OVER!
        </Text>
      </View>
      <FlatList
        {...props}
        data={ranking}
        renderItem={({ item, index }) => {
          const user = userCache.current[item.id];

          return <ListItem
            title={user.name}
            subtitle={`@${user.handle}`}
            leftAvatar={{
              rounded: true,
              source: { uri: user.avatarUrl },
              containerStyle: {
                borderColor: rankingColors[index],
                borderWidth: rankingColors[index] && 3
              },
            }}
            rightElement={
              <>
                <Text style={{ fontWeight: "bold" }}>{item.tasks}</Text>
                <Text> tasks completed</Text>
              </>
            }
            bottomDivider
          />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  basicInfo: {
    alignItems: "center",
    padding: 20,
  },
  tasks: {
    flex: 1,
  },
  textContainer: {
    flex: -1,
    flexDirection: "row",
  },
  dateContainer: {
    flex: -1,
    margin: 5,
  },
  overlayStyle: {
    margin: 10,
  },
  ranking: {},
  rankingTitle: {
    alignItems: "center",
  },
});

