load()
//SAVE THE ID IN SESSION STORAGE

let topicName = document.getElementById('topicName')
let username = document.getElementById('username')
let postText = document.getElementById('postText')

let btnPost = document.querySelector('.public')
btnPost.addEventListener('click', onclickPost)

let btnCancel = document.querySelector('.cancel')
btnCancel.addEventListener('click', onclickCancel)

async function load() {
  let x = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
  let data = await x.json()

  const output = document.querySelector('.topic-container')

  for(let el of Object.values(data)) {
    let divMain = document.createElement('div')
    divMain.classList.add('topic-name-wrapper')

    let divTopicName = document.createElement('div')
    divTopicName.classList.add('topic-name')
    let a  = document.createElement('a')
    a.href = './theme-content.html'
    a.addEventListener('click', onclickGetId)
    let h2 = createElement1('h2', `${el.title}`, a )
    h2.dataset.id = el._id
    divTopicName.appendChild(a)

    let divColumns = document.createElement('div')
    divColumns.classList.add('columns')
    let div = document.createElement('div')
    let p = createElement1('p', 'Date: ', div)

    createElement1('time', `${el.date}`, p) 

    let divNick = document.createElement('div')
    let p1 = createElement1('p', 'Username:', divNick)
    createElement1('span', `${el.username}`, p1)
    divColumns.appendChild(div)
    divTopicName.appendChild(divColumns)

    divMain.appendChild(divTopicName)

    output.appendChild(divMain)

    sessionStorage.removeItem('id')
  }
}

async function onclickPost(e) {
    e.preventDefault()
    
    if(topicName.value !== '' && username.value !== '' && postText.value !=='') {
      let dateTime = new Date()

      let postData = {
        title: topicName.value,
        username: username.value,
        post: postText.value,
        date: dateTime.toUTCString()
      };

      let settings = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(postData)
      }
      
      await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', settings)

      load() 
  }
}

function onclickCancel(e) {
  e.preventDefault()

  topicName.value = ''
  username.value = ''
  postText.value = ''
}

function onclickGetId(e) {
  sessionStorage.setItem('id', e.target.getAttribute('data-id'))
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