import React, { useState, useEffect } from "react";
import { View, Text, SectionList } from "react-native";
import FeedListItem from "../components/FeedListItem";
import FadeOverlay from "./FadeOverlay";
import { Divider } from "react-native-elements";
import useGetData from "../hooks/useGetData";
import ChallengeContext from "../contexts/Challenge";
import UserContext from "../contexts/User";

export default function FeedList() {
  const feed = useGetData('feed', {});
  const users = useGetData('users', {});
  const challenges = useGetData('challenges');

  const [sectionedFeed, setSectionedFeed] = useState([]);

  useEffect(() => {
    setSectionedFeed([
      {
        title: "New Updates",
        data: Object.values(feed).filter((item) => item.new),
      },
      {
        title: "Recent Updates",
        data: Object.values(feed).filter((item) => !item.new),
      },
    ]);
  }, [feed, users]);

  if (!Object.keys(users).length ||
      !Object.keys(feed).length ||
      !challenges)
    return <View><Text>Loading...</Text></View>;

  return (
    <FadeOverlay>
      <SectionList
        sections={sectionedFeed}
        stickySectionHeadersEnabled={false}
        renderItem={({ item, index, section }) => {
          const user = users[item.userId];

          return (
            <ChallengeContext.Provider value={challenges[item.challengeId]}>
              <UserContext.Provider value={user}>
                <FeedListItem
                  id={user.id}
                  name={user.name}
                  handle={user.handle}
                  content={item.content}
                  avatarUrl={user.avatarUrl}
                  bottomDivider={index !== section.data.length - 1}
                />
              </UserContext.Provider>
            </ChallengeContext.Provider>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ flex: -1 }}>
            <View
              style={{
                flex: -1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Divider style={{ flexGrow: 1, marginHorizontal: 5 }} />
              <Text style={{ color: "#c1c8ce" }}>{title}</Text>
              <Divider style={{ flexGrow: 1, marginHorizontal: 5 }} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    </FadeOverlay>
  );
}
