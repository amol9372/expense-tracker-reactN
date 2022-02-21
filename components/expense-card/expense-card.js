import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from 'moment';
import constants from "../../src/constants";
import Utils from "../../src/utils";
import { useState } from "react/cjs/react.development";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withBadge, Badge } from "react-native-elements";

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
      let color, text;
      if(stakeholderStatus.status === 'lent'){
        color = 'green';
        text = `You ${stakeholderStatus.status} ₹${stakeholderStatus.amount}`
      } else if(stakeholderStatus.status === 'owe'){
        color = 'red';
        text = `You ${stakeholderStatus.status} ₹${stakeholderStatus.amount}`
      } else if(stakeholderStatus.status === 'self'){        
        color = 'grey';
        text = 'No Balance'
      }

      const balanceStyle = {
        fontSize: 12,
        textAlign: 'center',
        color: color,
        fontWeight: 'bold'    
      }

      return (<Text style={balanceStyle}>{text}</Text>)

    }

    //return <Text style={styles.balance}>{'No Balance'}</Text>;
  }

  return (
  //  <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate({routeName : 'Detail', params: {id : props.id} })}>
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
        {getBalance()}
      </View>
    </View>
    // </TouchableOpacity> 
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
    textAlign: "center",
  },
  balance : {
    fontSize: 11,
    textAlign: 'center',
    color: 'green'
  }
});

export default ExpenseCard;