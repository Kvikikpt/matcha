import { SOCKET_POP } from './actions/socket'
import { USER_POP } from "./actions/user";

const mainReducer = (state = {} , action) => {
    switch(action.type){
        case SOCKET_POP:
            return {...state,
                socket: action.value
            }
        case USER_POP:
            return {...state,
                user: action.value
            }
        default:
            return state
    }
}

export default mainReducer