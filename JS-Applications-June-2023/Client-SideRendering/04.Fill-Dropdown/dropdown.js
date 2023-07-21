import { html, render } from '../node_modules/lit-html/lit-html.js'

let output = document.getElementById('menu')
let form = document.getElementsByTagName('form')[0]
form.addEventListener('submit', onsubmit)
let template = (x) => html`
    <option .value=${x._id}>${x.text}</option>
`
showElems()

async function showElems() {
    let x = await loadElems()
    let y = Object.values(x)

    let readyForRender = (y) => html`${y.map(x => template(x))}`
    render(readyForRender(y), output)
}

async function onsubmit(e) {
    e.preventDefault()

    let text = document.getElementById('itemText').value

    let data = {
        text: text
    }
    let settings = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }

    await fetch('http://localhost:3030/jsonstore/advanced/dropdown', settings)
    showElems()
}

async function loadElems() {
    let x = await fetch('http://localhost:3030/jsonstore/advanced/dropdown')
    let y = await x.json()
    return y
}