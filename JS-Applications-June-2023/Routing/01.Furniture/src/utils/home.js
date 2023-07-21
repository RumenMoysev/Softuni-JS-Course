import { html, render } from "./test.js";
import { internalFetch } from "./fetch.js";
import { getAccessToken, getUserId } from "./sessionStorageController.js";
import { editFurniture, homeTemplate, notOwnerDetails, ownerDetails } from "./templates.js";
import {page }from "./test.js"

let output = document.getElementById('container')

export async function showHome() {
    let furniture = await getFurniture()

    let readyTemp = (furnitureInfo) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${furnitureInfo.map(x => homeTemplate(x))}
        </div>`

    render(readyTemp(Object.values(furniture)), output)
}

async function getFurniture() {
    let settings = {method: 'GET'}
    return await internalFetch('http://localhost:3030/data/catalog', settings)
}

export async function showDetails(id) {
    let response = await getDetails(id)
    response._ownerId == getUserId() ? render(ownerDetails(response), output) : render(notOwnerDetails(response), output)
}

async function getDetails(id) {
    let settings = { method: 'GET' }
    return await internalFetch(`http://localhost:3030/data/catalog/${id}`, settings)
}

export async function editDetails(id) {
    let response = await getDetails(id)
    render(editFurniture(response), output)
    let form = document.getElementById('editForm')
    form.addEventListener('submit', onsubmit)

    async function onsubmit(e) {
        e.preventDefault()
        let data1 = new FormData(form)
        let data = {
            make: data1.get('make'),
            model: data1.get('model'),
            year: data1.get('year'),
            description: data1.get('description'),
            price: data1.get('price'),
            img: data1.get('img'),
            material: data1.get('material'),
        }

        if (data.make.length >= 4 && data.model.length >= 4 && Number(data.year) >= 1950 && Number(data.year) <= 2050 && data.description.length >= 10 && Number(data.price) >= 0 && data.img) {
            let settings = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'X-Authorization': getAccessToken()
                },
                body: JSON.stringify(data)
            }

            await internalFetch(`http://localhost:3030/data/catalog/${id}`, settings)
            page('/')
        } else {
            alert('All required inputs should be filled!')
        }
    }
}

export async function deleteFurniture(id) {
    let settings = {method:"DELETE",headers:{'X-Authorization': getAccessToken()}}
    await internalFetch(`http://localhost:3030/data/catalog/${id}`, settings)
    page('/')
}