import {html, page} from '../api/loadLibs.js'

let template = (fruit, isOwner, id, deleteHandler, accessToken, internalFetch) => html`<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      ${fruit.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${isOwner ? html`<div id="action-buttons">
            <a href="${fruit._id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${(e) => deleteHandler(id, internalFetch, accessToken)}>Delete</a>
          </div>` : null}
            </div>
        </div>
      </section>`

export function showDetails(ctx) {displayDetails(ctx.params.id, ctx.internalFetch, ctx.userId, ctx.render, ctx.accessToken)}

async function displayDetails(id, internalFetch, userId, render, accessToken) {
    let response = await getDetails(id, internalFetch)
    let isOwner = response._ownerId == userId ? true : false
    render(template(response, isOwner, id, deleteFruit, accessToken, internalFetch))
}

function getDetails(id,internalFetch) {
    return internalFetch(`/data/fruits/${id}`)
}

async function deleteFruit(id, internalFetch, accessToken) {
    let settings = {method:'Delete',
    headers: {'X-Authorization': accessToken}}

    if(confirm('Are you sure you want to delete this fruit?')) {
        await internalFetch(`/data/fruits/${id}`, settings)
        page('/fruits')
    }
}