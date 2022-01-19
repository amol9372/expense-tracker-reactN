import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const onChangeText = (enteredGoal) => {
    setEnteredGoal(enteredGoal);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          placeholder="Enter a Goal"
          onChangeText={onChangeText}
          value={enteredGoal}
          style={styles.inputField}
        />
        <View style={styles.actionsButtons}>
          <View style={styles.button}>
            <Button
              title="Add"
              onPress={() => props.addGoalHandler(enteredGoal)}
            />
          </View>
          <Button
            title="Cancel"
            onPress={() => props.cancelGoalHandler(enteredGoal)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    backgroundColor: "white",
    height: 35,
    borderWidth: 1,
    width: "80%",
    padding: 10,
  },
  actionsButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
    width: "50%",
  },
  button: {
    width: 50,
    borderRadius: 3,
    borderBottomColor: "red",
  },
});

export default GoalInput;
