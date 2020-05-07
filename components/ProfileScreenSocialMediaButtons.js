import React, { useContext } from "react";
import { View, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";
import UserContext from "../contexts/User";
import TouchableScale from "react-native-touchable-scale";

export default function ProfileScreenSocialMediaButtons() {
  const { user } = useContext(UserContext);

  return (
    <View
      style={{
        flex: -1,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20,
      }}
    >
      {user.socialMedia.map(({type, url}, index) => {
        return (
          <SocialIcon
            type={type}
            Component={TouchableScale}
            onPress={async () => {await Linking.openURL(url)}}
            key={index}
          />
        );
      })}
    </View>
  );
}
