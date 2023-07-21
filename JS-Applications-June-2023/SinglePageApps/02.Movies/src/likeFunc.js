import { getData } from "./movieDetails.js"

export async function onclickLike(e) {
    let id = e.target.dataset.id
    like(id)

    getData(id)
}

async function like(id) {
    await fetch(`http://localhost:3030/data/likes`, {
        method: 'POST',
        headers: {'Content-type': 'application/json',
    'X-Authorization': JSON.parse(sessionStorage.getItem('user')).accessToken},
        body: JSON.stringify({movieId: id})
    })
}

export async function hasUserLikedAMovie(movieId) {
    let userId = JSON.parse(sessionStorage.getItem('user'))._id

    let url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`

    let x = await fetch(url)
    let data = await x.json()
    let liked = false

    if(data.length >0) {
        for(let el of Object.values(data)) {
            if(el._ownerId == userId) {
                liked = true
            }
        }
    }
    return liked
}

export async function getNumOfLikes(movieId) {
    let x = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)
    let data = await x.json()

    return data
}