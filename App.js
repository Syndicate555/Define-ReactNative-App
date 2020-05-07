import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { View, Text, StatusBar, Platform } from "react-native";
import LoggedInUserContext from "./contexts/LoggedInUser";
import UserContext from "./contexts/User";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import useLazyGetData from "./hooks/useLazyGetData";
import Loading from "./components/Loading";
import LoginScreen from "./screens/LoginScreen";

const loggedInUserId = 0;

export default function App() {
  const getData = useLazyGetData(`users/${loggedInUserId}`);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  const [userLoggedIn, setUserLoggedIn] = useState({ loggedIn: false });

  useEffect(() => {
    (async () => {
      const user = await getData();
      setUser(user);
      setLoggedInUser(user);
    })();
  }, []);

  if (!user || !loggedInUser) {
    return <Loading />;
  }


  return (
    <NavigationContainer ref={navigationRef}>
      {Platform.OS === "ios" ? <StatusBar barStyle="dark-content" /> : null}
      <LoggedInUserContext.Provider
        value={{ user: loggedInUser, setUser: setLoggedInUser }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          <ActionSheetProvider>
            {userLoggedIn.loggedIn ? (
              <DrawerNavigator />
            ) : (
              <LoginScreen
                onLogin={() => setUserLoggedIn({ loggedIn: true })}
              />
            )}
          </ActionSheetProvider>
        </UserContext.Provider>
      </LoggedInUserContext.Provider>
    </NavigationContainer>
  );
}
