import axios from 'axios'
import axiosWithAuth from '../axios/axiosWithAuth'

export const FETCH_API_DATA_START = 'FETCH_APA_DATA_START'
export const FETCH_API_DATA_SUCCESS = 'FETCH_API_DATA_SUCCESS'
export const FETCH_API_DATA_FAIL = 'FETCH_API_DATA_FAIL'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const SIGNUP_START = 'SIGNUP_START'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

export const getApiData = () => dispatch => {
    dispatch({ type: FETCH_API_DATA_START })
    axios
        .get('https://data.messari.io/api/v1/markets/prices-legacy')
        .then(res => dispatch({ type: FETCH_API_DATA_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: FETCH_API_DATA_FAIL, payload: err }))
}

export const postLoginUser = payload => dispatch => {
    dispatch({ type: LOGIN_START })
    axiosWithAuth()
        .post('https://cryptomap.herokuapp.com/api/login', payload)
        .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: LOGIN_FAIL, payload: err }))
}

export const postSignupUser = payload => dispatch => {
    dispatch({ type: SIGNUP_START })
    axiosWithAuth()
        .post('https://cryptomap.herokuapp.com/api/register', payload)
        .then(res => dispatch({ type: SIGNUP_SUCCESS, payload: res.data.payload }))
        .catch(err => dispatch({ type: SIGNUP_FAIL, payload: err }))
}