let loadBtn = document.getElementById('loadBooks')
loadBtn.addEventListener('click', onclickLoad)

let createBtn = document.getElementById('create')
createBtn.addEventListener('click', onclickCreate)

let h3 = document.getElementsByTagName('h3')[0]

async function onclickLoad(e) {
    await fetch('http://localhost:3030/jsonstore/collections/books')
    .then(x => x.json())
    .then(data => {
        let output = document.getElementsByTagName('tbody')[0]
        output.innerHTML = ''

        for(let el of Object.values(data)) {
            let tr = document.createElement('tr')

            createElement1('td', el.title, tr)
            createElement1('td', el.author, tr)
            let btn1 = createElement1('button', 'Edit', tr)
            btn1.addEventListener('click', onclickEdit)
            btn1.dataset.id = el._id

            let btn2 = createElement1('button', 'Delete', tr)
            btn2.addEventListener('click', onclickDelete)
            btn2.dataset.id = el._id

            output.appendChild(tr)
        }
    })
}

async function onclickCreate(e) {
    e.preventDefault()
    let form = e.target.parentElement

    let data = new FormData(form)

    if(data.get('title') !== '' && data.get('author') !== '') {
        let data1 = {
            author: data.get('author'),
            title: data.get('title')
        }

        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(data1)
        }

        await fetch('http://localhost:3030/jsonstore/collections/books', settings)
        document.getElementsByName('title')[0].value = ''
        document.getElementsByName('author')[0].value = ''
    }
}

async function onclickEdit(e) {
    let id = e.target.getAttribute('data-id')

    document.getElementsByName('title')[0].value = e.target.parentElement.children[0].textContent
    document.getElementsByName('author')[0].value = e.target.parentElement.children[1].textContent

    //REMOVE SUBMIT EVENT LISTENER AND ADD AN EDIT LISTENER AND MAKE THE PUT REQUEST ANOTHER FUNC
    let title = document.getElementsByName('title')[0]
    let author = document.getElementsByName('author')[0]

    let btnSubmit = document.getElementById('create')
    btnSubmit.removeEventListener('click', onclickCreate)
    btnSubmit.addEventListener('click', edit)
    btnSubmit.textContent = 'Edit'
    h3.textContent = 'Edit FORM'

    async function edit(e) {
        e.preventDefault()

        let data1 = {
            author: author.value,
            title: title.value,
            _id: id
        }

        let settings = {
            method: 'PUT',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(data1)
        }

        await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, settings)

        btnSubmit.removeEventListener('click', edit)
        btnSubmit.addEventListener('click', onclickCreate)

        document.getElementsByName('title')[0].value = ''
        document.getElementsByName('author')[0].value = ''

        createBtn.textContent = 'Submit'
        h3.textContent = 'FORM'
    }
}

async function onclickDelete(e) {
    let id = e.target.getAttribute('data-id')

    let settings = {
        method: "DELETE"
    }

    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, settings)
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