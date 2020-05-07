import React from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loading() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator style={{padding:20}} size="large"/>
    </View>
  );
}
