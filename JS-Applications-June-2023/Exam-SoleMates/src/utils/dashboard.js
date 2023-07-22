import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";

let shoesTemp = (data) => html`<li class="card">
              <img src="${data.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${data.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${data.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
              <a class="details-btn" href=${data._id}>Details</a>
            </li>`
let output = document.getElementById('main')
export function showDashboard() {
    displayDashboard()
}

async function displayDashboard() {
    let response = await getShoes()
    
    if(response.length >0) {
        let readyTemp = (data) => html`<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper"> ${data.map(x => shoesTemp(x))}
    </ul>
    </section>`

    render(readyTemp(response), output)
    } else {
        let readyTemp = html`<section id="dashboard">
          <h2>Collectibles</h2>
          <h2>There are no items added yet.</h2>
        </section>`
        render(readyTemp, output)
    }
}

function getShoes() {
    let settings = {method:'GET'}
    return internalFetch('http://localhost:3030/data/shoes?sortBy=_createdOn%20desc', settings)
}