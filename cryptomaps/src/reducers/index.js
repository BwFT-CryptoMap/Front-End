import {
    FETCH_API_DATA_START,
    FETCH_API_DATA_SUCCESS,
    FETCH_API_DATA_FAIL
} from '../actions'

const initialState = {
    error: '',
    isFetching: false,
    isFetched: false,
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
            }

        }
        case FETCH_API_DATA_FAIL: {
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        }
        default: {
            return state
        }
    }
}