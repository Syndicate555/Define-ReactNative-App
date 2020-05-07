import React from "react";
import { Icon } from 'react-native-elements';
import {navigationRef} from '../navigation/RootNavigation';
import { DrawerActions } from '@react-navigation/native';

export default function IconBack() {
  return (
    <Icon
      name="chevron-left"
      type="entypo"
      size={30}
      containerStyle={{marginLeft: 10}}
      onPress={() => {
        navigationRef.current.goBack();
      }}
    />
  );
}
