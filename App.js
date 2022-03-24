import React, { useState } from "react";
import { Amplify } from '@aws-amplify/core'
// import { Auth } from '@aws-amplify/auth'
// import { Analytics } from '@aws-amplify/analytics'
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import Utils from "./src/utils";
import ExpenseNavigator from './navigation/stacknavigation'
import UserService from './src/services/userService'
import { StatusBar } from "expo-status-bar";
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { addNotificationsDroppedListener } from "expo-notifications";
import { AmplifyTheme } from "aws-amplify-react-native";
import * as Linking from 'expo-linking'


Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    };
  }
})

const triggerHandler = async () => {
  Notification.scheduleNotificationAsync({
    content: {
      title: 'Local Notification',
      body: 'This is the first local notification'
    },
    trigger: {
      seconds: 10
    }
  })
}


const App = () => {

  const [user, setUser] = useState(null);
  const [deeplinkData, setDeepLinkData] = useState(null);

  const checkInvite = async (data) => {
    if (data && data.queryParams && Object.keys(data.queryParams).length > 0) {
      console.log('Data has params')

      confirmInvite(data.queryParams);  
    }
           
  }

  const confirmInvite = async (params) => {

    const user = await Utils.getLoggedInUser();
    const userId = `user_${user.sub}`;

    const request = {
      invitedBy: {
        userId: params.invitedBy,
        name: params.name,
        email: params.email
      },
      userId: userId
    }

    UserService.confirmInvite(request);
  }

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setDeepLinkData(() => data);
    // console.log('[Deeplink data]', data);
    checkInvite(data);

  }

  useEffect(() => {

    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        var data = Linking.parse(initialUrl);
        setDeepLinkData(() => data);
        checkInvite(data);
      }
    }

    Linking.addEventListener("url", handleDeepLink);

    if (!deeplinkData) {
      getInitialUrl();
    }

    return (() => {
      Linking.removeEventListener("url");
    })
  }, [])

  useEffect(() => {

    const init = async () => {
      console.log('[Saving loggedIn user to Async storage]')
      const user = await Utils.getLoggedInUser();
      const userId = `user_${user.sub}`;
      await UserService.getUserDetails(userId).then(res => {
        //setUser(res.data);
        Utils.storeData('@loggedInUser', JSON.stringify(res.data));

        setUser(user);
      });
    }

    init();

  }, [])

  // Get Permissions for notications
  // useEffect(() => {
  //   Permissions.getAsync(Permissions.NOTIFICATIONS).then(status => {
  //     if (status.status !== 'granted') {
  //       return Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     }
  //     return status;
  //   }).then(status => {
  //     if (status.status !== 'granted') {
  //       throw new Error('Permissions not granted');
  //     }
  //   }).then(() => {
  //     return Notification.getExpoPushTokenAsync();
  //   }).then((res) => {
  //     // TODO: save expo token
  //     console.log(res); 
  //   })
  //   .catch(err => {
  //     return null;
  //   });
  // }, [])


  // Receive notifications
  useEffect(() => {

    const bgNotification = Notification.addNotificationResponseReceivedListener(response => {
      console.log('Receive BG (app in background) notification');
      console.log(response);
    })

    const fgNotification = Notification.addNotificationReceivedListener(notification => {
      console.log('Receive FG (app open) notification');
      console.log(notification)
    });

    return () => {
      bgNotification.remove();
      fgNotification.remove();
    }
  }, [])

  return (
    user && <ExpenseNavigator />
    // <SafeAreaView>
    // <View styles={styles.container}>
    //   <Button title='Trigger' onPress={triggerHandler}/>
    //   <StatusBar style="auto" />
    // </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey",
    alignItems: "center"
  },
  signout: {
    alignSelf: "flex-end",
    width: "30%",
    position: "relative",
  },
});

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: 'purple',
    borderRadius: 10
  },
  container: {
    ...AmplifyTheme.container,
    paddingTop: 70,

  },
  input: {
    ...AmplifyTheme.input,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightblue',
  },
  buttonDisabled: {
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
  },
  sectionHeaderText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
}

export default withAuthenticator(App, {
  signUpConfig: {
    header: 'Register With Expense Tracker',
    //hiddenDefaults: ["username"],
    signUpFields: [
      {
        label: "Full Name",
        key: "name",
        required: true,
        type: "string",
        displayOrder: 1
      },
      {
        label: 'password',
        key: 'password',
        required: true,
        displayOrder: 3,
        type: 'password'
      },
    ]
  }, theme: customTheme
});
