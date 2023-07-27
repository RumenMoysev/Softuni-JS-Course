import { html, page } from "../api/loadLibs.js";

const template = (data, isUserLoggedIn, userId, internalFetch, accessToken, donations, hasUserDonated) => html`<section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src="${data.image}" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${data.name}</h1>
        <h3>Breed: ${data.breed}</h3>
        <h4>Age: ${data.age}</h4>
        <h4>Weight: ${data.weight}</h4>
        <h4 class="donation">Donation: ${100*donations}$</h4>
      </div>
      ${!isUserLoggedIn 
      ? null
      : !hasUserDonated ? html `<div class="actionBtn">
        ${userId == data._ownerId
        ? html `<a href="${data._id}/edit" class="edit">Edit</a>
        <a href="javascript:void(0)" class="remove" @click=${(e) => deleteHandler(internalFetch, data._id, accessToken)}>Delete</a>`
        : html`<a href="javascript:void(0)" class="donate" @click =${(e) => donateHandler(e, internalFetch, data._id, accessToken)}>Donate</a>`
        } 
      </div>`
      : null
    }
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
    let data = await getData(ctx.internalFetch, ctx.params.id)
    let donations = await getDonations(ctx.internalFetch, ctx.params.id)
    let hasUserDonated1 = await hasUserDonated(ctx.internalFetch, ctx.params.id, ctx.userId)
    ctx.render(template(data, ctx.isUserLoggedIn, ctx.userId, ctx.internalFetch, ctx.accessToken, donations, hasUserDonated1))
}

async function hasUserDonated(internalFetch, id, userId) {
    const response = await internalFetch(
      `/data/donation?where=petId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);

    return response > 0 ? true : false
}

async function donateHandler(e, internalFetch, id, accesstoken) {
  let settings = {
    method:"POST",
    headers: {'Content-type': 'application/json', 'X-Authorization': accesstoken},
    body: JSON.stringify({'petId': id})
  }

  await internalFetch("/data/donation", settings);
  e.target.parentElement.remove()
  page(`/${id}`)
}

function getDonations(internalFetch, id) {
    return internalFetch(
      `/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`
    );
}

async function deleteHandler(internalFetch, id, accesstoken) {
    if(confirm('Are you sure you want to delete your pet?')) {
        let settings = {
            method:'DELETE',
            headers:{'X-Authorization': accesstoken}
        }

        internalFetch(`/data/pets/${id}`, settings);
        page('/')
    }
}

function getData(internalFetch, id) {
    return internalFetch(`/data/pets/${id}`);
}