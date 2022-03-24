import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert} from "react-native";
import { Button, Input } from "react-native-elements";
import UserService from "../../src/services/userService";
import Utils from "../../src/utils";

const Invite = (props) => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [user, setUser] = useState();

    
    useEffect(() => {
       setLoggedInUser();
    }, [])

    const setLoggedInUser = async () => {
        let user
        await Utils.getData('@loggedInUser').then(value => {
            user = JSON.parse(value);
            setUser(() => user);
        });
    } 


    const inviteUser = async () => {

        const isEmailValidated = await validateEmail();

        if (isEmailValidated) {
            console.log('[email validated] ::: ', email);
            const request = {
                name: name,
                email: email,
                invitedBy: {
                    userId : user.userId,
                    name: user.name,
                    email: user.email
                },
                inviteMessage: message ? message : 'Please accept my invite'
            }
            UserService.inviteUser(request).then(res => {

                props.navigation.navigate({ routeName: 'Buddies', params: { reload: true } });

            }).catch(err => console.log(err));
            
        }

    }

    const validateEmail = async () => {
        if (email && name) {
            if (email.trim().length === 0) {
                showError('Email address cannot be empty');
                return false;
            }

            if (email === user.email) {
                showError('Email cannot be same as current user\'s email');
                return false;
            }

            if (user.friends) {
                const friendsEmails = user.friends.map((friend) => friend.email);
                if (friendsEmails.includes(email)) {
                    showError('Email belongs to friend');
                    return false;
                }
            }

            return true;
        }
        
        showError('Email address & Name cannot be empty');
        return false;
    }

    // const showError = (mes) => {
    //     setError(true);
    //     setErrorMessage(mes);  
    // }

    const showError = (messages) => {
        Alert.alert(
            'Validation error',
            messages,
        );
    }

    return (

        <View style={styles.form}>
            <Input placeholder='Enter name to invite' onChangeText={(text) => setName(text)} value={name} containerStyle={styles.input} />
            <Input placeholder='Enter email to invite' onChangeText={(text) => setEmail(text)} value={email} containerStyle={styles.input} />
            <Input placeholder='Enter a message (optional)' onChangeText={(text) => setMessage(text)} value={message} />

            <Button
                title={'Invite User'}
                buttonStyle={{
                    backgroundColor: 'purple',
                    borderRadius: 7,
                }}
                containerStyle={{
                    width: 130,
                    marginTop: 40,
                    marginHorizontal: 10,
                    padding: 7,
                    position: "relative",
                    alignSelf: "flex-start"

                }}
                onPress={() => inviteUser()}
            />
        </View>

    )

}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 30,
        //marginLeft: 20,
        //marginRight: 20,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#FFF',
    },
    button: {
        margin: 10,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
       // margin: 30,
       marginBottom: 20
    },
    error: {
        marginTop: 3,
        color: 'red'
    },
});


export default Invite;