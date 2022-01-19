import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import Signout from "./components/signout";
import { View, StyleSheet } from "react-native";
import Expenses from "./components/expense-card/expenses";
import { useEffect } from "react";
import Utils from "./src/utils";
import ExpenseNavigator from './navigation/stacknavigation'

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const App = () => {


  useEffect(() => {
    const init = async () => {
      console.log('[Saving loggedIn user to Async storage]')
      const user = await Utils.getLoggedInUser();
      const userString = JSON.stringify(user);
      await Utils.storeData('@loggedInUser', userString);
    }

    init();

  }, [])

  return (
    // <View style={styles.container}>
    //   <View style={styles.signout}>
    //     <Signout />
    //   </View>
    //   <Expenses />
    // </View>
    <ExpenseNavigator />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey"
  },
  signout: {
    alignSelf: "flex-end",
    width: "30%",
    position: "relative",
  },
});

export default withAuthenticator(App);
