import axios from 'axios'
import { USER_SERVICE_URL } from '@env'
import Constants from '../constants'

axios.defaults.headers.common["X-Requested-With"] = 'XmlHttpRequest';


export const Response = (res) => {
    return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
    return { message: error.data.description, status: error.status };
};

class UserService {

    static async getUserDetails(userId) {
        let response;
        console.log('[Get User Details] ::: ', userId);

        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                // Authorization: "JWT ".concat(data.access_token),
            },
        };

        try {
            const endPoint = Constants.endponts.getUserDetails
                .concat('/')
                .concat(userId);

            console.log("URL ::: ", USER_SERVICE_URL, endPoint);
            axios.defaults.baseURL = USER_SERVICE_URL;
            const res = await axios.get(endPoint, config);

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

export default UserService;