import { html, page } from "../api/loadLibs.js";

let temp = (addHandler, internalFetch, accessToken) => html`<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit" @click=${(e) => addHandler(e, internalFetch, accessToken)}>Add</button>
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
        category: data1.get('category'),
        description: data1.get('description'),
        date: data1.get('date')
    }

    if (data.name && data.imageUrl && data.description && data.category && data.date) {
        let settings = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'X-Authorization': accessToken },
            body: JSON.stringify(data)
        }

        try {
            await internalFetch('/data/events', settings)
            form.reset()
            page('/dashboard')
        } catch (e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs')
    }
}