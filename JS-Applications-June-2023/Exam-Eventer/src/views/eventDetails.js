import { html, page } from "../api/loadLibs.js";

const temp = (data, userId,accessToken, internalFetch, goers, render, isGone) => html`<section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span
                  >${data.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${goers}</span> times.</h3>

            ${userId == undefined 
            ? null
            : isGone != true
              ? html`<div id="action-buttons">
                ${userId == data._ownerId 
                ? html`<a href="${data._id}/edit" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" @click=${(e) => deleteHandler(data._id, accessToken, internalFetch)}>Delete</a>`
                : html`<a href="javascript:void(0)" id="go-btn" @click=${(e) => go(e, data._id, accessToken, internalFetch, render, userId)}>Going</a>`}
            </div>`
            :null}
          </div>
        </section>`

export function showDetails(ctx) {
  displayDetails(ctx.render, ctx.internalFetch, ctx.params.id, ctx.userId, ctx.accessToken)
}

async function displayDetails(render, internalFetch, id, userId, accessToken) {
  let data = await internalFetch(`/data/events/${id}`)
  let goers = await getGoes(id, internalFetch)
  let isGone = await hasUserGone(id, userId, internalFetch)
  render(temp(data, userId, accessToken, internalFetch, goers, render, isGone))
}

async function go(e, id, accessToken, internalFetch, render, userId) {
  let settings = {
    method:"POST",
    headers:{'Content-type': 'application/json', 'X-Authorization': accessToken},
    body:JSON.stringify({'eventId': id})
  }

  await internalFetch('/data/going', settings)
  e.target.parentElement.remove()
  displayDetails(render, internalFetch, id, userId, accessToken)
}

async function hasUserGone(id, userId, internalFetch) {
  let x = await internalFetch(`/data/going?where=eventId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`)
  return x > 0 ? true : false
}

async function getGoes(id, internalFetch) {
  return internalFetch(`/data/going?where=eventId%3D%22${id}%22&distinct=_ownerId&count`)
}

async function deleteHandler(id, accessToken, internalFetch) {
  let settings = {
    method: "DELETE",
    headers: { 'X-Authorization': accessToken }
  }

  if (confirm('are you sure you wanna delete dis')) {
    await internalFetch(`/data/events/${id}`, settings)
    page('/dashboard')
  }
}