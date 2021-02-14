import { LOADING, SET_DATA } from '../../constants'

export const fetchData = () => {
    return async dispatch => {
        dispatch(dataLoading())
        const response = await fetch('url')
        const data = response.json()
        dispatch(setData(data))
    }
}

export const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data
    }
}

export const dataLoading = () => ({type: LOADING})
