import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const Signout = () => {
  const [isSignedIn, signedIn] = useState(true);

  async function signOut() {
    try {
      signedIn(true);
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <View>
      {isSignedIn ? (
        <Button onPress={signOut} title="Signout" />
      ) : (
        <Text>Welcome User</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    borderRadius: 3,
    borderBottomColor: "green",
  },
});

export default Signout;
