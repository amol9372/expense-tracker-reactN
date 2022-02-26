import axios from 'axios'
import { USER_SERVICE_URL } from '@env'
import Constants from '../constants'
import Utils from "../utils";

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

        const session = await Utils.getUserSession();
        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: session.idToken.jwtToken,
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

    static async getUserFriendsBalance(userId) {
        let response;
        console.log('[Get User Friends Balance] ::: ', userId);

        const session = await Utils.getUserSession();
        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: session.idToken.jwtToken,
            },
        };

        try {
            const endPoint = Constants.endponts.getUserFriendsBalance
                .concat('/')
                .concat(userId);

            console.log('URL ::: ', USER_SERVICE_URL, endPoint);
            axios.defaults.baseURL = USER_SERVICE_URL;
            const res = await axios.get(endPoint, config);

            if (res.status === 200) {
                //console.log(res.data);
                response = Response(res);
            }

        } catch (error) {
            response = error;
        }

        return response;
    }

    static async inviteUser(data) {
        let response;
        console.log('[Invite User] ::: ', data);

        const session = await Utils.getUserSession();
        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: session.idToken.jwtToken,
            },
        };

        try {
            const endPoint = Constants.endponts.inviteUser
                
            console.log('URL ::: ', USER_SERVICE_URL, endPoint);
            axios.defaults.baseURL = USER_SERVICE_URL;
            const res = await axios.post(endPoint, data,config);

            if (res.status === 200) {
                //console.log(res.data);
                response = Response(res);
            }

        } catch (error) {
            response = error;
        }

        return response;
    }

}

export default UserService;