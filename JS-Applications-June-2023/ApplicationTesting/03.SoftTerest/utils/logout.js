import { internalFetch } from "./fetch.js";
import { getAccessToken, removeUser } from "./sessionStorage.js";
import { showNav } from "./showCorrectNav.js";

export async function logout() {
    await logoutLogic()
    showNav()
}

async function logoutLogic() {
    let settings = {
        method: 'GET',
        headers: {'X-Authorization': getAccessToken()}
    }

    let url = 'http://localhost:3030/users/logout'

    await internalFetch(url,settings)
    removeUser()
}