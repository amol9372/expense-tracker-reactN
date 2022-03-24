import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

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
    <View style={styles.button}>
      {isSignedIn ? (
        <Button onPress={signOut} title="Signout" buttonStyle={{
          backgroundColor: 'purple',
          borderRadius: 7,
        }} />
      ) : (
        <Text>Welcome User</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    borderRadius: 8,
  },
});

export default Signout;
