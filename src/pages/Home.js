import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchData } from '../redux/actions/template.actions'

export const HomePage = () => {
    const data = useSelector(state => state.template)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    if (data.loading)
        return <p>Loading...</p>

    if (data.data) {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        )
    }

}