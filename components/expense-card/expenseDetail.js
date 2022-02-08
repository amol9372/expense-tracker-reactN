import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ExpenseDetail = (props) => {
    const id = props.navigation.getParam('id');

    return (
        <View style={styles.form}>
            <Text>Expense id is {id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    form: {
        flex: 1,
        padding: 30,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#FFF',
    },
});

ExpenseDetail.navigationOptions = {
    headerTitle: 'Detail',
    headerStyle: {
        backgroundColor: 'purple'
    },
    headerTintColor: 'white'
}

export default ExpenseDetail;