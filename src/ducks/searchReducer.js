const initialState = {
    results: {}
}

const SEARCH = 'SEARCH'

export function searchBooks(payload){
    return {
        type: SEARCH,
        payload
    }
}

export default function reducer(state = initialState, action){
    const{type, payload} = action
    switch(type){
        case SEARCH + "_PENDING":
            return state
        case SEARCH + "_FULFILLED":
            return {...state, results: payload.data}
        case SEARCH + "_REJECTED":
            return initialState
        default:
            return state
    }
}