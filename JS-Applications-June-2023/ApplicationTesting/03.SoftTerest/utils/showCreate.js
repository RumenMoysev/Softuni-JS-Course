import { internalFetch } from "./fetch.js"
import { getAccessToken } from "./sessionStorage.js"
import { loadElems, showHide } from "./showHide.js"

let createPage = document.getElementById('createIdea')
let form = createPage.getElementsByClassName("form-idea col-md-5")[0]
let dashboard = document.getElementsByClassName('nav-link')[0]

export function showCreate() {
    console.log('create page')
    loadElems()
    showHide(createPage)

    form.addEventListener('submit', getData)
}

async function getData(e) {
    e.preventDefault()
    let formData = new FormData(form)

    let data = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageURL')
    }

    if(data.title.length >=6 && data.description.length >=10 && data.img.length >=5) {
        await postIdea(data)
        dashboard.click()
    }
}

async function postIdea(data) {
    let settings = {
        method: 'POST',
        headers: {'Content-type': 'application/json',
                'X-Authorization': getAccessToken()},
        body: JSON.stringify(data)
    }

    let url = 'http://localhost:3030/data/ideas'

    await internalFetch(url, settings)
}