import { html } from "../api/loadLibs.js";

const eventTemp = (event) => html`<div class="event">
            <img src="${event.imageUrl}" alt="example1" />
            <p class="title">
              ${event.name}
            </p>
            <p class="date">${event.date}</p>
            <a class="details-btn" href="${event._id}">Details</a>
          </div>`

export function showEvents(ctx) {diplayDashboard(ctx.render, ctx.internalFetch)}

async function diplayDashboard(render, internalFetch) {
    let data = await internalFetch('/data/events?sortBy=_createdOn%20desc')
    if(data.length>0) {
        let readyTemp = (events) => html`<h2>Current Events</h2>
        <section id="dashboard">
        ${events.map(x => eventTemp(x))}
        </section>`

        render(readyTemp(data))
    } else {
        let readyTemp = html`<h2>Current Events</h2>
        <section id="dashboard"><h4>No Events yet.</h4></section>`
        render(readyTemp)
    }
}