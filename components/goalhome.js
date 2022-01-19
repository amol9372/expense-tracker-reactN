import React, { useState } from "react";
import { View, Button, StyleSheet, FlatList } from "react-native";
import GoalInput from "./GoalInput";
import GoalItem from "./GoalItem";

const GoalHome = (props) => {
  const [goals, setGoals] = useState([]);
  const [isAddGoal, setIsAddGoal] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    setGoals((goals) => [
      ...goals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddGoal(false);
  };

  const onDelete = (goalId) => {
    setGoals((goals) => {
      return goals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalHandler = () => {
    console.log("Cancelling add goal operation ...");
    setIsAddGoal(false);
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Add a Goal"
        style={styles.button}
        onPress={() => setIsAddGoal(true)}
      />
      <GoalInput
        visible={isAddGoal}
        addGoalHandler={addGoalHandler}
        cancelGoalHandler={cancelGoalHandler}
      />

      <FlatList
        data={goals}
        renderItem={(item) => (
          <GoalItem
            id={item.item.id}
            title={item.item.value}
            onDelete={onDelete}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    borderRadius: 3,
    borderBottomColor: "red",
  },
});

export default GoalHome;
