// |==================================================================|
// | Set up default configuration and interceptors for axios.         |
// |==================================================================|

import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

// Can't call hooks this way, need to configure token local storage
//const [authToken, setAuthToken] = useLocalStorage('token', null)

const configOptions = {
    baseUrl: 'http://urltoApi',
    timeout: 3000,
    headers: {
        'Authorization': '',
        'Content Type': 'application/json',
    }
}

export default () => {
    return axios.create(configOptions)
}