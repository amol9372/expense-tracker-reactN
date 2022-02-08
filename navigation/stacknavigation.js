import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Account from "../components/account/account";
import ExpenseDetail from "../components/expense-card/expenseDetail";

import { Ionicons } from '@expo/vector-icons'

import Expenses from "../components/expense-card/expenses";
import AddExpense from "../components/expense-card/addExpense";
import Buddy from "../components/buddies/buddy";

const ExpenseNavigator = createStackNavigator({
   Expenses: Expenses,
   Detail: ExpenseDetail,
   AddExpense: AddExpense,
   Buddies: Buddy,
   Account: Account
}, {
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: 'purple'
      },
      headerTintColor: 'white'
   }
});

const buddyNavigator = createStackNavigator({
   Buddies: Buddy,
}, {
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: 'purple'
      },
      headerTintColor: 'white'
   }
});

const TabNavigator = createBottomTabNavigator({
   Home: {
      screen: ExpenseNavigator, navigationOptions:
      {
         tabBarIcon: (tabInfo) => {
            return <Ionicons name="home" size={30} color={tabInfo.tintColor}></Ionicons>
         }
      }
   },
   Groups: {
      screen: Account, navigationOptions:
      {
         tabBarIcon: (tabInfo) => {
            return <Ionicons name="people-outline" size={30} color={tabInfo.tintColor}></Ionicons>
         }
      }
   },

   Buddies: {
      screen: buddyNavigator, navigationOptions:
      {
         tabBarIcon: (tabInfo) => {
            return <Ionicons name="person-outline" size={24} color={tabInfo.tintColor}></Ionicons>
         },
      }
   },

   Account: {
      screen: Account, navigationOptions:
      {
         tabBarIcon: (tabInfo) => {
            return <Ionicons name="person-circle-outline" size={30} color={tabInfo.tintColor}></Ionicons>
         }
      }
   },
}, {
   tabBarOptions: {
      activeTintColor: 'purple',
   }
});

export default createAppContainer(TabNavigator);