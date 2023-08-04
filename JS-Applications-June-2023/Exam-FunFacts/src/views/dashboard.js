import { html } from "../api/loadLibs.js";

let temp = (data) => html`<div class="fact">
  <img src="${data.imageUrl}" alt="example1" />
  <h3 class="category">${data.category}</h3>
  <p class="description">${data.description}</p>
  <a class="details-btn" href="/${data._id}">More Info</a>
</div>`;

export function showDashboard(ctx) {
    displayDashboard(ctx.render, ctx.internalFetch)
}

async function displayDashboard(render, internalFetch) {
    let data = await internalFetch("/data/facts?sortBy=_createdOn%20desc");
    if(data.length>0) {
        let readyTemp = (data) => html`<h2>Fun Facts</h2>
          <section id="dashboard">
          ${data.map(x => temp(x))}
        </section>`;

        render(readyTemp(data))
    } else {
        let readyTemp = html`<h2>Fun Facts</h2>
         <h2>No Fun Facts yet.</h2>`;

         render(readyTemp)
    }
}
