import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";
export const AUTH_TOKEN = "auth-token";
export const USER_RECS = {}; 

export const onSignIn = (token) => {
  return AsyncStorage.multiSet([[USER_KEY, "true"],[AUTH_TOKEN, token]]);
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};


