import React, {useContext} from "react";
import { Text, View, StyleSheet } from "react-native";
import {Chip} from 'react-native-paper';
import dateFormat from 'dateformat';
import ChallengeContext from "../contexts/Challenge";
import ChallengeListItemProgressBar from "./ChallengeListItemProgressBar";

export default function ChallengeListItemContent() {
  const {
    showStartDate,
    showEndDate,
    description,
    startDate,
    endDate,
    tags,
    showProgressBar,
    showTags
  } = useContext(ChallengeContext);

  const formattedStartDate = dateFormat(startDate, "mmmm dS, yyyy," +
    " h:MM TT");
  const formattedEndDate = dateFormat(endDate, "mmmm dS, yyyy, h:MM" +
    " TT");

  return (
    <View style={{flex: 1}}>
      {description ? <Text>{description}</Text> : null}
      {showStartDate || showEndDate ?
        <View style={{marginVertical: 5}}>
          {showStartDate ?
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Starts: </Text>
              <Text>{formattedStartDate}</Text>
            </View> : null
          }
          {showEndDate ?
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Ends: </Text>
              <Text>{formattedEndDate}</Text>
            </View> : null
          }
        </View> : null
      }
      {showTags ?
        <View style={styles.chipContainer}>
          {tags.map((tag, index) =>
            <Chip
              key={index}
              style={styles.chip}
              mode='outlined'
            >{tag}</Chip>)}
        </View> : null
      }
      {showProgressBar ? <ChallengeListItemProgressBar/> : null}
    </View>
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
  }
});
