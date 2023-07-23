import { html, render } from "../api/loadLibs.js";

let temp = (data) => html`<div class="fruit">
            <img src="${data.imageUrl}" alt="example1" />
            <h3 class="title">${data.name}</h3>
            <p class="description">${data.description}</p>
            <a class="details-btn" href="/${data._id}">More Info</a>
        </div>`

let seatch = (seatchHandler,internalFetch, render) => html`<section id="search">

        <div class="form">
          <h2>Search</h2>
          <form class="search-form">
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list" @click=${(e) => seatchHandler(e,internalFetch)}>Search</button>
          </form>
        </div>
        <h4>Results:</h4>
        <div class="search-result"></div>
</section>`
export function showSearch(ctx) {
    ctx.render(seatch(displaySearch, ctx.internalFetch, ctx.render))
}

async function displaySearch(e, internalFetch) {
    e.preventDefault()
    let parameter = document.getElementById('search-input').value
    let response = await internalFetch(`/data/fruits?where=name%20LIKE%20%22${parameter}%22`)
    if(response.length>0) {
        let output = document.querySelector('.search-result')
        let readyTemp = (response) => html`${response.map(x => temp(x))}`
        render(readyTemp(response), output)
    } else {
        let output = document.querySelector('.search-result')
        let readyTemp = () => html`<p class="no-result">No result.</p>`
        render(readyTemp(), output)
    }
}