import { internalFetch } from "../api/fetch.js";
import { html, render, page } from "../api/loadLibs.js";
import { getAccessToken, getUserId, getUsername, isUserLoggedIn } from "../api/sessionStorageController.js";

let template = (data, editHandler, id) => html`<section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form id="edit-form" class="main-form pad-large">
                        <div class="error" style='display: none' id='error'>Error message.</div>
                        <label>Team name: <input type="text" name="name" value=${data.name} ></label>
                        <label>Logo URL: <input type="text" name="logoUrl" value=${data.logoUrl} ></label>
                        <label>Description: <textarea name="description" .value=${data.description} ></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes" @click=${(e) => editHandler(e, id)}>
                    </form>
                </article>
            </section>`

let output = document.getElementById('main')

export async function showEdit(ctx) {
    let data = await getTeam(ctx.params.id)
    render(template(data, editHandler, ctx.params.id), output)
}

async function editHandler(e, id) {
    e.preventDefault()
    let form = document.getElementById('edit-form')
    let data1 = new FormData(form)

    let data = {
        name: data1.get('name'),
        logoUrl: data1.get('logoUrl'),
        description: data1.get('description')
    }

    if (data.name.length >= 4 && data.logoUrl && data.description.length >= 10) {
        let settings = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'X-Authorization': getAccessToken() },
            body: JSON.stringify(data)
        }

        await internalFetch(`http://localhost:3030/data/teams/${id}`, settings)
        form.reset()
        page(`/${id}`)
    } else {
        document.getElementById('error').textContent = 'Please fill all inputs'
        document.getElementById('error').style.display = 'block'
    }
}

function getTeam(id) {
    let settings = { method: "GET" }
    return internalFetch(`http://localhost:3030/data/teams/${id}`, settings)
}