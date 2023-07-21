export function getAccessToken() {
    return sessionStorage.getItem('accessToken')
}

export function isUserLoggedIn() {
    let isIn = sessionStorage.getItem('accessToken')? true : false
    return isIn
}

export function getUserId() {
    return sessionStorage.getItem('UserId')
}

export function deleteUserData() {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('UserId')
}