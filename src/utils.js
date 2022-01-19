import { Auth } from "aws-amplify";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Utils {

    static async getLoggedInUser() {
        const user = await Auth.currentAuthenticatedUser();
        return user.attributes;
    }

    static async getUserSession() {
        try {
          const sessionInfo = await Auth.currentSession();
          return sessionInfo;
        } catch (error) {
          console.log("error gettting session info: ", error);
        }
    }

    static async storeData(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(e)
      }
    }

    static async getData(key) {
      try {
        return await AsyncStorage.getItem(key);
      } catch (e) {
        console.log(e)
      }
    }

}

export default Utils;