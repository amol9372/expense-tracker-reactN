import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "react-native-elements/dist/input/Input";
import DropDownPicker from "react-native-dropdown-picker";
import constants from "../../src/constants";
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/headerButtons'
import { Button } from "react-native-elements/dist/buttons/Button";
import { useValidation } from 'react-native-form-validator';
import Utils from "../../src/utils";
import ExpenseService from "../../src/services/expenseService";
import { showToast } from '../UI/toast-message';
import RadioButton from "../UI/radioButton";


const getCategoryItem = (category) => {
    return {
        label: category.label, value: category.value,
        icon: () => <Image source={constants.categories[category.value]} style={styles.icon} />
    }
}

const OK = 200;

const selectionHandler = new SelectionHandler({ maxMultiSelect: 4, allowDeselect: true });

const AddExpense = (props) => {

    const [stakeholdersInitial, setStakeholdersInitial] = useState(null);
    const [stakeholders, setStakeholders] = useState([]);
    const [stakeholdersLoaded, setStakeholdersLoaded] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [cost, setCost] = useState("");
    const [open, isOpen] = useState(false);
    const [paidBy, setPaidBy] = useState(null);
    const [paidByList, setPaidByList] = useState(null);

    // const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    //     useValidation({
    //         state: { name, cost, category },
    //     });

    useEffect(() => {
        console.log('[Setting user friends]');
        getFriends();
    }, [])


    const categories = constants.expenseCategories.map(category => getCategoryItem(category));

    const getFriends = async () => {
        const user = await Utils.getData('@loggedInUser');
        const userObject = JSON.parse(user);
        //console.log('[user details] ::: ',userObject);
        const friends = userObject.friends === null ? [] : userObject.friends;
        const stakeholders = friends.map(friend =>
            ({ optionText: friend.email, value: friend.userId }),
        );

        const payers = friends.map(friend =>
            ({ id: friend.email, value: friend.userId, name: friend.email, selected: false }),
        );

        payers.push({ id: userObject.email, value: userObject.userId, name: 'You', selected: true });

        setPaidByList(payers);
        setStakeholdersInitial(stakeholders);
        setStakeholdersLoaded(true);
    }

    const itemSelectedHandler = (item, allSelectedItems) => {
        setStakeholders(allSelectedItems);
    }

    const itemDeselectedHandler = (item, allSelectedItems) => {
        setStakeholders(allSelectedItems);
    }

    const renderButton = (data, index, isSelected, onPress) => {
        return (<TouchableOpacity
            onPress={onPress}
            key={index}
            style={[styles.button,
            { backgroundColor: isSelected ? '#33ab93' : '#edf2f1' }]}
        >
            <Text>{data.optionText}</Text>
        </TouchableOpacity>
        );
    }

    const onRadioBtnClick = (item) => {
        let updatedState = paidByList.map((payee) =>
            payee.id === item.id
                ? { ...payee, selected: true }
                : { ...payee, selected: false }
        );
        setPaidByList(updatedState);
    };

    const saveExpense = async () => {
        let body;

        if (name === "" || cost === "" || category === "") {
            validationAlert('Please add Expense name, cost and Category');
            return;
        }

        await Utils.getData('@loggedInUser').then(value => {
            const user = JSON.parse(value);
            const paidByUser = paidByList.filter(item => item.selected === true)[0];
            stakeholders.push({optionText : user.email, value: user.userId})

            let amount = parseFloat(cost) / stakeholders.length;

            if(stakeholders.length === 1 && paidByUser.id != user.email){
                console.log('[paid by someone else without any stake]'); 
                stakeholders.push({optionText : paidByUser.id, value: paidByUser.value})
                amount = parseFloat(cost);
            }

            let stakeholdersdb;
            if (stakeholders) {
                stakeholdersdb = stakeholders.map(item =>
                ({
                    userId: item.value,
                    email: item.optionText,
                    stakeholderStatus: {
                        status: stakeholders.length === 1 ? 'self' : item.optionText === paidByUser.id ? 'lent' : 'owe',
                        amount: amount
                    }
                })
                )
            }

            body = {
                cost: parseFloat(cost),
                name: name,
                category: category,
                paidBy: paidByUser.value,
                createdBy: user.email,
                stakeholders: {
                    paidBy: paidByUser.value,
                    users: stakeholdersdb
                }
            }
        });

        ExpenseService.saveUserExpense(body).then(res => {
            console.log(res);
            if (res.status === OK) {
                showToast();
                props.navigation.navigate({ routeName: 'Expenses', params: { reload: true } });
            } else {
                console.log(res);
                validationAlert(res);
            }
        })
    };

    const validationAlert = (messages) => {
        Alert.alert(
            'Validation error',
            messages,
        );
    }

    return (
        <ScrollView>
            <View style={styles.form}>

                <Input placeholder='Name of Expense' onChangeText={(text) => setName(text)} value={name} />
                <Input placeholder='Cost' keyboardType="numeric" onChangeText={(cost) => setCost(cost)} value={cost} />

                <DropDownPicker
                    items={categories}
                    open={open}
                    onSelectItem={(category) => {
                        setCategory(category.value)
                    }}
                    onClose={() => isOpen(false)}
                    //setValue={(value) => console.log(value)}
                    setOpen={() => isOpen(true)}
                    closeAfterSelecting={true}
                    value={category}
                    bottomOffset={8}
                    dropDownDirection="AUTO"
                    maxHeight={280}
                    placeholder="Select Category"
                    searchable={false}
                    closeOnBackPressed={true}
                    containerProps={{
                        maxWidth: 200,
                        style: {
                            alignContent: "flex-start",
                            alignItems: "flex-start"

                        }
                    }}
                />

                <View style={{ marginTop: 40, alignSelf: "flex-start", marginLeft: 10, borderWidth: 1, padding: 5, borderRadius: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Friends</Text>
                </View>

                {stakeholdersLoaded && <SelectionGroup
                    renderContent={renderButton}
                    items={stakeholdersInitial}
                    isSelected={selectionHandler.isSelected}
                    onPress={selectionHandler.selectionHandler}
                    getAllSelectedItemIndexes={selectionHandler.getAllSelectedItemIndexes}
                    containerStyle={styles.friends}
                    onItemSelected={(item, allSelectedItems) => itemSelectedHandler(item, allSelectedItems)}
                    onItemDeselected={(item, allSelectedItems) => itemDeselectedHandler(item, allSelectedItems)}
                />}

                <View style={{ marginTop: 40, alignSelf: "flex-start", marginLeft: 10, borderWidth: 1, padding: 5, borderRadius: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Paid By</Text>
                </View>

                { paidByList && paidByList.map((item) => (
                    <RadioButton
                        onPress={() => onRadioBtnClick(item)}
                        selected={item.selected}
                        key={item.id}
                    >
                        {item.name}
                    </RadioButton>
                ))}

                <Button
                    title="Save"
                    buttonStyle={{
                        backgroundColor: 'purple',
                        borderRadius: 7,
                    }}
                    containerStyle={{
                        width: 90,
                        marginTop: 40,
                        marginHorizontal: 10,
                        padding: 10,
                        position: "relative",
                        alignSelf: "flex-start"

                    }}
                    onPress={saveExpense}
                />

            </View>
        </ScrollView>
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
    icon: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    button: {
        margin: 10,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    friends: {
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    error: {
        marginTop: 3,
        color: 'red'
    },
});

AddExpense.navigationOptions = navData => {
    return {
        headerTitle: 'Add Expense',
        headerStyle: {
            backgroundColor: 'purple'
        },
        headerTintColor: 'white',
        // headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //     <Item title="Create Expense" iconName="save" onPress={() => navData.navigation.navigate({ routeName: 'Expenses' })}></Item>
        // </HeaderButtons>
    }

}

export default AddExpense;