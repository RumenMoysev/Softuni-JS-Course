import { html, render } from './node_modules/lit-html/lit-html.js'

let a = document.getElementById('gg')
function test() {
    function login(e) {
        e.preventDefault()
    }
    
    function register(e) {
        e.preventDefault()
    }
}
let niggers = ['Nigga1', 'Nigga2']

let niggaTemplate = (contact) => html`
    <a href = 'AbundaLaKaka'>GG: ${contact.name}</a>
    <p>Phone number: ${contact.phoneNumber}</p>
`
let niggersTemplate = (niggers) => html`
<main>
    ${niggers.map(x => niggaTemplate(x))}
</main>
`
    
render(niggersTemplate(niga), a)