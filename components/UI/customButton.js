import React from "react";
import { Button } from "react-native-elements";

const ETButton = (props) => {

    const onButtonPress = () => {
        props.onButtonPress();
    }

    return (
        <Button
            icon={props.icon}
            loading={props.loading}
            title={props.title}
            buttonStyle={{
                backgroundColor: props.color ? props.color : 'purple',
                borderRadius: 7,
            }}
            containerStyle={{
                width: props.width,
                marginTop: props.marginTop,
                marginHorizontal: props.marginHorizontal ? props.marginHorizontal :10,
                padding: 7,
                position: "relative",
                alignSelf: "flex-start",
            }}
            onPress={() => onButtonPress()}
        />)

}

export default ETButton;