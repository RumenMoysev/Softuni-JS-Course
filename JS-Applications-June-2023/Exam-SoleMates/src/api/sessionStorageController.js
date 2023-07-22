export function getAccessToken() {
    return sessionStorage.getItem('accessToken')
}

export function isUserLoggedIn() {
    return sessionStorage.getItem('accessToken') ? true : false
}

export function getUserId() {
    return sessionStorage.getItem('userId')
}

export function getUsername() {
    return sessionStorage.getItem('username')
}

export function deleteUserData() {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('userId')
}