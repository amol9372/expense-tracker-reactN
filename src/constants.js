module.exports = {

    endponts: {
        getUserExpenses: '/expense/user',
        saveUserExpenses: '/expense/create',
        getUserDetails: '/user',
        getUserFriendsBalance: '/user/friends/balances',
        inviteUser: '/user/invite'
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
    avatars: {
        spiderman: require('../assets/appicons/superhero-icons/spiderman.png'),
        batman: require('../assets/appicons/superhero-icons/batman.png'),
        ironman: require('../assets/appicons/superhero-icons/ironman.png'),
        ironman2: require('../assets/appicons/superhero-icons/ironman2.png'),
        wolverine: require('../assets/appicons/superhero-icons/wolverine.png'),
        captianamerica: require('../assets/appicons/superhero-icons/captianamerica.png'),
        joker: require('../assets/appicons/superhero-icons/joker.png'),
        deadpool: require('../assets/appicons/superhero-icons/deadpool.png'),
        caps: require('../assets/appicons/superhero-icons/caps.png'),
        fury: require('../assets/appicons/superhero-icons/fury.png'),
        spideyface: require('../assets/appicons/superhero-icons/spideyface.png'),
        hulk: require('../assets/appicons/superhero-icons/hulk.png'),
        ww2: require('../assets/appicons/superhero-icons/ww2.png'),
        supes: require('../assets/appicons/superhero-icons/supes.png'),
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