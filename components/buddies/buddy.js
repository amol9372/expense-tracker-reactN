import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import React, { useState } from "react";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../UI/headerButtons'

const Buddy = (props) => {

    const [items, setItems] = useState([{}]);

    return (
        <View style={styles.form}>
            <Text>Amol Singh</Text>
            {/* <FlatList
                refreshing={refresh}
                //onRefresh={getUserExpenses()}
                onEndReached={() => loadMore()}
                onEndReachedThreshold={0}
                keyExtractor={item => item.expenseId}
                data={items}
                renderItem={(item) => (
                    <ExpenseCard
                        key={item.item.id}
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
            /> */}
        </View>)

}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 30,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#FFF',
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    button: {
        margin: 10,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

Buddy.navigationOptions = navData => { 
    return {
        headerTitle: 'Buddies',
        headerStyle: {
            backgroundColor: 'purple'
        },
        headerTintColor: 'white',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Add people" iconName='person-add' onPress={() => console.log('[inviting buddy ...]')}></Item>
        </HeaderButtons>
    }    
}

export default Buddy;