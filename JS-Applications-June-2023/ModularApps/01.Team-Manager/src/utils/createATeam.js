import { internalFetch } from "../api/fetch.js";
import { html, render, page } from "../api/loadLibs.js";
import { getAccessToken } from "../api/sessionStorageController.js";

let template = (createHandler) => html`<section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form id="create-form" class="main-form pad-large">
                        <div class="error" style="display: none" id="error">Error message.</div>
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team" @click=${createHandler}>
                    </form>
                </article>
            </section>`
let output = document.getElementById('main')
export function showCreate() {
    render(template(createHandler), output)
}

async function createHandler(e) {
    e.preventDefault()
    let form = document.getElementById('create-form')
    let data1 = new FormData(form)

    let data = {
        name: data1.get('name'),
        logoUrl: data1.get('logoUrl'),
        description: data1.get('description')
    }

    if(data.name.length >= 4 && data.logoUrl && data.description.length >= 10) {
        let settings = {
            method:'POST',
            headers: {'Content-type': 'application/json', 'X-Authorization': getAccessToken()},
            body: JSON.stringify(data)
        }

        let x = await internalFetch('http://localhost:3030/data/teams', settings)
        await onclickJoin(x._id)
        form.reset()
        // IT NEEDS TO REDIRECT TO TEAM DETAILS
        page(`/${x._id}`)
    } else {
        document.getElementById('error').style.display = 'block'
    }
}

async function onclickJoin(id) {
    let data = {
        teamId: id
    }
    let settings = {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'X-Authorization': getAccessToken() },
        body: JSON.stringify(data)
    }

    let x = await internalFetch(`http://localhost:3030/data/members`, settings)
    await approveHandler(x._id)
}

async function approveHandler(id) {
    let data = {
        'status': 'member'
    }
    let settings = {
        method: "PUT",
        headers: { 'Content-type': 'application/json', 'X-Authorization': getAccessToken() },
        body: JSON.stringify(data)
    }

    await internalFetch(`http://localhost:3030/data/members/${id}`, settings)
}