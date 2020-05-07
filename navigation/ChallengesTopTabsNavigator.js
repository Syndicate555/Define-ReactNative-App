import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChallengesActive from "../screens/ChallengesActive";
import ChallengesPast from "../screens/ChallengesPast";
import ChallengesSearch from "../screens/ChallengesSearch";
import ChallengeDetails from "../screens/ChallengeDetails";
import { createStackNavigator } from "@react-navigation/stack";
import IconMenu from "../components/IconMenu";
import ChallengeSubmitProof from "../screens/ChallengeSubmitProof";
import ChallengeChat from "../screens/ChallengeChat";

const Tab = createMaterialTopTabNavigator();

function TopTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ChallengesPast"
        component={ChallengesPast}
        options={{
          title: "Past",
        }}
      />
      <Tab.Screen
        name="ChallengesActive"
        component={ChallengesActive}
        options={{
          title: "Active",
        }}
      />
      <Tab.Screen
        name="ChallengesSearch"
        component={ChallengesSearch}
        options={{
          title: "Search",
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function ChallengesTopTabsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="Challenges"
        component={TopTabsNavigator}
        options={{
          headerLeft: () => <IconMenu />,
        }}
      />
      <Stack.Screen
        name="ChallengeDetails"
        component={ChallengeDetails}
        options={{
          title: "Challenge Details",
        }}
      />
      <Stack.Screen
        name="ChallengeChat"
        component={ChallengeChat}
        options={{
          title: "Chat"
        }}
      />
      <Stack.Screen
        name="ChallengeDetailsTaskSubmitProof"
        component={ChallengeSubmitProof}
      />
    </Stack.Navigator>
  );
}
