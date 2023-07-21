export function isUserLoggedIn() {
    return sessionStorage.getItem('user') ? true : false
}

export function setItem(name, data) {
    sessionStorage.setItem(name, data)
}

export function getAccessToken() {
    return JSON.parse(sessionStorage.getItem('user')).accessToken
}

export function removeUser() {
    sessionStorage.removeItem('user')
}

export function getUserId() {
    return JSON.parse(sessionStorage.getItem('user'))._id
}