// |==================================================================|
// | Set up default configuration and interceptors for axios.         |
// |==================================================================|

import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

const [authToken, setAuthToken] = useLocalStorage('token', null)

const configOptions = {
    baseUrl: 'http://urltoApi',
    timeout: 3000,
    headers: {
        'Authorization': authToken,
        'Content Type': 'application/json',
    }
}

export default () => {
    return axios.create(configOptions)
}