import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Avatar} from "react-native-elements";
import UserContext from "../contexts/User";

export default function ProfileScreenUserInformation() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.profileBasicsContainer}>
      <View style={styles.profileBasics}>
        <View>
          <Avatar rounded source={{ uri: user.avatarUrl }} size={125} />
        </View>
        <View style={styles.profileText}>
          <Text style={{ fontWeight: "bold", fontSize: 35 }}>{user.name}</Text>
          <Text style={{ fontSize: 15 }}>@{user.handle}</Text>
          <View style={styles.followerText}>
            <View style={styles.followColumn}>
              <Text style={styles.followCount}>{user.followers.length}</Text>
              <Text>Followers</Text>
            </View>
            <View style={styles.followColumn}>
              <Text style={styles.followCount}>{user.following.length}</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.profileMisc}>
        <Text style={{ fontWeight: "bold" }}>Description</Text>
        <Text>{user.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSummary: {
    flex: 1,
    backgroundColor: "white",
  },
  profileBasicsContainer: {
    marginTop: 20,
  },
  profileBasics: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    margin: 10,
    alignItems: "center",
  },
  followerText: {
    flexDirection: "row",
  },
  followColumn: {
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  followCount: {
    fontWeight: "bold",
    fontSize: 20,
  },
  profileMisc: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
  },
});
