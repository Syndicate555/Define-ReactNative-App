import React from "react";
import { View, StyleSheet } from "react-native";
import FeedList from "../components/FeedList";

export default function FeedHome() {
  return (
    <View style={styles.container}>
      <FeedList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
