import { createElement1 } from "./createElems.js"
import { internalFetch } from "./fetch.js"
import { getAccessToken, getUserId} from "./sessionStorage.js"
import {  details } from "./showDashboard.js"
import { loadElems, showHide } from "./showHide.js"

let dashboard = document.getElementsByClassName('nav-link')[0]
let detailsContainer = document.getElementsByClassName('container home some')[0]

export async function showDetails(e) {
    for(let el of Array.from(detailsContainer.children)) {
        el.remove()
    }

    let id = e.target.dataset.id

    loadElems()
    showHide(details)
    let response = await loadData(id)
    displayDetails(response, id)
}

async function displayDetails(data, id) {
    console.log(data)

    let img = createElement1('img', undefined, detailsContainer, 'det-img')
    img.src = data.img
    let div1 = createElement1('div',undefined, detailsContainer, 'desc')
    createElement1('h2', `${data.title}`, div1, 'display-5')
    createElement1('p', 'Description:', div1, 'infoType')
    createElement1('p', `${data.description}`, div1, 'idea-description')

    let div2 = createElement1('div', undefined, detailsContainer, 'text-center')
    if(getUserId() == data._ownerId) {
        let a = createElement1('a', 'Delete', div2, 'btn detb')
        a.dataset.id = id
        a.addEventListener('click', onclickDelete)
    }
}

async function loadData(id) {
    let settings = {
        method: 'GET'
    }

    let url = `http://localhost:3030/data/ideas/${id}`

    return await internalFetch(url, settings)
}

async function onclickDelete(e) {
    let id = e.target.dataset.id

    let settings = {
        method: 'DELETE', 
        headers: {'X-Authorization': getAccessToken()}
    }

    let url = `http://localhost:3030/data/ideas/${id}`
    await internalFetch(url, settings)

    dashboard.click()
}