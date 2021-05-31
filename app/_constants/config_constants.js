import { API_KEY } from 'react-native-dotenv';
import { sessions } from '../_helpers';

getToken();
export const configConstants = {
    // urlApi: API_KEY,
    urlApi: 'http://34.87.121.155:2121/urbanAPI',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: ""
    },
};

async function getToken() {
    configConstants.headers.token = await sessions.getSess('@Token');
}

console.log('configConstants', configConstants.headers);