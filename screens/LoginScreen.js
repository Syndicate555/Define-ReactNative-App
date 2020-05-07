import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";

export default function LoginScreen({onLogin}) {
  return (
    <View style={styles.container}>
      <View>
        <Card title="Login">
          <View style={styles.textfields}>
            <TextInput
              label="Email"
              autoCapitalize="none"
              mode="outlined"
              style={styles.textbox}
            />
            <TextInput
              label="Password"
              autoCapitalize="none"
              secureTextEntry
              mode="outlined"
              style={styles.textbox}
            />
          </View>
          <Button title="Log in" onPress={onLogin} />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textfields: {
    marginTop: 5,
    marginBottom: 20
  },
  textbox: {
    width: 200,
    height: 50,
  },
});
