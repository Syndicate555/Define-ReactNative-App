import React, {useContext} from "react";
import {Avatar, ListItem} from 'react-native-elements';
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native"
import useGetData from "../hooks/useGetData";
import ChallengeContext from "../contexts/Challenge";

export default function FeedListItem({ id, avatarUrl, name, handle, content, ...props }) {
  const challenge = useContext(ChallengeContext);
  const navigation = useNavigation();

  return (
    <ListItem
      leftElement={
        <View style={{height: '100%'}}>
          <Avatar
            source={avatarUrl && {uri: avatarUrl}}
            title={name[0]}
            onPress={() => navigation.navigate('UsersScreen', {screen: 'UsersProfile', params: {id}})}
            rounded
          />
        </View>
      }
      contentContainerStyle={{height: '100%', flex: -1, justifyContent: 'flex-start'}}
      title={
        <View>
          <Text style={{fontWeight: 'bold'}}>{name}</Text>
          <Text style={{color: 'gray'}}>{`@${handle}`}</Text>
        </View>
      }
      subtitle={content}
      subtitleStyle={{paddingVertical: 10, paddingRight: 10}}
      containerStyle={{flex: -1}}
      onPress={() => navigation.push("ChallengeDetails", challenge)}
      {...props}
    />
  );
}
