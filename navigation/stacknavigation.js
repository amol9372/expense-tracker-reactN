import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Account from "../components/account/account";
import ExpenseDetail from "../components/expense-card/expenseDetail";

import { Ionicons } from '@expo/vector-icons'

import Expenses from "../components/expense-card/expenses";
import GoalHome from "../components/goalhome";

const ExpenseNavigator = createStackNavigator({
   Expenses: Expenses,
   GoalHome: GoalHome,
   Detail: ExpenseDetail
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