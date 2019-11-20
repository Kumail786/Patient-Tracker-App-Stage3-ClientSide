import ActionTypes from "../actions/ActionsTypes"


const initstate = []

const dataReducer = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.GET_PATIENTS:
            
            return {
                ...state,
                patients: action.payload
            }
        case ActionTypes.ADD_PATIENT:
            
            return {
                ...state,
                newpatient: action.payload
            }
        case ActionTypes.GET_HISTORY:
            
            return {
                ...state,
                history: action.payload
            }
        case ActionTypes.ADD_RECORD:
           
            return {
                ...state,
                newdata: action.payload
            }
        case ActionTypes.ID:
            
            return {
                ...state,
                id: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default dataReducer