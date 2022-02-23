import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Text } from "react-native";
import ExpenseCard from "./expense-card";
import ExpenseService from "../../src/services/expenseService";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/headerButtons'
import Utils from "../../src/utils";
import Toast from 'react-native-toast-message';
import { Button } from "react-native-elements/dist/buttons/Button";

const itemAttribute = {
  expenseId: 0,
  name: "",
  cost: 0,
  groupName: "",
  groupId: "",
  category: "",
  comments: {},
  createdBy: "",
  createdDate: "",
  paidBy: "",
  stakeholders: {}
};

// props.navigation.navigate({routeName: 'SomeIdentifier'});
// props.navigation.goBack('SomeIdentifier');
// props.navigation.popToPop();  ==> home

const Expenses = (props) => {

  //const reloadPage = props.navigation.getParam('reload');
  // console.log('[Reload]  ',reloadPage)

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [next, setNext] = useState(null);

  useEffect(() => {
    console.log('[Refreshing to show added expense ...]');
    if(refresh) {
      getUserExpenses();
    }
  }, [refresh]);

  useEffect(() => {
    console.log('[next token]  ', next)
    if (next) {
      getUserExpenses();
    }
  }, [loading]);

  useEffect(() => {
    console.log('[Reloading ...]');
    getUserExpenses();
  }, []);

  const getUserExpenses = async () => {
    let user, data;
    await Utils.getData('@loggedInUser').then(value => {
      user = JSON.parse(value);
    });

    await ExpenseService.getUserExpenses({
      userId: user.userId,
      startKey: next
    })
      .then(res => {
        let data = items.length > 0 ? items : [];

        if (res.data.expenses) {
          res.data.expenses.forEach(expense => {
            data.push(expense);
          });
        }
        setItems(data);
        setNext(() => res.data.nextToken);
      })
      .catch(err => console.log('Error fetching response ::: ', err)).finally(() => {
        setRefresh(false);
        setLoading(false);
      });

  }

  const loadMore = () => {
    console.log('[Loading more items ...]');
    setLoading(true);
  };

  const refreshExpenses = () => {
    console.log('[Refreshing ...]');
    setItems([]);
    setRefresh(true);
  };

  return (
    <View style={styles.expenseContainer}>
      <Button
        activeOpacity={1}
        icon={{
          name: 'refresh',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: 'purple',
          borderRadius: 7,
        }}
        containerStyle={{
          width: 60,
          marginHorizontal: 10,
          padding: 10,
          position: "relative",
          alignSelf: "flex-end"

        }}
        onPress={() => refreshExpenses()}
      />
      {items.length > 0 && (<FlatList
        refreshing={refresh}
        onRefresh={() => refreshExpenses()}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0}
        keyExtractor={item => item.expenseId}
        data={items}
        renderItem={(item) => (
          <ExpenseCard
            key={item.item.expenseId}
            id={item.item.expenseId}
            name={item.item.name}
            paidBy={item.item.paidBy}
            stakeholders={item.item.stakeholders}
            createdDate={item.item.createdDate}
            category={item.item.category}
            cost={item.item.cost}
            navigation={props.navigation}
          />
        )}
      />)}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
});

Expenses.navigationOptions = navData => {
  return {
    headerTitle: 'Your Expenses',
    headerStyle: {
      backgroundColor: 'purple'
    },
    headerTintColor: 'white',
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Create Expense" iconName="add-circle-sharp" onPress={() => navData.navigation.navigate({ routeName: 'AddExpense' })}></Item>
    </HeaderButtons>
  }

}

export default Expenses;

