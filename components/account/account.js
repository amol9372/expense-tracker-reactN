import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, AppRegistry } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Utils from "../../src/utils";
import Signout from '../signout'
import KeyValueField from "../UI/keyValue";
import { Avatar } from 'react-native-elements';
import constants from "../../src/constants";

const accountAttributes = {
   name: '',
   email: '',
   contact: '',
   limit: 0.0,
   currency: '',
   avatar: null
}

const Account = () => {

   const defaultAvatar = require('../../assets/appicons/superhero-icons/spiderman.png');
   const [details, setDetails] = useState(accountAttributes);

   useEffect(() => {
      console.log('[Setting user details]');
      getUserDetails();
   }, []);

   const getUserDetails = async () => {
      Utils.getData('@loggedInUser').then(user => {
         const userObject = JSON.parse(user);
         console.log(userObject);
         let avatar;
         if(userObject.avatar){
            avatar = constants.avatars[userObject.avatar];
         } else {
            avatar = defaultAvatar;
         }
         
         setDetails(() => ({
            name: userObject.name,
            email: userObject.email,
            contact: userObject.phoneNo,
            limit: 'Not Set',
            currency: 'INR',
            avatar: avatar 
         }))
      });
   }

   return (
      <View style={styles.accountContainer}>
         
         { details.avatar && <View style={styles.avatar}>
            <Avatar size={70} source={details.avatar} rounded key={1} containerStyle={{
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 1,
            }}>
               {/* <Avatar.Accessory size={22} onPress={() => console.log('edit')}/> */}
            </Avatar>
            <Text style={styles.name}>{details.name}</Text>
         </View> }
         
         <KeyValueField label='Email' value={details.email} />
            <Divider />
         <KeyValueField label='Contact' value={details.contact} />
            <Divider  />
         <KeyValueField label='Currency' value={details.currency} />
            <Divider  />
         <KeyValueField label='Monthly Limit' value={details.limit} />

         <View style={styles.singout}>
            <Signout />
         </View>
         
      </View>
   )

}

const styles = StyleSheet.create({
   accountContainer: {
      flex: 1,
      marginLeft: 24,
      marginRight: 20,
      marginTop: 30,
      marginBottom: 40,
   },
   singout: {
      marginTop: 60,      
   },
   avatar: {
      marginBottom : 30,
      flexDirection: "row", 
   },
   name: {

      fontSize: 23,
      marginTop: 3,
      marginLeft: 23
   }

});

Account.navigationOptions = {
   headerTitle: 'Account',
   headerStyle: {
      backgroundColor: 'purple'
   },
   headerTintColor: 'white'
}

export default Account;