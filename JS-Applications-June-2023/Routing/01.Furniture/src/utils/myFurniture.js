import { html, render } from "./test.js";
import { internalFetch } from "./fetch.js";
import { getUserId } from "./sessionStorageController.js";
import { homeTemplate } from "./templates.js";

let output = document.getElementById('container')

export async function showMyFurniture() {
    let furniture = await getUserFurniture()

    let readyTemp = (furnitureInfo) => html`<div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">${furnitureInfo.map(x => homeTemplate(x))}
        </div>`

    render(readyTemp(furniture), output)
}

async function getUserFurniture() {
    let userId = getUserId()
    let settings = {method:"GET"}

    return await internalFetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`, settings)
}