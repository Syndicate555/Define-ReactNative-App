import React, { useContext, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import ChallengeDetailsJoinButton from "../components/ChallengeDetailsJoinButton";
import LoggedInUserContext from "../contexts/LoggedInUser";
import ChallengeDetailsLeaveButton from "../components/ChallengeDetailsLeaveButton";
import ChallengeContext from "../contexts/Challenge";
import ChallengeDetailsTaskList from "../components/ChallengeDetailsTaskList";
import ChallengeRankings from "../components/ChallengeRankings";
import ChallengeDetailsTaskListHeader
  from "../components/ChallengeDetailsTaskListHeader";
import IconChat from "../components/IconChat";

export default function ChallengeDetails({ navigation, route }) {
  let challenge;
  const {
    id: challengeId,
    name,
    endDate,
  } = (challenge = route.params);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name, headerRight: () => <IconChat />});
  }, [navigation, route]);

  const { user: { challenges: userChallenges } } = useContext(LoggedInUserContext);
  const isActiveChallenge = userChallenges[challengeId];
  const isCurrentChallenge = Date.now() < endDate;

  const [shareBoxVisibility, setShareBoxVisibility] = useState(false);

  return (
    <ChallengeContext.Provider value={{ ...challenge }}>
      <ChallengeDetailsTaskList
        ListHeaderComponent={
          <ChallengeDetailsTaskListHeader
            isOverlayVisible={shareBoxVisibility}
            setIsOverlayVisible={setShareBoxVisibility}
          />
        }
        ListFooterComponent={
          isCurrentChallenge ? isActiveChallenge ?
            <ChallengeDetailsLeaveButton /> :
            <>
              <ChallengeDetailsJoinButton
                onPress={() => setShareBoxVisibility(true)}
              />
              <View>
                <Text>Join the challenge to view the tasks!</Text>
              </View>
            </>
          : <ChallengeRankings />
        }
        />
    </ChallengeContext.Provider>
  );
}
