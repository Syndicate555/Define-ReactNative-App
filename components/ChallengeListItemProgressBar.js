import React, {useContext} from "react";
import * as Progress from 'react-native-progress';
import { View } from 'react-native';
import ChallengeContext from "../contexts/Challenge";
import { Icon } from 'react-native-elements';

export default function ChallengeListItemProgressBar() {
  const context = useContext(ChallengeContext);

  const {startDate, endDate} = context;

  const percentage = Math.min(1, (Date.now() - startDate) / (endDate - startDate));

  return (
    <View style={{flex: -1, flexDirection: 'row'}}>
      <Icon
        name="stopwatch"
        type="entypo"
        size={15}
        containerStyle={{marginRight: 5}}
      />
      <Progress.Bar
        progress={percentage}
        width={null}
        height={15}
        style={{flexGrow: 1}}
      />
    </View>
  );
}
