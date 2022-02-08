import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Signout from '../signout'

const Account = () => {

   return (<View style={styles.accountContainer}><Text>This is my account
   </Text><Signout /></View>)

}

const styles = StyleSheet.create({
   accountContainer: {
     marginHorizontal: 15, 
     marginTop: 60,
     marginBottom: 40,
   },
});

Account.navigationOptions = {
   headerTitle: 'Account',
   headerStyle: {
       backgroundColor: 'purple'
   },
   headerTintColor: 'white'
}

export default Account;