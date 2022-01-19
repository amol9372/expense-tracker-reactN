import React from "react";
import { Button, Linking, Platform, Text, View } from "react-native";
import Amplify, { Auth, Hub } from "aws-amplify";
import { withOAuth } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import * as WebBrowser from "expo-web-browser";

Amplify.configure(awsconfig);

function App(props) {
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    amazonSignIn,
    customProviderSignIn,
    signOut,
  } = props;

  async function urlOpener(url, redirectUrl) {
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl
    );

    console.log(type);

    // if (type === "success" && Platform.OS === "android") {
    console.log("something in android");
    //WebBrowser.dismissAuthSession();
    return Linking.openURL(redirectUrl);
    // }
  }

  Amplify.configure({
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      urlOpener,
    },
  });

  return (
    <View>
      <Text>
        User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : "None"}
      </Text>
      {oAuthUser ? (
        <Button title="Sign Out" onPress={signOut} />
      ) : (
        <>
          {/* Go to the Cognito Hosted UI */}
          <Button title="Cognito" onPress={hostedUISignIn} />

          {/* Go directly to a configured identity provider */}
          {/* <Button title="Google" onPress={googleSignIn} /> */}

          <Button title="Sign Out" onPress={signOut} />

          {/* e.g. for OIDC providers */}
        </>
      )}
    </View>
  );
}

export default App;
//export default withOAuth(App);
