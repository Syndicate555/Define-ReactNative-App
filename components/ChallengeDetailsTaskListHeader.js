import React, {useContext, useLayoutEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput} from "react-native";
import ChallengeContext from "../contexts/Challenge";
import useGetData from "../hooks/useGetData";
import Loading from "./Loading";
import {Avatar, Button, Overlay} from "react-native-elements";
import {Chip} from "react-native-paper";
import dateFormat from "dateformat";
import LoggedInUserContext from "../contexts/LoggedInUser";
import {useNavigation} from "@react-navigation/core";

export default function ChallengeDetailsTaskListHeader({setIsOverlayVisible, isOverlayVisible, ...props}) {
  const {
    id: challengeId,
    name,
    description,
    startDate,
    endDate,
    tags,
    logoUrl,
  } = useContext(ChallengeContext);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [navigation]);

  const { user: { challenges: userChallenges } } = useContext(LoggedInUserContext);

  const [shareBoxValue, setShareBoxValue] = useState(
    `I have just signed up for the ${name} challenge!`
  );
  const challenges = useGetData(`challenges/${challengeId}`);

  if (!challenges) return <Loading />;

  const tasks = challenges.tasks;
  const completedTasks = userChallenges[challengeId]?.checkedTasks;

  if (tasks && completedTasks) {
    if (Object.entries(tasks).length ===
      Object.entries(completedTasks).length) {
      alert("All tasks have been completed!");
    }
  }

  return (
    <View style={styles.container}>
      <Overlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => setIsOverlayVisible(false)}
      >
        <View style={{flex: 1}}>
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Share?</Text>
            <TextInput
              placeholder="Say something!"
              onChangeText={(text) => setShareBoxValue(text)}
              value={shareBoxValue}
              style={{
                marginTop:20,
                marginBottom:20,
                padding: 20,
                flex: 1,
                borderWidth: 1,
                borderColor: 'black'
              }}
              multiline
              scrollEnabled
            />
          </View>
          <View style={{ flex: -1, justifyContent: "flex-end" }}>
            <Button
              title="Post"
              onPress={() => {
                console.log('hi)');
                setIsOverlayVisible(false);
              }} />
          </View>
        </View>
      </Overlay>
      <View style={styles.header}>
        <View style={styles.banner}>
          <Avatar
            size={80}
            source={{ uri: logoUrl }}
            overlayContainerStyle={{ backgroundColor: "white" }}
            containerStyle={styles.logo}
            rounded={true}
          />
          <View style={styles.primaryInfo}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>{name}</Text>
            <View style={styles.dateContainer}>
              <View style={styles.textContainer}>
                <Text style={{ fontWeight: "bold" }}>Starts: </Text>
                <Text>
                  {dateFormat(
                    new Date(startDate),
                    "mmmm dS, yyyy, h:MM" + " TT"
                  )}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontWeight: "bold" }}>Ends: </Text>
                <Text>
                  {dateFormat(
                    new Date(endDate),
                    "mmmm dS, yyyy, h:MM" + " TT"
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondaryInfo}>
          <Text>{description}</Text>
          <View style={styles.chipContainer}>
            {tags.map((tag, index) => (
              <Chip key={index} style={styles.chip} mode="outlined">
                {tag}
              </Chip>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: -1,
    flexDirection: "column",
    marginBottom: 20,
  },
  banner: {
    flex: -1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryInfo: {},
  logo: {
    marginRight: 20,
  },
  secondaryInfo: {
    alignItems: "center",
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
    marginVertical: 5,
  },
  chip: {
    marginRight: 5,
    marginTop: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  chipContainer: {
    flex: -1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
