import { html, render } from '../node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js'

let output = document.getElementById('allCats')

let template = (cat, show) => html`
    <li>
        <img src = "./images/${cat.imageLocation}.jpg" width = ${"250"} height = ${"250"} alt = ${"Cat Image"}>
        <div class="info">
                <button class="showBtn" @click=${(e) => show(e)}>Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
    </li>
`

let readyTemplate = (cats, show) => html`
<ul> 
    ${cats.map(x => template(x, show))}
</ul>
` 

render(readyTemplate(cats, show), output)

function show(e) {
    let element = e.target
   element.textContent = 'Hide status code'
   let div = element.parentElement.children[1]
   div.style.display = 'block'

   element.removeEventListener('click', show)
   element.addEventListener('click', hide)
}

function hide(e) {
    let element = e.target
    element.textContent = 'Show status code'
    let div = element.parentElement.children[1]
    div.style.display = 'none'

    element.removeEventListener('click', hide)
    element.addEventListener('click', show )
}