import axios from 'axios'
import ActionTypes from './ActionsTypes'
import { Actions } from 'react-native-router-flux'


export const getPatients = () => {
    return (dispatch) => {
        axios.get("https://us-central1-fir-cloud-functions-prac.cloudfunctions.net/getPatients").then(patients => {
            dispatch({ type: ActionTypes.GET_PATIENTS, payload: patients.data })

        }).catch(error => {
            console.log(error)
        })
    }
}

export const addpatient = (data) => {
    return (dispatch) => {
        axios.post("https://us-central1-fir-cloud-functions-prac.cloudfunctions.net/addPatient", data).then(res => {
            dispatch({ type: ActionTypes.ADD_PATIENT, payload: res.data })
            Actions.patientsList()
        }).catch(error => {
            console.log(error)
        })
    }
}



export const getHistory = (id) => {
    return (dispatch) => {
        axios.get(`https://us-central1-fir-cloud-functions-prac.cloudfunctions.net/specific?id=${id}`).then(res => {
            
            dispatch({ type: ActionTypes.GET_HISTORY, payload: res.data })

        }).catch((error) => {
            console.log(error)


        })
    }
}
export const addrecord = (data, id) => {
    return (dispatch) => {
        axios.post(`https://us-central1-fir-cloud-functions-prac.cloudfunctions.net/addrecord?id=${id}`, data).then(res => {
            Actions.history()
            dispatch({ type: ActionTypes.ADD_RECORD, payload: res.data })

        }).catch(error => {
          
        })
    }
}