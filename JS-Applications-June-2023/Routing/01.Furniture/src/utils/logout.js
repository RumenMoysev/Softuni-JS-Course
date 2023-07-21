import { internalFetch } from "./fetch.js";
import { deleteUserData, getAccessToken } from "./sessionStorageController.js";
import {page} from "./test.js"

export async function logout() {
    let settings ={
        method: 'GET',
        headers: {'X-Authorization': getAccessToken()}
    }

    await internalFetch('http://localhost:3030/users/logout', settings)
    deleteUserData()
    page('/')
}