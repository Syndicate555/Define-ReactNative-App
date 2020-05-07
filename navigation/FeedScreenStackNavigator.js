import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedHome from "../screens/FeedHome";
import IconMenu from "../components/IconMenu";
import ChallengeDetails from '../screens/ChallengeDetails';

const Stack = createStackNavigator();

export default function FeedScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
    >
      <Stack.Screen
        name="Feed"
        component={FeedHome}
        options={{
          headerLeft: () => <IconMenu />,
          headerStyle: {
            shadowColor: 'transparent',
          }
        }}
      />
      <Stack.Screen
        name="ChallengeDetails"
        component={ChallengeDetails}
        options={{
          title: "Challenge Details",
        }}
      />
    </Stack.Navigator>
  );
}
