import { html, render } from '../node_modules/lit-html/lit-html.js'

let form = document.querySelector('.content')
form.addEventListener('submit', onclick)
let root = document.getElementById('root')

function onclick(e) {
    e.preventDefault()

    let formData = new FormData(form)
    let data = formData.get('towns')

    let arrOfData = data.split(', ')

    let template = (el) => html`
        <li>${el}</li>
    `
    let templateForRender = (arrOfData) => html`
    <ul>
        ${arrOfData.map(x => template(x))}
    </ul>
    `

    render(templateForRender(arrOfData), root)
}   