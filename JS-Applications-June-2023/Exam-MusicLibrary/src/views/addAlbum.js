import { html, page } from "../api/loadLibs.js";

let temp = (addHandler, internalFetch, accessToken) => html`<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit" @click=${(e) => addHandler(e, internalFetch, accessToken)}>post</button>
          </form>
        </div>
      </section>`

export function showAdd (ctx) {ctx.render(temp(addHandler, ctx.internalFetch, ctx.accessToken))}

async function addHandler(e, internalFetch, accessToken) {
    e.preventDefault()
    let form = document.querySelector('.create-form')
    let data1 = new FormData(form)

    let data = {
        singer: data1.get('singer'),
        album: data1.get('album'),
        imageUrl: data1.get('imageUrl'),
        release: data1.get('release'),
        label: data1.get('label'),
        sales: data1.get('sales')
    }

    if(data.singer && data.album && data.imageUrl && data.release && data.label && data.sales) {
        let settings = {
            method:'POST',
            headers: {'Content-type':'application/json', 'X-Authorization': accessToken},
            body:JSON.stringify(data)
        }

        try{
            await internalFetch('http://localhost:3030/data/albums', settings)
            form.reset()
            page('/dashboard')
        }catch(e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs')
    }
}