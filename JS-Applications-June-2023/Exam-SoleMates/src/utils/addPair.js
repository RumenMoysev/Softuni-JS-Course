import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { page } from "../api/loadLibs.js";
import { getAccessToken } from "../api/sessionStorageController.js";

let template = (addHandler) => html`<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit" @click = ${addHandler}>post</button>
            </form>
          </div>
        </section>`
let output = document.getElementById('main')
export function showAdd() {
    render(template(addHandler), output)
}

async function addHandler(e) {
    e.preventDefault()

    let form = document.querySelector('.create-form')
    let data1 = new FormData(form)

    let data = {
        brand: data1.get('brand'),
        model: data1.get('model'),
        imageUrl: data1.get('imageUrl'),
        release: data1.get('release'),
        designer: data1.get('designer'),
        value: data1.get('value')
    }

    if(data.brand && data.model && data.imageUrl && data.release && data.designer && data.value) {
        let settings = {
            method: 'POST',
            headers: {'Content-type':'application/json','X-Authorization': getAccessToken()},
            body: JSON.stringify(data)
        }

        await internalFetch('http://localhost:3030/data/shoes', settings)
        page('/dashboard')
    } else {
        alert('Please fill all inputs.')
    }

}