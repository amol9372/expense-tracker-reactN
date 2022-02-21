import React from "react";
import { Text, View, StyleSheet, AppRegistry } from "react-native";

const KeyValueField = (props) => {

    return (
        <View style={styles.field}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <Text style={styles.userAttribute}>
                {props.value}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    label: {
        fontFamily: "sans-serif-light",
        fontSize: 12,
        width: 80
    },
    userAttribute: {
        fontFamily: "sans-serif",
        fontSize: 14,
        marginBottom: 19,
        //marginTop: 20,
        marginLeft: 50,
        textAlign: "right",
        alignSelf: "flex-start"
    },
    field: {
        flexDirection: "row",
        marginTop: 19
    }
});

export default KeyValueField;

AppRegistry.registerComponent('AndroidFonts', () => KeyValueField);