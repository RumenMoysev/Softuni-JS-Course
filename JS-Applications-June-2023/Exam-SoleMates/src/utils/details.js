import { internalFetch } from "../api/fetch.js";
import { render } from "../api/loadLibs.js";
import { getUserId } from "../api/sessionStorageController.js";
import { notOwnerDetails, ownerDetails } from "../templates/detaisTemps.js";
import { deleteHandler } from "./delete.js";

let output = document.getElementById('main')
export function showDetails(ctx) {
    displayDetails(ctx.params.id)
}

async function displayDetails(id) {
    let response = await getDetails(id)
    if(getUserId() == response._ownerId) {
        render(ownerDetails(response, deleteHandler), output)
    } else {
        render(notOwnerDetails(response), output)
    }

}

function getDetails(id) {
    let settings = {method:"GET"}
    return internalFetch(`http://localhost:3030/data/shoes/${id}`, settings)
}