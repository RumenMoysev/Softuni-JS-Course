import { html } from "../api/loadLibs.js";

let elTemp = (data) => html`<li class="card">
            <img src="${data.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${data.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${data.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${data.sales}</span></p>
            <a class="details-btn" href="${data._id}">Details</a>
          </li>`

export function showDashboard(ctx) {displayDashboard(ctx)}

async function displayDashboard(ctx) {
    let data = await loadMusic(ctx.internalFetch)

    let readyTemp = (data) => html`<section id="dashboard">
         <h2>Albums</h2>
         ${data.length > 0 ? html `<ul class="card-wrapper">
         ${data.map(x => elTemp(x))}
     </ul>`
        : html`<h2>There are no albums added yet.</h2>`
     }
    </section>`

    ctx.render(readyTemp(data))
}

function loadMusic(internalFetch) {
    let settings = {method:'GET'}
    return internalFetch('http://localhost:3030/data/albums?sortBy=_createdOn%20desc', settings)
}