import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UsersScreen from "../screens/UsersSearch";
import IconMenu from "../components/IconMenu";
import UserContext from "../contexts/User";
import ProfileScreen from "../screens/ProfileScreen";
import useLazyGetData from "../hooks/useLazyGetData";
import LoggedInUserContext from "../contexts/LoggedInUser";
import Loading from "../components/Loading";
import IconBack from "../components/IconBack";

const Stack = createStackNavigator();

function UserProfileScreenWrapper({ navigation, route }) {
  const getData = useLazyGetData(`users/${route.params.id}`);
  const { user: loggedInUser } = useContext(LoggedInUserContext);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: '' });
    if (!user) return;
    navigation.setOptions({ headerTitle: user.name });
  }, [navigation, route, user]);

  useEffect(() => {
    (async() => {
      if (route.params.id === loggedInUser.id)
        setUser(loggedInUser);
      else
        setUser(await getData());
    })();
  }, [route.params.id]);

  if (!user) return <Loading />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProfileScreen />
    </UserContext.Provider>
  );
}

export default function UsersSearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Users"
    >
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{
          headerLeft: () => <IconMenu />,
        }}
      />
      <Stack.Screen
        name="UsersProfile"
        component={UserProfileScreenWrapper}
        options={{
          headerLeft: () => <IconBack />
        }}
      />
    </Stack.Navigator>
  );
}
