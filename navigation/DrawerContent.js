import React, { useState, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoggedInUserContext from "../contexts/LoggedInUser";
import { Avatar, Icon } from "react-native-elements";
import { DrawerItem } from "@react-navigation/drawer";

export default function DrawerContent({ navigation }) {
  const {
    user: {
      name,
      handle,
      followers,
      following,
      avatarUrl
    }
  } = useContext(LoggedInUserContext);

  const [activeItem, setActiveItem] = useState("FeedScreen");
  function handlePageChange(pageName) {
    setActiveItem(pageName);
    navigation.navigate(pageName);
  }
  return (
    <SafeAreaView>
      <View style={styles.profile}>
        <View style={styles.profileSummary}>
          <View>
            <Avatar source={{ uri: avatarUrl }} size={75} rounded />
          </View>
          <View style={styles.profileText}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>{name}</Text>
            <Text>@{handle}</Text>
          </View>
        </View>
        <View style={styles.followerText}>
          <View style={styles.followColumn}>
            <Text style={styles.followCount}>{followers.length}</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.followColumn}>
            <Text style={styles.followCount}>{following.length}</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <View style={styles.drawerCategory}>
        <DrawerItem
          label="Feed"
          focused={activeItem === "FeedScreen"}
          onPress={() => handlePageChange("FeedScreen")}
          icon={({ color, size }) => (
            <Icon name="rss" type="entypo" color={color} size={size} />
          )}
        />
        <DrawerItem
          label="Profile"
          focused={activeItem === "ProfileScreen"}
          onPress={() => handlePageChange("ProfileScreen")}
          icon={({ color, size }) => (
            <Icon
              name="account"
              type="material-community"
              color={color}
              size={size}
            />
          )}
        />
        <DrawerItem
          label="Challenges"
          focused={activeItem === "ChallengesScreen"}
          onPress={() => handlePageChange("ChallengesScreen")}
          icon={({ color, size }) => (
            <Icon
              name="md-medal"
              type="ionicon"
              containerStyle={{marginLeft: 4}}
              color={color}
              size={size}
            />
          )}
        />
        <DrawerItem
          label="Users"
          focused={activeItem === "UsersScreen"}
          onPress={() => handlePageChange("UsersScreen")}
          icon={({ color, size }) => (
            <Icon
              name="users"
              type="font-awesome"
              containerStyle={{marginLeft: 4}}
              color={color}
              size={size}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerCategory: {
    marginTop: 10,
    marginBottom: 10,
  },
  profile: {
    alignItems: 'center'
  },
  profileSummary: {
    margin: 20,
    flexDirection: "row",
  },
  profileText: {
    margin: 10,
    justifyContent: "center",
  },
  followerText: {
    flexDirection: "row",
  },
  followColumn: {
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10
  },
  followCount: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
