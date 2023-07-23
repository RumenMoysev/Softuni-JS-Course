import { html, page } from "../api/loadLibs.js";

let temp = (addHandler, internalFetch, accessToken) => html`<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit" @click=${(e) => addHandler(e, internalFetch, accessToken)}>Add Fruit</button>
            </form>
          </div>
        </section>`

export function showAdd(ctx) { ctx.render(temp(addHandler, ctx.internalFetch, ctx.accessToken)) }

async function addHandler(e, internalFetch, accessToken) {
    e.preventDefault()
    let form = document.querySelector('.create-form')
    let data1 = new FormData(form)

    let data = {
        name: data1.get('name'),
        imageUrl: data1.get('imageUrl'),
        description: data1.get('description'),
        nutrition: data1.get('nutrition'),
    }

    if (data.name && data.imageUrl && data.description && data.nutrition) {
        let settings = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'X-Authorization': accessToken },
            body: JSON.stringify(data)
        }

        try {
            await internalFetch('/data/fruits', settings)
            form.reset()
            page('/fruits')
        } catch (e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs')
    }
}