import { towns } from "./towns.js"
import { html, render } from '../node_modules/lit-html/lit-html.js'

let template = (town) => html`<li>${town}</li>`
let readyForRender = (towns) => html`<ul>${towns.map(x => template(x))}</ul>`
render(readyForRender(towns), document.getElementById('towns'))

document.getElementById('btn').addEventListener('click', search)

function search() {
   let text = document.getElementById('searchText').value

   let towns = document.getElementById('towns').children[0].children
   let count = 0
   for(let el of Array.from(towns)) {
      let textContent = el.textContent
      
      if(text && textContent.includes(text)) {
         el.classList.add('active')
         count++
      } else if(el.classList.contains('active')) {
         el.classList.remove('active')
      }
      document.getElementById('result').textContent = `${count} matches found`
   }

   document.getElementById('result').textContent = `${count} matches found`
}