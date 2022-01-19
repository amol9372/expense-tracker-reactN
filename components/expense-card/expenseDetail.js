import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Input } from "react-native-elements/dist/input/Input";

const ExpenseDetail = (props) => {
    const id = props.navigation.getParam('id');
    return (
        <View style={styles.form}>
            <Input placeholder='Name of Expense'/>
            <Input placeholder='Cost'/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    form: {
        flex: 1,
        padding: 30,
        //marginLeft: 20,
        //marginRight: 20,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#FFF',
    }
});

ExpenseDetail.navigationOptions = {
    headerTitle: 'Detail',
    headerStyle: {
        backgroundColor: 'purple'
    },
    headerTintColor: 'white'
}

export default ExpenseDetail;