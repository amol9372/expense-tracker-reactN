import { View, StyleSheet, AppRegistry, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/headerButtons'
import { Avatar, Card, colors, ListItem } from "react-native-elements";
import constants from "../../src/constants";
import UserService from "../../src/services/userService";
import Utils from "../../src/utils";
import ETButton from "../UI/customButton";
import { showToast } from "../UI/toast-message";

const buddyAttribute = {
    userId: "",
    name: "",
    email: "",
    avatar: "",
    balance: {
        amount: 0,
        status: ""
    },
    confirmed: false,
}

const Buddy = (props) => {

    const [items, setItems] = useState([]);
    const [noItem, setNoItem] = useState(false);
    const [reload, setReload] = useState(false)

    useEffect(() => {

        if (reload) {
            getFriendsBalances();
        }

    }, [reload]);

    useEffect(() => {

        getFriendsBalances();

    }, []);

    const getFriendsBalances = async () => {
        let user
        await Utils.getData('@loggedInUser').then(value => {
            user = JSON.parse(value);
        });

        if (user.friends) {
            let itemstemp = user.friends;

            UserService.getUserFriendsBalance(user.userId).then(res => {

                if (res.data) {
                    itemstemp.forEach(item => {
                        const match = res.data.find(resItem => item.userId === resItem.userId);
                        if (match) {
                            item.balance = match.balance;
                        }
                    });
                    setItems(() => itemstemp);
                }
            })
                .catch(err => console.log('[Error in fetching data] ::: ', err))
        } else {
            setNoItem(true);
        }
    }

    const remind = () => {

    }

    const settle = (item) => {

        Alert.alert(
            'Confirm Settlement',
            `Are you sure want to settle expenses with ${item.name} ?`,
            [
                {
                    text: 'Ok',
                    onPress: () => {
                        doSettlement(item);
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log("Cancel Pressed"),
                    style: 'cancel'
                }],
        );
    }

    const doSettlement = async (item) => {

        let user, paidBy, receivedBy;
        await Utils.getData('@loggedInUser').then(value => {
            user = JSON.parse(value);
        });

        if (item.balance.status === 'Owes You') {
            paidBy = user.name;
            receivedBy = item.name;
        } else {
            paidBy = item.name;
            receivedBy = user.name;
        }

        const request = {
            userId: user.userId,
            friend: {
                userId: item.userId
            },
            settlement: {
                paidBy: paidBy,
                receivedBy: receivedBy,
                amount: item.balance.amount
            }
        }

        UserService.settleBalance(request).then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log('[Response is 200]')
                loadAgain();
                showToast();
            }
        });
    }

    const loadAgain = () => {
        setReload(() => true);
    }

    return (
        <View style={styles.list}>
            {items.length > 0 && items.map((item) => (
                
                    <ListItem key={item.userId} bottomDivider>
                        <Avatar size={45} source={constants.avatars[item.avatar]} rounded key={item.userId} containerStyle={{
                            borderColor: 'black',
                            borderStyle: 'solid',
                            borderWidth: 0.5,
                        }} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', fontSize: 22 }}>
                                {item.name ? item.name : item.email}
                            </ListItem.Title>
                            <ListItem.Subtitle>{item.confirmed ? item.email : 'Pending Invite'}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content right>
                            {item.balance ?
                                <>
                                    <ListItem.Title right style={{ color: item.balance.status == 'Owes You' ? colors.platform.android.success : colors.platform.android.error, fontWeight: 'bold' }}>
                                        {item.balance && item.balance.status}
                                    </ListItem.Title>
                                    <ListItem.Subtitle right style={{ color: colors.grey3, fontWeight: 'bold' }}>
                                        {item.balance && `₹ ${item.balance.amount}`}
                                    </ListItem.Subtitle>
                                </> :
                                <ListItem.Title right style={{ color: 'grey', fontWeight: 'bold' }}>
                                    {'No Balance'}
                                </ListItem.Title>}
                        </ListItem.Content>

                    </ListItem>
                    // {item.balance &&
                    //     <View style={styles.options}>
                    //         {/* <ETButton title={'Remind'} width={90} marginTop={3} onButtonPress={() => remind()}/> */}
                    //         <ETButton title={'Settle'} color='green' width={80} marginTop={3} onButtonPress={() => settle(item)} />
                    //     </View>}

            ))}
            {noItem &&
                <View>
                    <Card>
                        <Image source={require('./../../assets/appicons/lonely.png')} style={{ height: 60, width: 60, margin: 5 }} />
                        <Text style={{ fontWeight: 'bold' }}>
                            You do not have any buddies
                        </Text>
                    </Card>
                </View>
            }
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
        //marginTop: 30,
        //flex: 1,
        // borderTopWidth: 1,
        //borderColor: colors.greyOutline,
    },
    options: {
        //padding: 30,
        //alignContent: "center",
        //alignItems: "center",
        flexDirection: "row",
        marginBottom: 20
        //backgroundColor: '#FFF',
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
            <Item title="Add people" iconName='person-add' onPress={() => navData.navigation.navigate({ routeName: 'Invite' })}></Item>
        </HeaderButtons>
    }
}

export default Buddy;

AppRegistry.registerComponent('AndroidFonts', () => Buddy);