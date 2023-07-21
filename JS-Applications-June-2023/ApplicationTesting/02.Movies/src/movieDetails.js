import { homePage } from "./home.js"
import { getNumOfLikes, hasUserLikedAMovie, onclickLike } from "./likeFunc.js"
import { createElement1, showHide } from "./utilities.js"

export async function onClickDetails(e) {
    // if(sessionStorage.getItem('user')) {
        let button = e.target

        let movieId = e.target.dataset.id
        let ownerId = e.target.dataset.ownerId
        
        let detailsSection = document.getElementById('movie-example')

        showHide(detailsSection)
        getData(movieId, ownerId)
    // }
    
}

async function displayDetails(movieData, ownerId) {
    let x = document.getElementsByClassName('row bg-light text-dark')[0].children
    for(let el of Array.from(x)) {
        el.remove()
    }
    let movieId = movieData._id
    //MISTAKE USER SHOULD SEE DETAILS EVEN WHEN NOT LOGGED IN
    let accountId
    if(sessionStorage.getItem('user')) {
        accountId = JSON.parse(sessionStorage.getItem('user'))._id
    } else {
        accountId = undefined
    }
    
    console.log(movieId)

    let output = document.getElementsByClassName('row bg-light text-dark')[0]
    createElement1('h1', `Movie title: ${movieData.title}`, output)
    let div1 = createElement1('div', undefined, output, 'col-md-8')
    let img = createElement1('img', undefined, div1, 'img-thumbnail')
    img.src = movieData.img
    img.alt = 'Movie'

    let div2 = createElement1('div', undefined, output, 'col-md-4 text-center')
    createElement1('h3', 'Movie Description', div2, 'my-3')
    createElement1('p', `${movieData.description}`, div2)
    if(accountId == movieData._ownerId) {
        let btnDelete = createElement1('a', 'Delete', div2, 'btn btn-danger')
        btnDelete.dataset.id = movieId
        let btnEdit = createElement1('a', 'Edit', div2, 'btn btn-warning')
        btnEdit.dataset.id = movieId
        createElement1('span', `Liked ${await getNumOfLikes(movieId)}`, div2, 'enrolled-span')

        btnDelete.addEventListener('click', onclickDelete)
        btnEdit.addEventListener('click', onclickEdit)
    } else if(accountId == undefined){
        createElement1('span', `Liked ${await getNumOfLikes(movieId)}`, div2, 'enrolled-span')
    }
    else{
        if(!await hasUserLikedAMovie(movieId)) {
            let btnLike = createElement1('a', 'Like', div2, 'btn btn-primary')
            btnLike.dataset.id = movieId
            btnLike.addEventListener('click', onclickLike)
            createElement1('span', `Liked ${await getNumOfLikes(movieId)}`, div2, 'enrolled-span')
        } else {
            createElement1('span', `Liked ${await getNumOfLikes(movieId)}`, div2, 'enrolled-span')
        }
    }
        
        
    
}   

async function onclickEdit(e) {
    e.preventDefault()
    let id = e.target.dataset.id
    let editPage = document.getElementById('edit-movie')
    showHide(editPage)
    
    let data = await getDetails(id)
    editPage.getElementsByClassName('form-control')[0].value = data.title
    editPage.getElementsByClassName('form-control')[1].value = data.description
    editPage.getElementsByClassName('form-control')[2].value = data.img

    let form = editPage.getElementsByClassName('text-center border border-light p-5')[0]
    
    form.addEventListener('submit', onsubmit)

    async function onsubmit(e) {
        e.preventDefault()

        let formData = new FormData(form)
        let updatedMovie = {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('img')
        }

        console.log(updatedMovie.title)

        if(updatedMovie.title && updatedMovie.description && updatedMovie.img) {
            await updateDetails(id, JSON.parse(sessionStorage.getItem('user')).accessToken, updatedMovie)
            getData(id)
            homePage()
        }
    }
    
}

async function onclickDelete(e) {
    let id = e.target.dataset.id
    let url = `http://localhost:3030/data/movies/${id}`

    let settings = {
        method: 'DELETE',
        headers: {'X-Authorization': JSON.parse(sessionStorage.getItem('user')).accessToken}
    }
    
    await fetch(url, settings)
    homePage()
}
async function updateDetails(movieId, accessToken, data) {
    console.log('a')
    let settings = {
        method: 'PUT', 
        headers: {'Content-type': 'application/json',
        'X-Authorization': accessToken},
        body: JSON.stringify(data)
    }
    let url = `http://localhost:3030/data/movies/${movieId}`

    await fetch(url, settings)
}

async function getDetails(movieId) {
    let url = `http://localhost:3030/data/movies/${movieId}`

    let x = await fetch(url)
    let response = await x.json()

    return response
}

export async function getData(movieId, ownerId) {
    let url = `http://localhost:3030/data/movies/${movieId}`

    let x = await fetch(url)
    let response = await x.json()

    displayDetails(response, ownerId)
}