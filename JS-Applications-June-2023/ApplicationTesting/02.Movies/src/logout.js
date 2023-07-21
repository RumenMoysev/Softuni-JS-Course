import { loginPage } from "./login.js"

export async function logout(e) {
    console.log('logout')

    await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {'X-Authorization': JSON.parse(sessionStorage.getItem('user')).accessToken}
    })
    sessionStorage.removeItem('user')

    loginPage()
}