import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { getUserId, isUserLoggedIn } from "../api/sessionStorageController.js";
import { notOwnerDetails, ownerDetails } from "../templates/detaisTemps.js";
import { deleteHandler } from "./delete.js";

let searchTemp = (searchHandler) => html`<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit" @click = ${searchHandler}>Search</button>
          </form>
          <h3>Results:</h3>
</section>`

let itemTemp = (data) => html`<li class="card">
                <img src="${data.imageUrl}" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${data.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${data.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
                <a class="details-btn" href="${data._id}">Details</a>
              </li>`

let notLoggedTemp = (data) => html`<li class="card">
                <img src="${data.imageUrl}" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${data.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${data.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
              </li>`
let output = document.getElementById('main')
export function showSearch() {
    render(searchTemp(searchHandler), output)
}

async function searchHandler(e) {
    e.preventDefault()
    let form = document.querySelector('.search-wrapper.cf')
    let value = form.getElementsByTagName('input')[0].value
    if(value) {
        let settings = {method:'GET'}

        let response = await internalFetch(`http://localhost:3030/data/shoes?where=brand%20LIKE%20%22${value}%22`, settings)

        if(response.length > 0) {

            if(isUserLoggedIn()) {
                let readyTemp = (data) => html`<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3><div id="search-container">
            <ul class="card-wrapper">
            ${data.map(x => itemTemp(x))}
            </ul>
            </div>
            </section>`
                render(readyTemp(response), output)
        
            } else {
                let readyTemp = (data) => html`
                <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit" @click = ${searchHandler}>Search</button>
          </form>
          <h3>Results:</h3><div id="search-container">
            <ul class="card-wrapper">
            ${data.map(x => notLoggedTemp(x))}
            </ul>
            </div>
            </section>`
                render(readyTemp(response), output)
            }
        } else {
            let readyTemp = () => html`<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit" @click = ${searchHandler}>Search</button>
          </form>
          <h3>Results:</h3>
          <h2>There are no results found.</h2>
            </section>`

            render(readyTemp(), output)
        }
    }
}