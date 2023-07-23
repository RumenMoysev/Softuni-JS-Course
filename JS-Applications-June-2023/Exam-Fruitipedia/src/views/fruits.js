import { html } from "../api/loadLibs.js";

let fruitTemp = (fruit) => html`<div class="fruit">
            <img src="${fruit.imageUrl}" alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="${fruit._id}">More Info</a>
          </div>`

export function showFruits(ctx) {
    displayFruits(ctx.internalFetch, ctx.render)
}

async function displayFruits(internalFetch,render) {
    let fruits = await getFruits(internalFetch)

    if(fruits.length > 0) {
        let readyTemp = (fruits) => html`<h2>Fruits</h2>
        <section id="dashboard">
        ${fruits.map(x => fruitTemp(x))}
    </section>
    </h2>`

    render(readyTemp(fruits))
    } else {
        let readyTemp = () => html`<h2>Fruits</h2>
        <h2>No fruit info yet.</h2>`
        render(readyTemp())
    }
}

function getFruits(internalFetch) {return internalFetch('/data/fruits?sortBy=_createdOn%20desc')}