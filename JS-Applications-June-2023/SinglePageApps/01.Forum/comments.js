let x = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
let data = await x.json()

let topic

for(let el of Object.values(data)) {
    if(el._id == sessionStorage.getItem('id')) {
        topic = el
    }
}

let title = document.querySelector('.theme-name h2')
title.textContent = topic.title

let divComment = document.querySelector('.comment')
let divHeader = document.createElement('div')
divHeader.className = 'header'
let img = document.createElement('img')
img.src = './static/profile.png'
img.alt = 'avatar'
divHeader.appendChild(img)

let p = document.createElement('p')
p.innerHTML = `<span>${topic.username}</span> posted on `
createElement1('time', `${topic.date}`, p)
divHeader.appendChild(p)

createElement1('p', `${topic.post}`, divHeader, 'post-content')

divComment.appendChild(divHeader)
load()

let postButton = document.getElementById('postButton')
postButton.addEventListener('click', onclickPostComment)

function onclickPostComment(e) {
    e.preventDefault()
    let form  = new FormData(e.target.parentElement)

    let date = new Date()
    let commentData = {
        text: form.get('postText'),
        username: form.get('username'),
        id: sessionStorage.getItem('id'),
        time: date.toUTCString()
    }

    if(commentData.text && commentData.username) {
        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(commentData)
        }

        fetch('http://localhost:3030/jsonstore/collections/myboard/comments', settings)
        document.getElementById('comment').value = ''
        document.getElementById('username').value = ''
        load()
    }
}

async function load() {
    let x = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
    let data = await x.json()

    let output = document.querySelector('.comment')
    for(let el of Object.values(data)) {
        if(el.id === sessionStorage.getItem('id')) {
            let divUserC = document.createElement('div')
            divUserC.id = 'user-comment'

            let divTopicName = document.createElement('div')
            divTopicName.className = 'topic-name-wrapper'
            divUserC.appendChild(divTopicName)

            let divTopic = document.createElement('div')
            divTopic.className = 'topic-name'
            let p = document.createElement('p')
            p.innerHTML = `<strong>${el.username}</strong> commented on `
            createElement1('time', `${el.time}`, p)
            divTopic.appendChild(p)

            let divLast = document.createElement('div')
            divLast.className = 'post-content'
            createElement1('p', `${el.text}`, divLast)
            divTopic.appendChild(divLast)

            divTopicName.appendChild(divTopic)

            output.appendChild(divUserC)
        }
    }
}

function createElement1(type, text, parent, className) {
    let element = document.createElement(type)
    element.textContent = text
  
    if(className !== undefined) {
      element.className = (className)
    }
    parent.appendChild(element)
  
    return element
}
