import { createElement1 } from "./createElems.js"
import { internalFetch } from "./fetch.js"
import { loadElems, showHide } from "./showHide.js"
import { showDetails } from "./showIdeaDetails.js"

export let dashboard = document.getElementById('dashboard')
let dashboardHolder = document.getElementById('dashboard-holder')
export let details = document.getElementById('details')

export async function showDashboard() {
    for(let el of Array.from(dashboardHolder.children)) {
        el.remove()
    }
    let response = await loadIdeas()
    displayIdeas(response)
    loadElems()
    showHide(dashboard)
    loadIdeas()
}

async function displayIdeas(data) {
    if(Object.values(data).length > 0) {
        for(let el of Object.values(data)) {
            console.log(el)
            let mainDiv = createElement1('div', undefined, dashboardHolder,"card overflow-hidden current-card details")
            mainDiv.style.width = '20rem'
            mainDiv.style.height = '18rem'
            let div1 = createElement1('div', undefined, mainDiv, 'card-body')
            createElement1('p', `${el.title}`, div1, 'card-text')
            let img = createElement1('img', undefined, mainDiv, 'card-image')
            img.src = el.img
            img.alt = 'Card image cap'

            let a = createElement1('a', 'Details', mainDiv, 'btn')
            a.dataset.id = el._id
            //ADD EVENT LISTENER FOR DETAILS
            a.addEventListener('click', showDetails)
        }
    } else {
        createElement1('h1', 'No ideas yet! Be the first one :)', dashboardHolder)
    }
}

async function loadIdeas() {
    let settings = {
        method: 'GET'
    }
    let url = 'http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc'

    return await internalFetch(url, settings)
}