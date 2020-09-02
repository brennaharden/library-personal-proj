const initialState = {
    holds: []
}

const GET_HOLDS = 'GET_HOLDS'

export function getHolds(payload){
    return {
        type: GET_HOLDS,
        payload
    }
}

export default function reducer(state = initialState, action){
    const{type, payload} = action
    switch(type){
        // case PLACE_HOLD + "_PENDING":
        //     return state
        case GET_HOLDS:
            return {...state, holds: payload}
        // case PLACE_HOLD + "_REJECTED":
        //     return initialState
        default:
            return state
    }
}