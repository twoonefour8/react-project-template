import { LOADING, SET_DATA } from '../../constants'

const initialState = {
    loading: false,
    data: []
}

export const templateReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                loading: true
            }

        case SET_DATA:
            return {
                loading: false,
                data: action.payload
            }

        default:
            return state
    }
}