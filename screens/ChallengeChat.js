import React, {useEffect, useRef, useState} from 'react';
import {FlatList, KeyboardAvoidingView, View} from "react-native";
import {Input, ListItem} from "react-native-elements";
import useLazyGetData from "../hooks/useLazyGetData";
import Loading from "../components/Loading";

// no time to implement :(
const origChat = [
  {
    id: 3,
    content: "Hi! Who else is a huge fan of the environment?"
  },
  {
    id: 1,
    content: "I've been advocating for our planet for 5 years now! If I'm" +
      " not a huge fan of our planet, I don't know who is!"
  },
  {
    id: 2,
    content: "Yeah, I think Earth Day should be celebrated way more often. I" +
      " feel like people in our generation don't really appreciate its" +
      " beauty and the fact that it's the only planet we have."
  }
];

export default function ChallengeChat() {
  const [chat, setChat] = useState(null);
  const userCache = useRef({});
  const getUser = useLazyGetData('users');

  useEffect(() => {
    (async() => {
      for (const {id} of origChat) {
        userCache.current[id] = await getUser(`/${id}`);
      }
      setChat(origChat);
    })();
  }, []);

  if (!chat) return <Loading />;

  return (
      <View style={{flex: 1}}>
      <FlatList
        data={chat}
        renderItem={({ item: { id, content } }) => {
          const user = userCache.current[id];
          return <ListItem
            title={user.name}
            subtitle={content}
            leftAvatar={{source: {uri: user.avatarUrl}}}
            onPress={() => navigation.navigate('UsersScreen', {screen: 'UsersProfile', params: {id}})}
          />
        }}
      />
        <Input
          inputContainerStyle={{
            flex: -1,
            marginTop: 'auto',
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 5,
            marginBottom: 10
          }}
          placeholder='Share your thoughts with the world!...'
        />
    </View>
  );
}
