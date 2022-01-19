import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from 'moment';
import constants from "../../src/constants";
import Utils from "../../src/utils";
import { useState } from "react/cjs/react.development";
import { TouchableOpacity } from "react-native-gesture-handler";

const ExpenseCard = (props) => {

  const category = constants.categories[props.category] ? constants.categories[props.category] : require('../../assets/appicons/general.png')
  const [paidBy, setPaidBy] = useState();

  useEffect(() => {
    const getPaidBy = async () => {
      let payer = '';
      await Utils.getData('@loggedInUser').then(user => {
        user = JSON.parse(user);
        if (user) {
          if (user.email === props.paidBy) {
            payer = 'You';
          } else {
            payer = props.paidBy;
          }
          const paidByString = `${payer} paid ₹${props.cost}`;
          setPaidBy(paidByString);
        }
      });
    }
    
    getPaidBy();

  }, [])

  const getBalance = () => {
    const users = props.stakeholders.users;
    if (users) {
      const stakeholderStatus = users[0].stakeholderStatus;
      return `You ${stakeholderStatus.status} ₹${stakeholderStatus.amount}`;
    }

    return 'No Balance';
  }

  return (
   <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate({routeName : 'Detail', params: {id : props.id} })}>
    <View style={styles.card}>
      <Image source={category} style={styles.photo} />
      <View>
        <Text style={styles.createdDate}>
          {moment(props.createdDate).format('MMM DD').toString()}
        </Text>
        <Text style={styles.time}>
          {moment(props.createdDate).format('hh:mm a').toString()}
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.title}>
          {props.name}
        </Text>
        <Text style={styles.description}>
          {paidBy}
        </Text>
      </View>
      <View>
        <Text style={styles.time}>{getBalance()}</Text>
      </View>
    </View>
    </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 7,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 14,
    justifyContent: 'center',
    marginBottom: 10
  },
  createdDate: {
    fontSize: 17,
  },
  time: {
    fontSize: 11,
    textAlign: "center"
  }
});

export default ExpenseCard;