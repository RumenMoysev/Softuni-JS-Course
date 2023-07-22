import { html,page } from "../api/loadLibs.js";
import { getUserId, isUserLoggedIn } from "../api/sessionStorageController.js";

let temp = (data, deleteHandler, id, internalFetch, accessToken, likes, likeHandler) => html`<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

          ${isUserLoggedIn() ? html`<div id="action-buttons">
            ${data._ownerId == getUserId() ? html`
            <a href="${data._id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click = ${(e) =>deleteHandler(e, id, internalFetch, accessToken)}>Delete</a>`
  : html`<a href="" id="like-btn" @click=${(e) => likeHandler(e, id, internalFetch, accessToken)}>Like</a>`}
          </div>` : null}
        </div>
      </section>`

export function showDetails(ctx) {displayDetails(ctx)}

async function displayDetails(ctx) {
  let data = await getAlbumDetails(ctx.internalFetch, ctx.params.id)
  let likes = await getLikes(ctx.params.id, ctx.internalFetch)
  let isMovieLiked = await getIsMovieLiked(ctx.params.id, ctx.internalFetch)
  
  ctx.render(temp(data, deleteHandler, ctx.params.id, ctx.internalFetch, ctx.accessToken, likes, likeHandler))
  if (Number(isMovieLiked) > 0) {
    document.querySelector('#like-btn').remove()
  }
}

async function getIsMovieLiked(id, internalFetch) {
  let settings = {method:"GET"}
  return await internalFetch(`http://localhost:3030/data/likes?where=albumId%3D%22${id}%22%20and%20_ownerId%3D%22${getUserId()}%22&count`, settings)
}

async function likeHandler(e, id, internalFetch, accessToken) {
  let settings = {
    method:"POST",
    headers: {'X-Authorization': accessToken},
    body: JSON.stringify({albumId: id})
  }

  await internalFetch(`http://localhost:3030/data/likes`, settings)
  e.target.remove()
}

async function getLikes(id, internalFetch) {
  let settings = {method:'GET'}
  return internalFetch(`http://localhost:3030/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`, settings)
}

async function deleteHandler(e, id, internalFetch, accessToken) {
  e.preventDefault()
  if(confirm('Are you sure you want to delete this album?')) {
    let settings = {
      method:"DELETE",
      headers: {"X-Authorization": accessToken}
    }

    await internalFetch(`http://localhost:3030/data/albums/${id}`, settings)
    page('/dashboard')
  }
}

function getAlbumDetails(internalFetch, id) {
    let settings = {method:'GET'}
    return internalFetch(`http://localhost:3030/data/albums/${id}`, settings)
}