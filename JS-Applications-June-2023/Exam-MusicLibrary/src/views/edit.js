import { html, page } from "../api/loadLibs.js";

let editTemp = (data, editHandler, internalFetch, accessToken, id) => html`<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form">
            <input type="text" name="singer" id="album-singer" value=${data.singer} placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" value=${data.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${data.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" value=${data.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" value=${data.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${data.sales} />

            <button type="submit" @click=${(e) => editHandler(e, internalFetch, accessToken, id)}>post</button>
          </form>
        </div>
      </section>`

export async  function showEdit(ctx) {
    ctx.render(editTemp(await getAlbumDetails(ctx.internalFetch, ctx.params.id), editHandler ,ctx.internalFetch, ctx.accessToken, ctx.params.id))
}

async function editHandler(e, internalFetch, accessToken, id) {
    e.preventDefault()

    let form = document.querySelector('.edit-form')
    let data1 = new FormData(form)

    let data = {
        singer: data1.get('singer'),
        album: data1.get('album'),
        imageUrl: data1.get('imageUrl'),
        release: data1.get('release'),
        label: data1.get('label'),
        sales: data1.get('sales')
    }

    if (data.singer && data.album && data.imageUrl && data.release && data.label && data.sales) {
        let settings = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'X-Authorization': accessToken },
            body: JSON.stringify(data)
        }

        try {
            await internalFetch(`http://localhost:3030/data/albums/${id}`, settings)
            form.reset()
            page(`/${id}`)
        } catch (e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs')
    }
}

function getAlbumDetails(internalFetch, id) {
    let settings = { method: 'GET' }
    return internalFetch(`http://localhost:3030/data/albums/${id}`, settings)
}