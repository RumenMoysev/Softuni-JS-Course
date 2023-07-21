import { homePage } from "./home.js"

export function showHide(element) {
    document.querySelectorAll('.view-section')
    .forEach((x) => x.style.display = 'none')

    element.style.display = 'block'
}

export function correctNavBar() {
    if(sessionStorage.getItem('user')) {

        document.getElementById('welcome-msg').textContent = 'Welcome, ' + JSON.parse(sessionStorage.getItem('user')).email
        document.querySelectorAll('.guest')
        .forEach((x) => x.style.display = 'none')

        document.querySelectorAll('.user')
        .forEach((x) => x.style.display = 'inline-block')

    } else {
        document.querySelectorAll('.user')
        .forEach((x) => x.style.display = 'none')

        document.querySelectorAll('.guest')
        .forEach((x) => x.style.display = 'inline-block')
    }
}

export function onclickAddMovie(e) {
    e.preventDefault()
    let addMovieSection = document.getElementById('add-movie')

    showHide(addMovieSection)

    let form = document.getElementById('add-movie-form')
    form.addEventListener('submit', onclickSumbit)   

    async function onclickSumbit(e) {
        e.preventDefault()

        let formData = new FormData(form)

        let movieData = {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('img')
        }

        if(movieData.description && movieData.img && movieData.title) {
            let settings = {
                method: 'POST',
                headers: {'Content-type': 'application/json',
            'X-Authorization': JSON.parse(sessionStorage.getItem('user')).accessToken},
                body: JSON.stringify(movieData)
            }

            await fetch('http://localhost:3030/data/movies', settings)
            form.reset()
            homePage()
        }else if(!movieData.title) {
            alert('You need to provide a title!')
        } else if(!movieData.description) {
            alert('You need to provide a description!')
        } else if(!movieData.img) {
            alert('You need to provide an image url!')
        }
    }
    
}

export function createElement1(type, text, parent, className) {
    let element = document.createElement(type)
    element.textContent = text

    if(text !== undefined) {
        element.textContent = text
    }
  
    if(className !== undefined) {
      element.className = (className)
    }
    parent.appendChild(element)
  
    return element
}