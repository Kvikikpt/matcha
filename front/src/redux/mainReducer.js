import { SOCKET_POP } from './actions/socket'
import { USER_POP } from "./actions/user";
import {TOKEN_POP} from './actions/token'

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
        case TOKEN_POP:
            return {...state,
                token: action.value
            }
        default:
            return state
    }
}

export default mainReducer