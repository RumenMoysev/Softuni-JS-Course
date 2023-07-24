import { html, page } from "../api/loadLibs.js";

let temp = (data, internalFetch, accessToken) => html`<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                value=${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                value=${data.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${data.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              value=${data.date}
            />

              <button type="submit" @click=${(e) => editHandler(e,internalFetch,accessToken, data._id)}>Edit</button>
            </form>
          </div>
        </section>`

export async function showEdit(ctx) {
    let data = await ctx.internalFetch(`/data/events/${ctx.params.id}`)
    ctx.render(temp(data, ctx.internalFetch, ctx.accessToken))
}

async function editHandler(e, internalFetch, accessToken, id ) {
    e.preventDefault()
    console.log(id)
    let form = document.querySelector('.edit-form')

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
            method:'PUT', 
            headers: {'Content-type':'application/json', 'X-Authorization': accessToken},
            body:JSON.stringify(data)
        }

        try {
            await internalFetch(`/data/events/${id}`, settings)
            form.reset()
            page(`/${id}`)
        } catch(e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs')
    }
}