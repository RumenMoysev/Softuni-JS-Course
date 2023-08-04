import { html, page } from "../api/loadLibs.js";

let temp = (
  data,
  isUserLoggedIn,
  userId,
  internalFetch,
  accessToken,
  likes,
  hasUserLiked1,
  likeHandler,
  deleteHandler
) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${data.imageUrl}" alt="example1" />
    <p id="details-category">${data.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">${data.description}</p>
        <p id="more-info">${data.moreInfo}</p>
      </div>

      <h3>Likes:<span id="likes">${likes}</span></h3>

      <!--Edit and Delete are only for creator-->
      ${!isUserLoggedIn
        ? null
        : !hasUserLiked1
        ? html`<div id="action-buttons">
            ${userId == data._ownerId
              ? html`
                  <a href="/${data._id}/edit" id="edit-btn">Edit</a>
                  <a
                    href="javascript:void(0)"
                    id="delete-btn"
                    @click=${(e) =>
                      deleteHandler(internalFetch, data._id, accessToken)}
                    >Delete</a
                  >
                `
              : html`
                  <a
                    href=""
                    id="like-btn"
                    @click=${(e) =>
                      likeHandler(e, internalFetch, data._id, accessToken)}
                    >Like</a
                  >
                `}
          </div>`
        : null}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  let data = await getData(ctx.internalFetch, ctx.params.id);
  let likes = await getLikes(ctx.internalFetch, ctx.params.id);
  let hasUserLiked1 = await hasUserLiked(
    ctx.internalFetch,
    ctx.params.id,
    ctx.userId
  );

  ctx.render(
    temp(
      data,
      ctx.isUserLoggedIn,
      ctx.userId,
      ctx.internalFetch,
      ctx.accessToken,
      likes,
      hasUserLiked1,
      likeHandler,
      deleteHandler
    )
  );
}

async function hasUserLiked(internalFetch, id, userId) {
  let response = await internalFetch(
    `/data/likes?where=factId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );

  return response > 0 ? true : false;
}

function getLikes(internalFetch, id) {
  return internalFetch(
    `/data/likes?where=factId%3D%22${id}%22&distinct=_ownerId&count`
  );
}

async function likeHandler(e, internalFetch, id, accessToken) {
  let settings = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ factId: id }),
  };

  await internalFetch("/data/likes", settings);
  e.target.parentElement.remove();
  page(`/${id}`);
}

async function deleteHandler(internalFetch, id, accesstoken) {
  let response = confirm("Are you sure you want to delete your fact?");
  if (response) {
    let settings = {
      method: "DELETE",
      headers: { "X-Authorization": accesstoken },
    };

    await internalFetch(`/data/facts/${id}`, settings);
    page("/facts");
  }
}

function getData(internalFetch, id) {
  return internalFetch(`/data/facts/${id}`);
}
