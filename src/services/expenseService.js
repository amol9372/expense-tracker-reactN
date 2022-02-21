import axios from 'axios'
import { TRACKER_APP_URL } from '@env'
import Constants from '../constants'
import Utils from "../utils";

axios.defaults.headers.common["X-Requested-With"] = 'XmlHttpRequest';

export const Response = (res) => {
    return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
    return { message: error.data.description, status: error.status };
};

class ExpenseService {

    static async getUserExpenses(data) {

        let response;
        console.log('[Get User Expenses]', data);

        const session = await Utils.getUserSession();
        console.log();
        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: session.idToken.jwtToken,
            },
        };

        try {
            require('axios-debug-log/enable');
            console.log("URL ::: ", TRACKER_APP_URL, Constants.endponts.getUserExpenses);
            axios.defaults.baseURL = TRACKER_APP_URL;
            const res = await axios.post(Constants.endponts.getUserExpenses, data, config);

            //console.log('[status] ::: ',res.status);

            if (res.status === 200) {
                //console.log(res.data);
                response = Response(res);
            }

        } catch (error) {
            console.log(error);
            response = error;
        }

        return response;
    }

    static async saveUserExpense(data) {

        let response;
        console.log('[Save User Expenses]', data);
        const session = await Utils.getUserSession();
        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: session.idToken.jwtToken,
            },
        };

        try {
            console.log("URL ::: ", TRACKER_APP_URL, Constants.endponts.getUserExpenses)
            axios.defaults.baseURL = TRACKER_APP_URL;
            const res = await axios.post(Constants.endponts.saveUserExpenses, data, config);

            if (res.status === 200) {
                response = Response(res);
            }

        } catch (error) {
            response = error;
        }

        return response;
    }



}

export default ExpenseService;