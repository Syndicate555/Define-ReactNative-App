import React from 'react';
import { FlatList } from 'react-native';
import ChallengeListItem from "../components/ChallengeListItem";
import FadeOverlay from "../components/FadeOverlay";
import useGetData from "../hooks/useGetData";

export default function ChallengesPast() {
  const challenges = useGetData('challenges', []);

  return (
    <FadeOverlay style={{flex: 1}}>
      <FlatList
        data={challenges}
        renderItem={({item}) => {
          if (item.endDate < new Date()) {
            return (
              <ChallengeListItem id={item.id} />
            );
          } else {
            return null;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        />
    </FadeOverlay>
  );
}
