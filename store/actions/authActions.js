import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import ActionsTypes from './ActionsTypes'
export const SignUp = (data) => {
    
    return (dispatch) => {
        axios.post("https://mighty-ocean-20865.herokuapp.com/doctor/signup", data).then(res => {
            
            Actions.login()
            dispatch({
                type: ActionsTypes.SIGNUP_SUCCESS,
                payload: res.data
            })

        }).catch(error => {

            dispatch({
                type: ActionsTypes.SIGNUP_FAILED,
                payload: error.response
            })
        })

    }
}

export const SignIn = (data) => {

    return (dispatch) => {
        axios.post("https://mighty-ocean-20865.herokuapp.com/doctor/login", data).then(res => {
           
            Actions.loggedIn()
            dispatch({
                type: ActionsTypes.SIGNIN_SUCCESS,
                payload: res.data
            })


        }).catch(error => {
            dispatch({
                type: ActionsTypes.SIGNIN_FAILED,
                payload: error.response.data
            })
        })

    }
}

export const logOut = () => {
    Actions.login()
    return (dispatch) => {
        
        dispatch({
            type: ActionsTypes.LOGGED_OUT,
        })
    }
}

export const idGetter = (id) => {
    return (dispatch) => {
        Actions.history()
        dispatch({
            type: ActionsTypes.ID,
            payload: id
        })
    }
}