import axios from 'axios';

export default {
    auth(threeWordsKey){
        return axios.post('http://localhost:3000/downloadToken', threeWordsKey);
    },
};