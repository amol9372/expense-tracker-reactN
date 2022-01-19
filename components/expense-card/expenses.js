import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import ExpenseCard from "./expense-card";
import ExpenseService from "../../src/services/expenseService";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/headerButtons'
import Utils from "../../src/utils";

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

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [next, setNext] = useState(null);

  useEffect(() => {
    getUserExpenses();
  }, []);

  useEffect(() => {
    if(next){
      getUserExpenses();
    }    
  }, [loading]);


  const getUserExpenses = () => {
    //setRefresh(true);
    Utils.getData('@loggedInUser').then(value => {
      const user = JSON.parse(value);
      const nextToken = getNextToken();
      ExpenseService.getUserExpenses({
        userId: `user_${user.sub}`,
        startKey: nextToken
      })
        .then(res => {
          
          let data = items;
          if(res.data.expenses && loading){
            res.data.expenses.forEach(expense => {
              data.push(expense);
            });
          } else {
            data = res.data.expenses;
          }
          setItems(data);
          setNext(res.data.nextToken);
         
          //setLoading(false);
        })
        .catch(err => console.log('Error fetching response ::: ', err)).finally(() => {
          setRefresh(false);
          setLoading(false);
        });
    });
  }

  const getNextToken = () => {
    console.log('[Refresh Reload]  =>  '  ,refresh, loading)
    if(refresh){
      return null;
    }
    if(loading){
      return next;
    }
    return null;
  }

  const reload = async () => {
    console.log('[Refreshing ...]')
    setRefresh(true);
    setTimeout(() => {
      console.log(refresh);
      getUserExpenses();
      setRefresh(true);
    }, 1000);

  };

  const loadMore = () => {
    console.log('[Loading more items ...]');
    setLoading(true);
    //getUserExpenses();
    //setLoading(false);
  };

  return (
    <View style={styles.expenseContainer}>
      <FlatList
        //refreshing={refresh}
        //onRefresh={getUserExpenses()}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    marginTop: 40,
    marginBottom: 10,
  },
});

Expenses.navigationOptions = {
  headerTitle: 'Your Expenses',
  headerStyle: {
    backgroundColor: 'purple'
  },
  headerTintColor: 'white',
  headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Create Expense" iconName="add-circle-sharp" onPress={() => console.log("button clicked")}></Item>
  </HeaderButtons>
}

export default Expenses;

