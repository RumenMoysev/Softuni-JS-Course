import { showNav } from "./showCorrectNav.js"
let allElements = []
let footer = document.querySelector('.footer')

export function showHide(element) {
    document.querySelectorAll('.viewSection')
    .forEach((x) => x !== element  ? allElements.push(x) && x.remove(): null)
    showNav()
}       

export function loadElems() {
    let body = document.getElementById('body')
    footer.remove()

    for(let el of allElements) {
        body.appendChild(el)
    }
    body.appendChild(footer)
}