import { View, StyleSheet, AppRegistry } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/headerButtons'
import { Avatar, ListItem } from "react-native-elements";
import constants from "../../src/constants";
import UserService from "../../src/services/userService";
import Utils from "../../src/utils";

const buddyAttribute = {
    userId: "",
    name: "",
    email: "",
    avatar: "",
    balance: {
        amount: Number.NaN,
        status: ""
    }
}

const Buddy = (props) => {

    const [items, setItems] = useState([buddyAttribute]);

    useEffect(() => {

        getFriendsBalances();

    }, []);

    const getFriendsBalances = async () => {
        let user
        await Utils.getData('@loggedInUser').then(value => {
            user = JSON.parse(value);
        });

        if (user.friends) {
            setItems(user.friends);

            let itemstemp = items;

            UserService.getUserFriendsBalance(user.userId).then(res => {
                if (res.data) {
                    itemstemp.forEach(item => {
                        item.balance = res.data.filter(resItem => item.userId === resItem.userId)[0].balance; 
                    });
                    setItems(itemstemp);
                }
            })
                .catch(err => console.log('[Error in fetching data] ::: ', err))
        }
    }

    return (
        <View>
            {items.length > 0 && items.map((item) => (<ListItem key={item.userId} bottomDivider>
                <Avatar size={45} source={constants.avatars[item.avatar]} rounded key={item.userId} containerStyle={{
                    borderColor: 'black',
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                }} />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight : 'bold', fontSize: 22 }}>
                        {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                    {item.balance &&
                        <>
                            <ListItem.Title right style={{ color: item.balance.status == 'Owes You' ? 'green' : 'red',fontWeight : 'bold' }}>
                                {item.balance && item.balance.status}
                            </ListItem.Title>
                            <ListItem.Subtitle right>
                                {item.balance && item.balance.amount}
                            </ListItem.Subtitle>
                        </>}
                </ListItem.Content>
            </ListItem>))}
        </View>
    )

}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 30,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#FFF',
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        //borderColor: colors.greyOutline,
    },
});

Buddy.navigationOptions = navData => {
    return {
        headerTitle: 'Buddies',
        headerStyle: {
            backgroundColor: 'purple'
        },
        headerTintColor: 'white',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Add people" iconName='person-add' onPress={() => console.log('[inviting buddy ...]')}></Item>
        </HeaderButtons>
    }
}

export default Buddy;

AppRegistry.registerComponent('AndroidFonts', () => Buddy);