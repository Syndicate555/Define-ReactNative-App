import React, {useContext} from 'react';
import { FlatList } from 'react-native';
import ChallengeListItem from "../components/ChallengeListItem";
import LoggedInUserContext from "../contexts/LoggedInUser";
import FadeOverlay from "../components/FadeOverlay";
import useGetData from "../hooks/useGetData";
import Loading from "../components/Loading";

export default function ChallengesActive() {
  const { user: { challenges } } = useContext(LoggedInUserContext);

  return (
    <FadeOverlay style={{flex: 1}}>
      <FlatList
        data={Object.entries(challenges)}
        renderItem={({item: [id]}) => {
          return <ChallengeListItem
            id={id}
            showTags={false}
            showProgressBar={true}
            showProgressCircle={true}
          />
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </FadeOverlay>
  );
}
