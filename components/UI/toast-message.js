import Toast from 'react-native-toast-message';

export const showToast = () => {
    Toast.show({
        type: 'success',
        text1: 'awesome !!!',
        text2: 'Expense created 👋',
        position: 'bottom',
        autoHide: true,
        visibilityTime: 4000,
        activeOpacity: 0.5
    });
}