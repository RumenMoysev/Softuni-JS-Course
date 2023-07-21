import { onClickDetails } from "./movieDetails.js"
import { correctNavBar, showHide, createElement1, onclickAddMovie } from "./utilities.js"

let addMovieBtn = document.getElementById('add-movie-button')
addMovieBtn.addEventListener('click', onclickAddMovie)

export function homePage() {
    console.log('home page')

    let homeSection = document.getElementById('home-page')

    showHide(homeSection)
    correctNavBar()
    loadMovies()
}

function displayMovies(moviesData) {
    let output = document.getElementById('movies-list')
    for(let el of Array.from(output.children)) {
        el.remove()
    }

    for(let el of Object.values(moviesData)) {
        let li = createElement1('li', undefined, output, 'card mb-4')
        let img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = el.img
        img.alt = 'Card image cap'
        img.style.width = '400'
        li.appendChild(img)

        let div = createElement1('div', undefined, li, 'card-body')
        createElement1('h4', `${el.title}`, div, 'card-title')
        let a = document.createElement('a')
        // a.href = `/details/${el._id}`
        let btn = document.createElement('button')
        btn.dataset.id = el._id
        btn.dataset.ownerId = el._ownerId
        btn.type = 'button'
        btn.className = 'btn btn-info'
        btn.textContent = 'Details'
        //ADD EVENT LISTENER FOR DETAILS
        btn.addEventListener('click', onClickDetails)
        
        a.appendChild(btn)
        div.appendChild(a)
        output.appendChild(li)
    }
}

async function loadMovies() {
    let url = 'http://localhost:3030/data/movies'

    let x = await fetch(url)
    let response = await x.json()

    displayMovies(response)
}