import React, { useState } from "react";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import Utils from "./src/utils";
import ExpenseNavigator from './navigation/stacknavigation'
import UserService from './src/services/userService'

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      console.log('[Saving loggedIn user to Async storage]')
      const user = await Utils.getLoggedInUser();

      const userId = `user_${user.sub}`;
      await UserService.getUserDetails(userId).then(res => {
        //console.log('[User details] :::', res.data);
        setUser(res.data);
        Utils.storeData('@loggedInUser', JSON.stringify(res.data));

        setUser(user);
      });
      // save in async storage
      //Utils.storeData('@loggedInUser', JSON.stringify(user));
    }

    init();

  }, [])

  return (
    (user && <ExpenseNavigator />)
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
