import React from "react";
import { Icon } from 'react-native-elements';
import {navigationRef} from '../navigation/RootNavigation';
import { DrawerActions } from '@react-navigation/native';

export default function IconMenu() {
  return (
    <Icon
      name="chat"
      type="entypo"
      size={30}
      containerStyle={{marginRight: 10}}
      onPress={() => {
        navigationRef.current.navigate("ChallengeChat");
      }}
    />
  );
}
