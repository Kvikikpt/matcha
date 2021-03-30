export const SOCKET_POP = 'SOCKET_POP'

export const setSocket = (value) => {
    return {
        type: SOCKET_POP,
        value
    }
}