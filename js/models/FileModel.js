import axios from 'axios';
import config from '../config';

export default {
    auth(threeWordsKey){
        return axios.post(config.serverDomain + '/downloadToken', threeWordsKey);
    },
};