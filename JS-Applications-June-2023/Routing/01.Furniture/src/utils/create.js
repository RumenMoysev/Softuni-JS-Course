import { render } from "./test.js"
import { internalFetch } from "./fetch.js";
import {page} from "./test.js"
import { createFurnitureTemp } from "./templates.js";
import { getAccessToken } from "./sessionStorageController.js";

let output = document.getElementById('container')

export function showCreate() {
    render(createFurnitureTemp(createHandler), output)
}

async function createHandler(e) {
    e.preventDefault()
    let data1 = new FormData(document.getElementById('createForm'))
    let data = {
        make: data1.get('make'),
        model: data1.get('model'),
        year: data1.get('year'),
        description: data1.get('description'),
        price: data1.get('price'),
        img: data1.get('img'),
        material: data1.get('material'),
    }

    if(data.make.length >=4 && data.model.length >=4 && Number(data.year)>=1950 && Number(data.year) <=2050 && data.description.length >= 10 && Number(data.price) >=0 && data.img) {
        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json',
            'X-Authorization': getAccessToken()},
            body: JSON.stringify(data)
        }

        await internalFetch('http://localhost:3030/data/catalog', settings)
        page('/')
    } else {
        alert('All required inputs should be filled!')
    }
}   