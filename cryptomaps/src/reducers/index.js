import {
    FETCH_API_DATA_START,
    FETCH_API_DATA_SUCCESS,
    FETCH_API_DATA_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from '../actions'

const initialState = {
    error: '',
    isFetching: false,
    isFetched: false,
    currentUser: {},
    isLogging: false,
    isLoggedIn: false,
    isRegistering: false,
    isRegistered: false,
    authToken: null,
    loginError: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_API_DATA_START: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case FETCH_API_DATA_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                mapData: action.payload.data
            }

        }
        case FETCH_API_DATA_FAIL: {
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        }

        case LOGIN_START: {
            return {
                ...state,
                isLogging: true
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLogging: false,
                isLoggedIn: true,
                authToken: action.payload.token,
                currentUser: action.payload
            }
        }

        case LOGIN_FAIL: {
            return {
                ...state,
                isLogging: false,
                loginError: action.payload
            }
        }

        case SIGNUP_START: {
            return {
                ...state,
                isRegistering: true
            }
        }

        case SIGNUP_SUCCESS: {
            return {
                ...state,
                isRegistering: false,
                currentUser: action.payload

            }
        }

        case SIGNUP_FAIL: {

        }
        default: {
            return state
        }
    }
}