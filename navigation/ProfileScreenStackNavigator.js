import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IconMenu from "../components/IconMenu";
import UserContext from "../contexts/User";
import ProfileScreen from "../screens/ProfileScreen";
import ChallengeDetails from "../screens/ChallengeDetails";
import ChallengeSubmitProof from "../screens/ChallengeSubmitProof";

const Stack = createStackNavigator();

function ProfileScreenWrapper() {
  const { user, setUser } = useContext(UserContext);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProfileScreen />
    </UserContext.Provider>
  );
}

export default function ProfileScreenStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerLeft: () => <IconMenu />,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
      <Stack.Screen
        name="ChallengeDetails"
        component={ChallengeDetails}
        options={{
          title: "Challenge Details",
        }}
      />
      <Stack.Screen
        name="ChallengeDetailsTaskSubmitProof"
        component={ChallengeSubmitProof}
      />
    </Stack.Navigator>
  );
}
