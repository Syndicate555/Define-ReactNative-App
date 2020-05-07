import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import LoggedInUserContext from "../contexts/LoggedInUser";
import UserContext from "../contexts/User";
import usePatchData from "../hooks/usePatchData";

export default function ProfileScreenFollowButton() {
  const { user: loggedInUser, setUser: setLoggedInUser } = useContext(
    LoggedInUserContext
  );
  const { user, setUser } = useContext(UserContext);
  const patchLoggedInUser = usePatchData(`users/${loggedInUser.id}`);
  const patchUser = usePatchData(`users/${user.id}`);

  return (
    <View style={{ padding: 30 }}>
      {!loggedInUser.following.includes(user.id) ? (
        <Button
          title="Follow"
          onPress={async () => {
            const following = loggedInUser.following.concat(user.id);
            await patchLoggedInUser({ following });
            setLoggedInUser({ ...loggedInUser, following });

            const followers = user.followers;
            followers.push(user.id);
            await patchUser({ followers });
            setUser({...user, followers});
          }}
        />
      ) : (
        <Button
          title="Unfollow"
          type="outline"
          onPress={async () => {
            const following = loggedInUser.following.slice(
              0,
              loggedInUser.following.length
            );
            const targetIndex = following.indexOf(user.id);
            following.splice(targetIndex, 1);
            await patchUser({ following: following });
            setLoggedInUser({ ...loggedInUser, following });
          }}
        />
      )}
    </View>
  );
}
