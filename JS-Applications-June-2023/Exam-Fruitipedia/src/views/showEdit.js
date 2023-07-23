import { html, page } from "../api/loadLibs.js";

let temp = (data, editHandler, internalFetch ,id, accessToken) => html`<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                value=${data.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${data.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${data.nutrition}
              ></textarea>
              <button type="submit" @click= ${(e) => editHandler(e, internalFetch, id, accessToken)}>post</button>
            </form>
          </div>
        </section>` 

export async  function showEdit(ctx) {
    let data = await getDetails(ctx.params.id, ctx.internalFetch)
    ctx.render(temp(data, editHandler, ctx.internalFetch, ctx.params.id, ctx.accessToken))
}

async function editHandler(e, internalFetch, id, accessToken) {
    e.preventDefault()
    let form = document.querySelector('.edit-form')

    let data1 = new FormData(form)
    let data = {
        name: data1.get('name'),
        imageUrl: data1.get('imageUrl'),
        description: data1.get('description'),
        nutrition: data1.get('nutrition'),
    }

    if (data.name && data.imageUrl && data.description && data.nutrition) {
        let settings = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'X-Authorization': accessToken },
            body: JSON.stringify(data)
        }

        try {
            await internalFetch(`/data/fruits/${id}`, settings)
            form.reset()
            page(`/${id}`)
        } catch (e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs')
    }
}

function getDetails(id, internalFetch) {
    return internalFetch(`/data/fruits/${id}`)
}