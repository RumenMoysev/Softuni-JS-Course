import { internalFetch } from "../api/fetch.js"
import { page } from "../api/loadLibs.js"
import { getAccessToken } from "../api/sessionStorageController.js"

export async function deleteHandler(e) {
    e.preventDefault()

    let id = e.target.dataset.id
    let isSure = confirm('Are you sure you want to delete this shoe?')
    if(isSure) {
        const settings = {method:"DELETE",
        headers: {'X-Authorization': getAccessToken()}}
        await internalFetch(`http://localhost:3030/data/shoes/${id}`, settings)
        page('/dashboard')
    }
}