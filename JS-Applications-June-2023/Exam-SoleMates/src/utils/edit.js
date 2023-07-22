import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { getAccessToken } from "../api/sessionStorageController.js";
import { page } from "../api/loadLibs.js";

let editTemp = (data, editHandler) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value = ${data.brand}
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value=${data.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value=${data.imageUrl}
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value=${data.release}
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value=${data.designer}
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value=${data.value}
              />

              <button type="submit" @click=${editHandler}>post</button>
            </form>
          </div>
        </section>`
let output = document.getElementById('main')
let id
export function showEdit(ctx) {
    id=ctx.params.id
    displayEdit(ctx.params.id)
}

async function displayEdit(id) {
    let response = await getDetails(id)
    render(editTemp(response, editHandler), output)
}

async function editHandler(e) {
    e.preventDefault()
    let form = document.querySelector('.edit-form')
    let data1 = new FormData(form)

    let data = {
        brand: data1.get('brand'),
        model: data1.get('model'),
        imageUrl: data1.get('imageUrl'),
        release: data1.get('release'),
        designer: data1.get('designer'),
        value: data1.get('value')
    }

    if (data.brand && data.model && data.imageUrl && data.release && data.designer && data.value) {
        let settings = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'X-Authorization': getAccessToken() },
            body: JSON.stringify(data)
        }

        await internalFetch(`http://localhost:3030/data/shoes/${id}`, settings)
        page(`/${id}`)
    } else {
        alert('Please fill all inputs.')
    }
}

function getDetails(id) {
    let settings = { method: "GET" }
    return internalFetch(`http://localhost:3030/data/shoes/${id}`, settings)
}