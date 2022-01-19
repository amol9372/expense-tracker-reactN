import axios from 'axios'
import { TRACKER_APP_URL } from '@env'
import Constants from '../constants'

axios.defaults.headers.common["X-Requested-With"] = 'XmlHttpRequest';
axios.defaults.baseURL = TRACKER_APP_URL

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

        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                // Authorization: "JWT ".concat(data.access_token),
            },
        };

        try {
            //console.log("URL ::: ", TRACKER_APP_URL, Constants.endponts.getUserExpenses)
            const res = await axios.post(Constants.endponts.getUserExpenses, data, config);

            if (res.status === 200) {
                // console.log(res.data.expenses);
                response = Response(res);
            }

        } catch (error) {
            response = error;
        }

        return response;
    }

}

export default ExpenseService;