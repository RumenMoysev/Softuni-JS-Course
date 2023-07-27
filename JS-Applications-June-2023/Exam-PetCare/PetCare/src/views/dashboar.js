import { html } from "../api/loadLibs.js";

const temp = (data) => html`<div class="animals-dashboard">
  <div class="animals-board">
    <article class="service-img">
      <img class="animal-image-cover" src="${data.image}" />
    </article>
    <h2 class="name">${data.name}</h2>
    <h3 class="breed">${data.breed}</h3>
    <div class="action">
      <a class="btn" href="/${data._id}">Details</a>
    </div>
  </div>
</div>`;

export function showDashboard(ctx) {
    displayDashboard(ctx.render, ctx.internalFetch)
}

async function displayDashboard(render, internalFetch) {
    let data = await internalFetch('/data/pets?sortBy=_createdOn%20desc&distinct=name')

    if(data.length >0) {
        let readyTemp = (data) => html`
          <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
            ${data.map((x) => temp(x))}
            </div>
          </section>
        `;
        render(readyTemp(data))
    } else {
        let readyTemp = html`
          <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
              <div>
                <p class="no-pets">No pets in dashboard</p>
              </div>
            </div>
          </section>
        `;
        render(readyTemp)
    }
}   