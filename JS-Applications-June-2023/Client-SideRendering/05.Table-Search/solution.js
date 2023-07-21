import { html, render } from '../node_modules/lit-html/lit-html.js'

solve()
async function solve() {
   document.getElementById('searchBtn').addEventListener('click', onClick);
   let search = document.getElementById('searchField')
   await displayElems()

   async function onClick() {
      
      let search1 = search.value.toLowerCase()
      searchForMatch(search1)


   }

   function searchForMatch(search) {
      let data = document.getElementsByTagName('tbody')[0].children

      if(search) {
         for(let el of Array.from(data)) {
            if(el.classList.contains('select')) {
               el.classList.remove('select')
            }
            let isFound = false
            for(let el1 of Array.from(el.children)) {
               if(el1.textContent.toLowerCase().includes(search)) {
                  isFound = true
                  break;
               }
            }

            if(isFound) {
               el.classList.add('select')
            }

         }
      }
      
   }

   async function displayElems() {
      let data = Object.values(await loadElems())

      let output = document.getElementById('tbody')
      
      let template = (data) => html`
         <tr>
            <td>${data.firstName} ${data.lastName}</td>
            <td>${data.email}</td>
            <td>${data.course}</td>
         </tr> `

      let readyToRender = (data) => html`${data.map(x => template(x))}`

      render(readyToRender(data), output)
   }

   async function loadElems() {
      let response = await fetch('http://localhost:3030/jsonstore/advanced/table')
      return await response.json()
   }
}