module.exports = {

    endponts: {
        getUserExpenses: '/expense/user',
        saveUserExpenses: '/expense/create',
        getUserDetails: '/user'
    },
    categories: {
        groceries: require('../assets/appicons/groceries.png'),
        movies: require('../assets/appicons/movies.png'),
        household: require('../assets/appicons/household.png'),
        sports: require('../assets/appicons/sports.png'),
        restaurant: require('../assets/appicons/restaurant.png'),
        coffee: require('../assets/appicons/coffee.png'),
        chai: require('../assets/appicons/chai.png'),
        parking: require('../assets/appicons/parking.png'),
        general: require('../assets/appicons/general.png'),
    },
    expenseCategories: [
        {
            label: 'Coffee', value: 'coffee',
            
        },
        {
            label: 'Chai', value: 'chai',
        },
        {
            label: 'Groceries', value: 'groceries',
        },
        {
            label: 'General', value: 'general',
        },
        {
            label: 'Household', value: 'household',
        },
        {
            label: 'Sports', value: 'sports',
        },
        {
            label: 'Restaurant', value: 'restaurant',
        },
        {
            label: 'Movies', value: 'movies',
        },
        {
            label: 'Parking', value: 'parking',
        },
    ],

    

}