import React from "react";
import {View, StyleSheet } from "react-native";
import {Surface} from 'react-native-paper';
import {Avatar, ListItem} from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import ChallengeContext from "../contexts/Challenge";
import ChallengeListItemProgressCircle from "./ChallengeListItemProgressCircle";
import {useNavigation} from "@react-navigation/native"
import ChallengeListItemContent from "./ChallengeListItemContent";
import useGetData from "../hooks/useGetData";
import Loading from "./Loading";
import useLazyGetData from "../hooks/useLazyGetData";

/*
  Props:
  id,
  name,
  description,
  startDate,
  showStartDate,
  endDate,
  showEndDate,
  tags,
  showTags,
  logoUrl,
  type,
  showProgressBar,
  showProgressCircle
*/

export default function ChallengeListItem({id, ...props}) {
  const challengeObj = useGetData(`challenges/${id}`);
  const navigation = useNavigation();

  if (!challengeObj) return <Loading />;

  const challenge = {
    showEndDate: true,
    showStartDate: true,
    showTags: true,
    ...challengeObj,
    ...props
  };

  return (
    <ChallengeContext.Provider value={{
      ...challenge,
    }}>
      <Surface style={styles.surface}>
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          title={challenge.name}
          titleStyle={{fontWeight: 'bold'}}
          containerStyle={styles.container}
          leftElement={
            challenge.showProgressCircle ?
              <ChallengeListItemProgressCircle /> :
              <View style={{height: '100%'}}>
                <Avatar
                  source={challenge.logoUrl && {uri: challenge.logoUrl}}
                  title={challenge.name[0]}
                  overlayContainerStyle={{backgroundColor: 'white'}}
                  rounded
                />
              </View>
          }
          subtitle={<ChallengeListItemContent />}
          onPress={() => navigation.push("ChallengeDetails", challenge)}
        />
      </Surface>
    </ChallengeContext.Provider>
  );
}


const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10
  },
  container: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
  chip: {
    marginRight: 5,
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  chipContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
