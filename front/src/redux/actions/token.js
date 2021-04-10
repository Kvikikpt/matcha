export const TOKEN_POP = 'TOKEN_POP'

export const setToken = (value) => {
    return {
        type: TOKEN_POP,
        value
    }
}