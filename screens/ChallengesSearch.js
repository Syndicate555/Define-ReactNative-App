import React, { useState } from "react";
import { FlatList, StyleSheet, View, Platform } from "react-native";
import { SearchBar } from "react-native-elements";
import ChallengeListItem from "../components/ChallengeListItem";
import FadeOverlay from "../components/FadeOverlay";
import useGetData from "../hooks/useGetData";
import Loading from "../components/Loading";

export default function ChallengesSearch() {
  const [search, setSearch] = useState("");
  const challenges = useGetData("challenges");

  if (!challenges) return <Loading />;

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for challenges..."
        onChangeText={setSearch}
        inputContainerStyle={{ backgroundColor: "white" }}
        value={search}
        platform={Platform.OS === "ios" ? "ios" : "android"}
      />
      <FadeOverlay>
        {challenges ? (
          <FlatList
            data={challenges}
            renderItem={({ item }) => {
              const searchString = item.name + item.description + item.type;
              if (
                searchString.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                !search
              ) {
                return <ChallengeListItem id={item.id} />;
              } else {
                return null;
              }
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Loading />
        )}
      </FadeOverlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
