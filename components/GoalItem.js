import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableNativeFeedback,
} from "react-native";

const GoalItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={() => props.onDelete(props.id)}>
      <View>
        <Text style={styles.listItem}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 7,
    padding: 7,
    backgroundColor: "lightgrey",
    borderColor: "black",
    borderWidth: 1,
  },
});

export default GoalItem;
