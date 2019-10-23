import axios from 'axios'

export const FETCH_API_DATA_START = 'FETCH_APA_DATA_START'
export const FETCH_API_DATA_SUCCESS = 'FETCH_API_DATA_SUCCESS'
export const FETCH_API_DATA_FAIL = 'FETCH_API_DATA_FAIL'

export const getApiData = () => dispatch => {
    dispatch({ type: FETCH_API_DATA_START })
    axios
        .get('https://data.messari.io/api/v1/markets/prices-legacy')
        .then(res => dispatch({ type: FETCH_API_DATA_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: FETCH_API_DATA_FAIL, payload: err }))
}